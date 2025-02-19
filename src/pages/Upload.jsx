import  { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(""); // Reset result when a new file is chosen
  };

  // Handle form submission
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data.result); // Expecting { result: "Rabies detected" or "No rabies detected" }
    } catch (error) {
      console.error("Erreur lors de l'upload :", error);
      setResult("Erreur lors de la détection.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Rabies Detection in Dogs</h1>
      
      <div className="bg-white shadow-lg p-6 rounded-lg w-96 text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 w-full text-sm"
        />

        {preview && (
          <img src={preview} alt="Preview" className="w-full h-60 object-cover rounded-lg mb-4" />
        )}

        <button
          onClick={handleUpload}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300"
          disabled={loading}
        >
          {loading ? "Analyse en cours..." : "Analyser l'image"}
        </button>

        {result && (
          <p className="mt-4 text-lg font-semibold text-gray-700">{result}</p>
        )}
      </div>
    </div>
  );
};

export default Upload;
