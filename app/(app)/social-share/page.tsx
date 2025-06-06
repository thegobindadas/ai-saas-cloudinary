"use client";

import React, { useState, useEffect, useRef } from "react";
import { Upload, Camera, Download, Sparkles } from "lucide-react";
import { CldImage } from 'next-cloudinary';
import axios from "axios";



const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

type SocialFormat = keyof typeof socialFormats;



function SocialShare() {

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)");
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);


  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
    }
  }, [selectedFormat, uploadedImage]);


  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {

    const file = event.target.files?.[0];

    if (!file) return;

    setIsUploading(true);


    const formData = new FormData();
    formData.append("file", file);


    const response = await axios.post("/api/image-upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });


    setUploadedImage(response.data.public_id);

    } catch (error) {
      console.error("Failed to uploading image1: ", error);
      alert("Failed to uploading image");
    } finally {
      setIsUploading(false);
    }
  };


<<<<<<< HEAD
  const handleDownload = async () => {
    try {
      if(!imageRef.current) return;
  
      await fetch(imageRef.current.src)
=======
  const handleDownload = () => {
    try {
      if(!imageRef.current) return;
  
      fetch(imageRef.current.src)
>>>>>>> 62740b9bf4db348de5ba57b7914fc21cf352dc93
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement("a");
          link.href = url;
          link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        })
    } catch (error) {
      console.error("Failed to download image: ", error)
      alert("Failed to download image")
    }
  }



  return (
<<<<<<< HEAD
    <>
      <style jsx>{`
        @keyframes loading-sweep {
          0% { 
            transform: translateX(-100%); 
          }
          100% { 
            transform: translateX(100%); 
          }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        {/* Animated background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <div className="container mx-auto p-4 max-w-4xl relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl mr-3">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Social Media Image Creator
              </h1>
            </div>
            <p className="text-gray-300 text-lg">Transform your images for any social platform</p>
          </div>

          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="p-8">
              {/* Upload Section */}
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <Upload className="w-6 h-6 text-purple-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Upload an Image</h2>
                </div>

                <div className="space-y-4">
                  <label className="block">
                    <span className="text-gray-300 font-medium mb-2 block">Choose an image file</span>
                    <div className="relative">
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        accept="image/*"
                      />
                      <div className="bg-white/5 border-2 border-dashed border-purple-400/50 rounded-xl p-8 text-center hover:border-purple-400 hover:bg-white/10 transition-all duration-300">
                        <Camera className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                        <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                        <p className="text-gray-400 text-sm">PNG, JPG, WebP up to 10MB</p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Uploading...</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden relative">
                      {/* Background gradient track */}
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-600/30 to-gray-400/30 rounded-full"></div>
                      {/* Loading style progress bar with moving gradient */}
                      <div 
                        className="h-full rounded-full relative overflow-hidden"
                        style={{ 
                          width: '100%',
                          background: '#1E3A8A',
                          backgroundSize: '50% 100%',
                          animation: 'loading-sweep 1.5s ease-in-out infinite'
                        }}
                      >
                        {/* Shine effect */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          style={{ 
                            animation: 'shine 2s ease-in-out infinite',
                            transform: 'skewX(-25deg)'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Format Selection & Preview - Only show after upload */}
              {uploadedImage && (
                <div className="space-y-8">
                  {/* Format Selection */}
                  <div>
                    <div className="flex items-center mb-6">
                      <Camera className="w-6 h-6 text-cyan-400 mr-3" />
                      <h2 className="text-2xl font-bold text-white">Select Social Media Format</h2>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-gray-300 font-medium">Platform Format</label>
                      <select
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                        value={selectedFormat}
                        onChange={(e) => {
                          setSelectedFormat(e.target.value as SocialFormat);
                        }}
                      >
                        {Object.keys(socialFormats).map((format) => (
                          <option key={format} value={format} className="bg-gray-800">
                            {format}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preview Section */}
                  <div className="relative">
                    <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                      Preview:
                      <span className="ml-2 text-sm text-gray-400 font-normal">
                        {socialFormats[selectedFormat].width} × {socialFormats[selectedFormat].height}px
                      </span>
                    </h3>
                    
                    <div className="relative bg-white/5 rounded-xl p-6 min-h-[300px]">
                      <div className="flex justify-center">
                        {isTransforming && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-xl z-10">
                            <div className="bg-white/10 rounded-xl p-6 flex items-center space-x-3">
                              <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-400 border-t-transparent"></div>
                              <span className="text-white font-medium">Optimizing image...</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="max-w-full rounded-xl shadow-2xl border border-white/20">
                          <CldImage
                            width={socialFormats[selectedFormat].width}
                            height={socialFormats[selectedFormat].height}
                            src={uploadedImage}
                            sizes="100vw"
                            alt="transformed image"
                            crop="fill"
                            aspectRatio={socialFormats[selectedFormat].aspectRatio}
                            gravity='auto'
                            ref={imageRef}
                            onLoad={() => setIsTransforming(false)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="flex justify-end pt-6 border-t border-white/10">
                    <button 
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center space-x-3"
                      onClick={handleDownload}
                    >
                      <Download className="w-5 h-5" />
                      <span>Download for {selectedFormat}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Info */}
          {!uploadedImage && (
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Supports Instagram, Facebook and Twitter formats
              </p>
=======
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Social Media Image Creator
      </h1>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Upload an Image</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Choose an image file</span>
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="file-input file-input-bordered file-input-primary w-full"
            />
          </div>

          {isUploading && (
            <div className="mt-4">
              <progress className="progress progress-primary w-full"></progress>
            </div>
          )}

          {uploadedImage && (
            <div className="mt-6">
              <h2 className="card-title mb-4">Select Social Media Format</h2>
              <div className="form-control">
                <select
                  className="select select-bordered w-full"
                  value={selectedFormat}
                  onChange={(e) =>
                    setSelectedFormat(e.target.value as SocialFormat)
                  }
                >
                  {Object.keys(socialFormats).map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6 relative">
                <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                <div className="flex justify-center">
                  {isTransforming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  )}
                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={uploadedImage}
                    sizes="100vw"
                    alt="transformed image"
                    crop="fill"
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    gravity='auto'
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                    />
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                <button className="btn btn-primary" onClick={handleDownload}>
                  Download for {selectedFormat}
                </button>
              </div>
>>>>>>> 62740b9bf4db348de5ba57b7914fc21cf352dc93
            </div>
          )}
        </div>
      </div>
<<<<<<< HEAD
    </>
=======
    </div>
>>>>>>> 62740b9bf4db348de5ba57b7914fc21cf352dc93
  );
}



export default SocialShare