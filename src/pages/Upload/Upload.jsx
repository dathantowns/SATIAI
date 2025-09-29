import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css";
import uploadBg from "../../assets/uploadBg.avif";
import Button from "../../components/Button/Button";
import Preloader from "../../components/Preloader/Preloader";
import { uploadAudio as uploadAudioAPI, uploadText } from "../../../utils/api";
import { useFeedback } from "../../contexts/FeedbackContext";

function Upload() {
  const navigate = useNavigate();
  const audioFileInputRef = useRef(null);
  const textFileInputRef = useRef(null);
  const [selectedAudioFile, setSelectedAudioFile] = useState(null);
  const [selectedTextFile, setSelectedTextFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  // Use feedback context
  const { feedback, updateFeedback, setFeedbackLoading } = useFeedback();

  const handleAudioButtonClick = () => {
    // Trigger the hidden file input
    audioFileInputRef.current.click();
  };

  const handleAudioFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Debug: Log the actual file type
      console.log("File type detected:", file.type);
      console.log("File name:", file.name);

      // Validate file type - more comprehensive list
      const allowedTypes = [
        "audio/mp3",
        "audio/mpeg", // MP3 files often report as this
        "audio/wav",
        "audio/wave", // Some WAV files report as this
        "audio/x-wav", // Alternative WAV MIME type
        "audio/m4a",
        "audio/mp4", // M4A files often report as this
        "audio/aac",
        "audio/x-aac", // Alternative AAC MIME type
        "audio/ogg",
        "audio/webm", // WebM audio
        "audio/flac", // FLAC files
      ];

      // Also check file extension as fallback
      const fileExtension = file.name.toLowerCase().split(".").pop();
      const allowedExtensions = [
        "mp3",
        "wav",
        "m4a",
        "aac",
        "ogg",
        "flac",
        "webm",
      ];

      const isValidType = allowedTypes.includes(file.type);
      const isValidExtension = allowedExtensions.includes(fileExtension);

      if (!isValidType && !isValidExtension) {
        alert(
          `Please select a valid audio file. Detected type: ${file.type}, Extension: ${fileExtension}`
        );
        return;
      }

      // Validate file size (e.g., max 100MB)
      const maxSize = 100 * 1024 * 1024; // 100MB in bytes
      if (file.size > maxSize) {
        alert("File size must be less than 100MB");
        return;
      }

      setSelectedAudioFile(file);
      console.log("Audio file selected:", file.name, file.size, file.type);
      // Here you can trigger the actual upload
      handleAudioUpload(file);
    }
  };

  const handleAudioUpload = (file) => {
    setIsUploading(true);
    setLoadingMessage("Uploading and analyzing your audio lecture...");

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("file", file);

    // Add any additional metadata
    formData.append("filename", file.name);
    formData.append("filesize", file.size);

    console.log("Uploading audio file:", file.name);

    uploadAudioAPI(formData)
      .then((result) => {
        setLoadingMessage("Processing complete! Preparing your feedback...");
        console.log("Upload successful:", result);
        console.log("Feedback received:", result.feedback);
        updateFeedback(result.feedback);

        // Small delay to show completion message
        setTimeout(() => {
          navigate("/feedback");
        }, 1000);
      })
      .catch((error) => {
        console.error("Upload error:", error);
        alert("Failed to upload audio file. Please try again.");
        setIsUploading(false);
      })
      .finally(() => {
        setFeedbackLoading(false);
      });
  };

  const handleTextButtonClick = () => {
    // Trigger the hidden file input
    textFileInputRef.current.click();
  };

  const handleTextFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Debug: Log the actual file type
      console.log("File type detected:", file.type);
      console.log("File name:", file.name);

      // Validate file type - text documents
      const allowedTypes = [
        "text/plain", // .txt files
        "application/pdf", // .pdf files
        "application/msword", // .doc files
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx files
        "application/rtf", // .rtf files
        "text/markdown", // .md files
        "text/html", // .html files
      ];

      // Also check file extension as fallback
      const fileExtension = file.name.toLowerCase().split(".").pop();
      const allowedExtensions = [
        "txt",
        "pdf",
        "doc",
        "docx",
        "rtf",
        "md",
        "html",
      ];

      const isValidType = allowedTypes.includes(file.type);
      const isValidExtension = allowedExtensions.includes(fileExtension);

      if (!isValidType && !isValidExtension) {
        alert(
          `Please select a valid text document. Detected type: ${file.type}, Extension: ${fileExtension}`
        );
        return;
      }

      // Validate file size (e.g., max 50MB for text documents)
      const maxSize = 50 * 1024 * 1024; // 50MB in bytes
      if (file.size > maxSize) {
        alert("File size must be less than 50MB");
        return;
      }

      setSelectedTextFile(file);
      console.log("Text file selected:", file.name, file.size, file.type);
      // Here you can trigger the actual upload
      handleTextUpload(file);
    }
  };

  const handleTextUpload = (file) => {
    setIsUploading(true);
    setLoadingMessage("Uploading and analyzing your text document...");

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("document", file);

    // Add any additional metadata
    formData.append("filename", file.name);
    formData.append("filesize", file.size);

    console.log("Uploading text file:", file.name);

    setFeedbackLoading(true);

    uploadText(formData)
      .then((result) => {
        setLoadingMessage("Processing complete! Preparing your feedback...");
        console.log("Upload successful:", result);
        console.log("Feedback received:", result.feedback);
        updateFeedback(result.feedback);

        // Small delay to show completion message
        setTimeout(() => {
          navigate("/feedback");
        }, 1000);
      })
      .catch((error) => {
        console.error("Upload error:", error);
        alert("Failed to upload text file. Please try again.");
        setIsUploading(false);
      })
      .finally(() => {
        setFeedbackLoading(false);
      });
  };

  // Show preloader when uploading
  if (isUploading) {
    return <Preloader message={loadingMessage} />;
  }

  return (
    <div className="upload">
      <img src={uploadBg} alt="Background" className="upload__bg" />
      <h1 className="upload__title">Upload Lecture.</h1>

      {selectedAudioFile && (
        <div className="upload__file-info">
          <p>Selected Audio: {selectedAudioFile.name}</p>
          <p>Size: {(selectedAudioFile.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}

      {selectedTextFile && (
        <div className="upload__file-info">
          <p>Selected Text: {selectedTextFile.name}</p>
          <p>Size: {(selectedTextFile.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}

      <div className="upload__buttons">
        <Button onClick={handleAudioButtonClick}>Audio</Button>
        <Button onClick={handleTextButtonClick}>Text</Button>
      </div>

      {/* Hidden file inputs */}
      <input
        type="file"
        ref={audioFileInputRef}
        onChange={handleAudioFileSelect}
        accept="audio/*"
        style={{ display: "none" }}
      />
      <input
        type="file"
        ref={textFileInputRef}
        onChange={handleTextFileSelect}
        accept=".txt,.pdf,.doc,.docx,.rtf,.md,.html"
        style={{ display: "none" }}
      />
    </div>
  );
}

export default Upload;
