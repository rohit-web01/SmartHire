import { useState } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";
import { AiOutlineUpload } from "react-icons/ai";

export default function UploadForm({ onResult, setLoading }) {
  const [resume, setResume] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [jdText, setJdText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) return toast.error("Please upload your resume.");
    if (!jdFile && jdText.trim() === "")
      return toast.error("Provide a Job Description via file or text.");

    const formData = new FormData();
    formData.append("resume", resume);
    if (jdFile) formData.append("jdFile", jdFile);
    if (jdText.trim()) formData.append("jdText", jdText);

    try {
      setLoading(true);
      const response = await api.post("/analyze/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onResult(response.data.analysis);
      toast.success("Analysis completed!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (fileSetter) => (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB");
      return;
    }
    fileSetter(file);
  };

  return (
    <form
      className="bg-gray-100 shadow-lg rounded-xl p-3 lg:p-6 flex flex-col gap-1 lg:gap-3"
      onSubmit={handleSubmit}
    >
      {/* Resume Upload */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Upload Resume:</label>
        <label className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-sky-600 transition">
          <AiOutlineUpload size={20} />
          {resume ? resume.name : "Choose File"}
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={handleFileChange(setResume)}
          />
        </label>
      </div>

      {/* JD Upload */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Upload Job Description (optional):</label>
        <label className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-sky-600 transition">
          <AiOutlineUpload size={20} />
          {jdFile ? jdFile.name : "Choose File"}
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={handleFileChange(setJdFile)}
          />
        </label>
      </div>

      {/* JD Textarea */}
      <div className="flex flex-col">
        <label className="font-medium mb-1">Or Paste JD:</label>
        <textarea
          rows="5"
          className="w-full border rounded p-2"
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste the Job Description here..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`btn-grad text-white py-2 px-4 rounded transition ${
          setLoading ? "opacity-50 cursor-pointer" : "hover:bg-sky-600"
        }`}
      >
        Analyze
      </button>
    </form>
  );
}
