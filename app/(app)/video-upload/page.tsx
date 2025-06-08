"use client";

import React, { useState } from "react";
import type { MouseEventHandler } from "react";
import { Upload, AlertCircle, CheckCircle2, File, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";



function VideoUpload() {

  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [uploadedVideo, setUploadedVideo] = useState<any>(null);
  const [errors, setErrors] = useState<{
    title?: string;
    file?: string;
    general?: string;
  }>({});
  const [touched, setTouched] = useState<{
    title?: boolean;
    file?: boolean;
  }>({});

  const MAX_FILE_SIZE = 70 * 1024 * 1024
  const ACCEPTED_VIDEO_TYPES = ['video/mp4'];


  const validateField = (fieldName: string, value: any) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'title':
        if (!value || !value.trim()) {
          newErrors.title = 'Title is required';
        } else if (value.trim().length < 3) {
          newErrors.title = 'Title must be at least 3 characters long';
        } else if (value.trim().length > 100) {
          newErrors.title = 'Title must be less than 100 characters';
        } else {
          delete newErrors.title;
        }
        break;

      case 'file':
        if (!value) {
          newErrors.file = 'Please select a video file';
        } else if (!ACCEPTED_VIDEO_TYPES.includes(value.type)) {
          newErrors.file = 'Please select a valid video file (MP4, AVI, MOV, WMV, FLV, WebM)';
        } else if (value.size > MAX_FILE_SIZE) {
          newErrors.file = `File size must be less than ${Math.round(MAX_FILE_SIZE / (1024 * 1024))}MB`;
        } else if (value.size === 0) {
          newErrors.file = 'Selected file appears to be empty';
        } else {
          delete newErrors.file;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleBlur = (fieldName: string) => {
    setTouched({ ...touched, [fieldName]: true });
    
    switch (fieldName) {
      case 'title':
        validateField('title', title);
        break;
      case 'file':
        validateField('file', file);
        break;
    }
  };


  const handleVideoUpload: MouseEventHandler<HTMLButtonElement> = async (event) => {
    try {

      event.preventDefault();

      // Mark all fields as touched
      setTouched({ title: true, file: true });

      // Validate all fields
      const isTitleValid = validateField('title', title);
      const isFileValid = validateField('file', file);
      
      if (!isTitleValid || !isFileValid) {
        setErrors({ ...errors, general: 'Please fix the errors above before submitting' });
        return;
      }


      setIsLoading(true);
      setErrors({});


      const formData = new FormData();
      formData.append("file", file!);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("originalSize", file!.size.toString());


      const response = await axios.post("/api/video-upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      if (response.status=== 200) {
        // Show success notification
         setShowSuccess(true);
        
        // Handle response data appropriately
        setUploadedVideo(response.data.video);
        

        // Reset form after showing success for 2 seconds
        setTimeout(() => {
         setTitle("");
          setDescription("");
          setFile(null);
          setErrors({});
          setTouched({});
          setShowSuccess(false);
          
          // Redirect to video page
        router.push("/home");
        }, 2000);
      }
     

      
    } catch (error) {
      console.error("Failed to uploading Video: ", error);
      setErrors({ 
        general: error instanceof Error ? error.message : "Failed to upload video. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  }


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
    
    if (touched.file) {
      validateField('file', selectedFile);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
    
    if (touched.title) {
      validateField('title', value);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (touched.file) {
      validateField('file', null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };


  const getInputClasses = (hasError: boolean) => {
    const baseClasses = "w-full px-4 py-3 text-sm border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed bg-gray-800 text-gray-100 placeholder-gray-400";
    
    if (hasError) {
      return `${baseClasses} border-red-600 focus:border-red-500 focus:ring-red-500/50`;
    }
    
    return `${baseClasses} border-gray-600 focus:border-blue-500 hover:border-gray-500`;
  };


  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Upload Video
          </h1>
          <p className="text-gray-400 text-lg">Share your content with the world</p>
        </div>

        {/* Main Upload Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="p-8">
            
            {/* Success Notification */}
            {showSuccess && (
              <div className="mb-6 p-4 bg-blue-900/50 border border-blue-600/50 rounded-lg flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-blue-300 text-sm font-medium">Upload Successful!</p>
                  <p className="text-blue-200 text-xs mt-1">
                    {uploadedVideo?.title || title} has been uploaded successfully.
                  </p>
                </div>
              </div>
            )}

            {/* General Error */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-900/50 border border-red-600/50 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-300 text-sm">{errors.general}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-200 mb-2">
                  Video Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={() => handleBlur('title')}
                  className={getInputClasses(!!(touched.title && errors?.title))}
                  placeholder="Enter a compelling title for your video"
                  disabled={isLoading}
                  maxLength={100}
                />
                {touched.title && errors.title && (
                  <div className="mt-2 flex items-center gap-2 text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errors.title}</span>
                  </div>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  {title.length}/100 characters
                </div>
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-200 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className={getInputClasses(false)}
                  placeholder="Describe your video content (optional)"
                  disabled={isLoading}
                  maxLength={500}
                />
                <div className="mt-2 text-xs text-gray-500">
                  {description.length}/500 characters
                </div>
              </div>

              {/* File Upload Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Video File <span className="text-red-400">*</span>
                </label>
                
                {!file ? (
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 hover:border-blue-500 hover:bg-blue-900/20 ${
                      touched.file && errors.file 
                        ? 'border-red-600 bg-red-900/20' 
                        : 'border-gray-600 bg-gray-700/50'
                    }`}
                  >
                    <input
                      type="file"
                      id="video-file"
                      accept="video/mp4"
                      onChange={handleFileChange}
                      onBlur={() => handleBlur('file')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      disabled={isLoading}
                    />
                    <div className="group-hover:scale-110 transition-transform duration-200">
                      <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-200 mb-2">
                      Drop your video here, or browse
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Supports MP4 formats
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg">
                      <span className="text-xs text-purple-300">Maximum file size: 70MB</span>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-green-600/50 bg-green-900/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-800/50 rounded-lg">
                          <File className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-200">{file.name}</p>
                          <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        disabled={isLoading}
                        className="p-1 hover:bg-red-800/50 rounded-full transition-colors disabled:opacity-50"
                      >
                        <X className="w-5 h-5 text-gray-400 hover:text-red-400" />
                      </button>
                    </div>
                  </div>
                )}

                {touched.file && errors.file && (
                  <div className="mt-3 flex items-center gap-2 text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errors.file}</span>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleVideoUpload}
                  disabled={isLoading || Object.keys(errors).length > 0 || !file || !title.trim()}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center gap-3 ${
                    isLoading 
                      ? 'bg-purple-600 text-white cursor-wait shadow-lg shadow-purple-500/25'
                      : Object.keys(errors).length > 0 || !file || !title.trim()
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-blue-500/25'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="flex items-center space-x-3">
                        <Upload className="w-5 h-5 text-white" />
                        <span className="text-white font-medium">Uploading</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload Video
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-700/50 px-8 py-4 border-t border-gray-600">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Supported formats: MP4 </span>
              <span>Max size: 70MB</span>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-900/30 border border-blue-700/50 rounded-xl p-6">
          <h3 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Upload Tips
          </h3>
          <ul className="text-sm text-blue-200 space-y-1">
            <li>• Use descriptive titles to help viewers find your content</li>
            <li>• Higher quality videos tend to get better engagement</li>
            <li>• Consider adding a detailed description with relevant keywords</li>
          </ul>
        </div>
      </div>
    </div>
  );
}



export default VideoUpload