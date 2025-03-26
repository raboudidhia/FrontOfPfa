import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import image from "../assets/images/Flux_Dev_A_futuristic_and_modern_veterinary_AI_analysis_backgr_2.jpeg";
import { toast } from "react-toastify";
import { Stage, Layer, Image as KonvaImage, Rect } from "react-konva";
import ProgressBar from "@ramonak/react-progress-bar"; 

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [result, setResult] = useState(null);
  const [imageObj, setImageObj] = useState(null); 
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  }); 

  const stageRef = useRef(null);

  
  useEffect(() => {
    if (preview) {
      const img = new window.Image();
      img.src = preview;
      img.onload = () => {
        
        const maxWidth = 352; // Based on w-full (400px - padding)
        const maxHeight = 192; // Based on h-48 (192px)
        let width = img.width;
        let height = img.height;

        
        const aspectRatio = width / height;
        if (width > maxWidth) {
          width = maxWidth;
          height = width / aspectRatio;
        }
        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }

        setImageDimensions({ width, height });
        setImageObj(img);
      };
    }
  }, [preview]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit.");
        return;
      }

      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    setProgress(0);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 500);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(response.data);
      setProgress(100);
      toast.success("Image analyzed successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setResult({
        message: "Error during detection.",
        status: "error",
        confidence: 0.0,
        symptom: "None",
        boundingBox: { x: 0, y: 0, width: 0, height: 0 },
      });
      setProgress(100);
      toast.error("Failed to analyze the image. Please try again.");
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-white shadow-lg p-8 rounded-2xl w-[400px] text-center backdrop-blur-md bg-opacity-80">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Rabies Detection
        </h1>

        {/* Upload Box */}
        <div className="relative border-dashed border-2 border-gray-400 rounded-lg p-4 cursor-pointer hover:border-blue-500">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <p className="text-gray-500">Click or Drag & Drop to Upload</p>
        </div>

        {/* Image Preview with Bounding Box */}
        {preview && (
          <motion.div
            className="relative w-full h-48 mt-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Stage
              ref={stageRef}
              width={imageDimensions.width}
              height={imageDimensions.height}
              className="mx-auto"
            >
              <Layer>
                {imageObj && (
                  <KonvaImage
                    image={imageObj}
                    width={imageDimensions.width}
                    height={imageDimensions.height}
                  />
                )}
                {result && result.boundingBox && result.confidence >= 0.3 && (
                  <Rect
                    x={
                      result.boundingBox.x *
                      (imageDimensions.width /
                        result.boundingBox.originalWidth || 1)
                    }
                    y={
                      result.boundingBox.y *
                      (imageDimensions.height /
                        result.boundingBox.originalHeight || 1)
                    }
                    width={
                      result.boundingBox.width *
                      (imageDimensions.width /
                        result.boundingBox.originalWidth || 1)
                    }
                    height={
                      result.boundingBox.height *
                      (imageDimensions.height /
                        result.boundingBox.originalHeight || 1)
                    }
                    stroke="red"
                    strokeWidth={2}
                    dash={[10, 5]}
                  />
                )}
              </Layer>
            </Stage>
          </motion.div>
        )}

       
        {loading && (
          <div className="mt-4">
            <ProgressBar
              completed={progress}
              bgColor={progress === 100 ? "#10b981" : "#3b82f6"}
              baseBgColor="#d1d5db"
            />
          </div>
        )}

        
        <button
          onClick={handleUpload}
          className={`mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                ></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            "Analyze Image"
          )}
        </button>

        {/* Result */}
        {result && (
          <motion.div
            className={`mt-4 p-4 rounded-lg ${
              result.status === "warning"
                ? "bg-red-100 text-red-800"
                : result.status === "info"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-semibold">
              Detected Symptom: {result.symptom}
            </p>
            <p className="text-sm mt-1">
              Confidence: {(result.confidence * 100).toFixed(2)}%
            </p>
            <p className="mt-2">{result.message}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Upload;
