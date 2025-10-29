export default function Footer() {
  return (
    <footer className="text-center mt-1 lg:mt-3 py-1 border-t border-gray-200">
      <p className="mb-0">Connect with me:</p>
      <div className="flex justify-center gap-4">
        <a href="https://github.com/rohit-web01" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">GitHub</a>
        <a href="https://www.linkedin.com/in/rohit-web/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">LinkedIn</a>
        <a href="mailto:rohitgehlot5621@gmail.com" className="text-white hover:underline">E-Mail</a>
      </div>
      <p className="text-gray-200 text-sm">© SmartHire 2025 | Powered By : Gemini AI</p>
    </footer>
  );
}
