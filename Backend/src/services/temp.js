const resume = `
Himanshu Sharma
Aspiring Software Engineer

Skills:
- JavaScript, Node.js, Express.js
- MongoDB, MySQL
- Data Structures & Algorithms (DSA)
- REST APIs, Git, GitHub

Projects:
1. AI Interview Assistant (Node.js, Gemini API)
   - Built backend service to generate interview questions using LLM
   - Integrated Google Gemini API
   - Designed structured response schema using Zod

2. Task Manager App (MERN Stack)
   - CRUD operations with authentication
   - JWT-based login system
   - Responsive UI with React

Experience:
- Fresher (Self-project based learning)

Education:
- B.Tech in Computer Science
`
const selfDescription = `
I am an aspiring software engineer with strong interest in backend development and AI integration. 
I have built projects using Node.js and recently started working with generative AI APIs like Gemini. 
I am comfortable with JavaScript, databases, and problem solving, but I still need improvement in system design and advanced DSA.

I am preparing for software engineering roles and want structured guidance for interviews.
`
const jobDescription = `
Role: Software Engineer (Backend)

Requirements:
- Strong proficiency in JavaScript and Node.js
- Experience with REST API development
- Understanding of databases (MongoDB or SQL)
- Knowledge of data structures and algorithms
- Familiarity with system design basics
- Good communication and problem-solving skills

Preferred:
- Experience with cloud services or AI APIs
- Experience building scalable backend systems
`

module.exports = {
    resume,
    selfDescription, 
    jobDescription
}