import { useState } from "react";
import Header from "../components/Header";
import UploadForm from "../components/UploadForm";
import Loader from "../components/Loader";
import CircularScore from "../components/CircularScore";
import Result from "../components/Result";
import Footer from "../components/Footer";

export default function Home() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-1 lg:py-6">
      {/* Header */}
      <Header />

      {/* Upload Form Section */}
      <div className="relative w-full max-w-xl mt-3 lg:mt-6">
        {/* Form overlay while loading */}
        {loading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-md z-20 flex items-center justify-center rounded-xl">
            <Loader />
          </div>
        )}

        {!analysis && (
          <UploadForm
            onResult={(result) => setAnalysis(result)}
            setLoading={setLoading}
          />
        )}
      </div>

      {/* Results Section */}
      {analysis && (
        <div className="flex flex-col items-center w-full max-w-4xl">
          <CircularScore score={analysis.score ?? 0} />
          <Result analysis={analysis} />
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
