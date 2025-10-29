# SmartHire 🚀
Live Link : https://smart-hire-phi-three.vercel.app/

SmartHire is an AI-powered resume and job description analyzer designed to help candidates and recruiters understand how well a resume matches a job posting. It leverages generative AI to provide actionable insights, including strengths, weaknesses, and recommendations.

---

## 📝 Problem It Solves

Recruiters often spend hours evaluating resumes for a single job posting. Candidates may struggle to tailor their resumes to highlight relevant skills. SmartHire automates this process by analyzing resumes against job descriptions and providing clear, concise feedback, saving time and improving hiring decisions.

---

## 🧰 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS  
- **Backend:** Node.js (Express.js)  
- **File Parsing:** Multer, PDF.js-Extract, Mammoth  
- **AI / NLP:** Gemini API (for semantic analysis of resume vs JD)  
- **Deployment:** Vercel (Frontend), Render (Backend)  
- **Utilities:** Axios, dotenv, CORS  

---


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

---

## 🧑‍⚖️ to Test SmartHire

Follow these steps to evaluate the application:

### 1. Open the App
- Go to the deployed frontend: https://smart-hire-phi-three.vercel.app/  
- Ensure you see the SmartHire interface with options to upload Resume and Job Description.

### 2. Upload Resume
- Click **“Choose File”** under **Upload Resume**.  
- Select a sample resume file in **PDF, DOCX, or TXT** format.  

### 3. Provide Job Description
- You have **two options**:
  1. Upload a JD file (PDF, DOCX, TXT).  
  2. Paste JD text directly into the textarea.  

### 4. Analyze
- Click **Analyze**.  
- Wait a few seconds for AI analysis to complete.  

### 5. View Results
- The app will display:
  - **Fit Score** (0–100)  
  - **Strengths**  
  - **Weaknesses**  
  - **Recommendations**  
- Check if the results match the uploaded resume and JD.

### 6. Test Edge Cases
- Try **uploading unsupported file types** (e.g., PNG, XLSX) → App should show an error.  
- Leave JD empty → App should prompt for JD input.  
- Upload large files (>5MB) → App should restrict file size.

### 7. Optional: API Test
- Judges can test the backend directly via **Postman** or **cURL**:
```bash
curl -X POST https://<backend-url>/api/analyze/upload \
  -F "resume=@sample_resume.pdf" \
  -F "jdFile=@sample_jd.pdf"
