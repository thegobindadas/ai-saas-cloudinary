"use client";

import React, { useState, useEffect, useCallback } from "react";
import VideoCard from "@/components/VideoCard";
import ErrorBanner from "@/components/ErrorBanner";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import { Video } from "@/types";
import axios from "axios";



function Home() {

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const fetchVideos = useCallback(async () => {
    try {

      setLoading(true);
      setError(null);

      const response = await axios.get("/api/videos");

      if(Array.isArray(response.data.videos)) {
        setVideos(response.data.videos);
      } else {
        throw new Error("Unexpected response format.");
      }

    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Failed to fetch videos. Please try again later.");
    } finally {
      setLoading(false);  
    }
  }, [])


  useEffect(() => {
    setLoading(true);
    fetchVideos();
  }, [fetchVideos]);


  const handleDownload = useCallback((url: string, title: string) => {
    () => {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.mp4`);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [])


  const dismissError = () => {
    setError(null)
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Video Library
          </h1>
        </div>

        {/* Error Banner */}
        {error && (
          <ErrorBanner error={error} onDismiss={dismissError} />
        )}

        {/* Main Content */}
        {loading ? (
          <LoadingState />
        ) : videos.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}



export default Home