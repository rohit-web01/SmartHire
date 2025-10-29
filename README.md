# SmartHire

## Project Overview
**SmartHire** is an AI-powered recruitment assistant designed to compare resumes with job descriptions. Using **Gemini AI** and the **MERN stack**, it evaluates candidates and provides a **fit score, strengths, weaknesses, and recommendations** for improvement. SmartHire simplifies the hiring process for both candidates and recruiters.

## Features
- Upload resumes and job descriptions in **PDF/DOCX** format or input text directly.
- Extracts and previews key content before analysis.
- AI-powered comparison with **Gemini AI** for semantic evaluation.
- Outputs include:
  - Fit Score
  - Strengths
  - Weaknesses
  - Improvement Recommendations
- Future: Chrome extension for real-time job description analysis.

## Tech Stack
- **Frontend:** React, Vite  
- **Backend:** Node.js, Express  
- **Database:** None (stateless, no persistence required)  
- **AI Integration:** Google Gemini API (Gemini 1.5 / Gemini Flash)  
- **File Parsing:** pdf.js-extract, DOCX parser  
- **File Uploads:** Multer  
