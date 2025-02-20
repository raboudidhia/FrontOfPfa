import  { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; 
import image from "../assets/images/Flux_Dev_A_futuristic_and_modern_veterinary_AI_analysis_backgr_2.jpeg";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult("");
    }
  };

  
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data.result);
    } catch (error) {
      console.error("Error uploading image:", error);
      setResult("Error during detection.");
    }
    setLoading(false);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-white shadow-lg p-8 rounded-2xl w-[400px] text-center backdrop-blur-md bg-opacity-80">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Rabies Detection</h1>

        {/* Box of upload */}
        <div className="relative border-dashed border-2 border-gray-400 rounded-lg p-4 cursor-pointer hover:border-blue-500">
          <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
          <p className="text-gray-500">Click or Drag & Drop to Upload</p>
        </div>

        {/* Image Preview */}
        {preview && (
          <motion.img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg mt-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/*Button of upload */}
        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>

        {/* resultat */}
        {result && (
          <motion.p
            className={`mt-4 text-lg font-semibold ${
              result.includes("Rabies") ? "text-red-600" : "text-green-600"
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {result}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Upload;
