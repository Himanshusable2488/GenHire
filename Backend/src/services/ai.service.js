const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
}).strict()

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
    Return only valid JSON matching this schema:
- matchScore
- technicalQuestions
- behavioralQuestions
- skillGaps
- preparationPlan
- title

technicalQuestions must be an array of objects:
  { "question": "...", "intention": "...", "answer": "..." }

behavioralQuestions must be an array of objects:
  { "question": "...", "intention": "...", "answer": "..." }

skillGaps must be an array of objects:
  { "skill": "...", "severity": "low|medium|high" }

preparationPlan must be an array of objects:
  { "day": 1, "focus": "...", "tasks": ["...", "..."] }

Example output:
{
  "matchScore": 82,
  "technicalQuestions": [
    {
      "question": "Explain RESTful API design.",
      "intention": "Assess whether the candidate can build clean backend endpoints.",
      "answer": "Describe resource-based routes, HTTP methods, status codes, and statelessness."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Describe a situation where you had to learn a new tool quickly to complete a project.",
      "intention": "Assess the candidates adaptability, self-learning ability, and problem-solving approach under project deadlines.",
      "answer": "Explain a real project situation where you learned a new tool quickly, how you learned it, applied it in the project, and successfully completed the task."
    }
  ],
  "skillGaps": [
     {
      "skill": "System design",
      "severity": "medium"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Review Node.js and Express basics",
      "tasks": ["Read Express docs", "Build a simple CRUD API"]
    }
]
}
Do not add any extra fields.
`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            // responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })

        const rawText = response.text
console.log("RAW AI RESPONSE:")
    console.log(rawText)

    const cleaned = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

const parsed = JSON.parse(cleaned)

parsed.technicalQuestions =
    parsed.technicalQuestions.map(item =>
        typeof item === "string"
            ? JSON.parse(item)
            : item
    )

parsed.behavioralQuestions =
    parsed.behavioralQuestions.map(item =>
        typeof item === "string"
            ? JSON.parse(item)
            : item
    )

parsed.skillGaps =
    parsed.skillGaps.map(item =>
        typeof item === "string"
            ? JSON.parse(item)
            : item
    )

parsed.preparationPlan =
    parsed.preparationPlan.map(item =>
        typeof item === "string"
            ? JSON.parse(item)
            : item
    )

return interviewReportSchema.parse(parsed)
}

async function generatePdfFromHtml(htmlContent){
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, {waitUntil: "networkidle0"})

    const pdfBuffer = await page.pdf({format:"A4",margin:{
        top:"20mm",
        bottom:"20mm",
        left:"15mm",
        right:"15mm"
    }})

    await browser.close()
    return pdfBuffer
}

async function generateResumePdf({resume, selfDescription, jobDescription}){
    const resumePdfSchema = z.object({
        html:z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })


    const prompt = `Generate resume for a candidate with the following details
           Resume:${resume}
           Self Description:${selfDescription}
           Job Description: ${jobDescription}

           the response should be a JSON object with a single field "html": which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
           The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visual appealing.
           The content of resume should be not sound like it's generated by AI and should be close as possible to real human-written resume.
           You can highlight the content using some colors or different font styles but the overall design should be simple and professional.
           the content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
           the resume should not be so lengthy, it should be ideally 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.   `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config:{
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })

    const jsonContent =  JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer
}

module.exports = {generateInterviewReport, generateResumePdf}
    