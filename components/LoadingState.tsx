"use client";

import React from "react";
import VideoSkeleton from "./VideoSkeleton";


function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-8">
                {/* Main spinner */}
                <div className="w-20 h-20 border-4 border-slate-700 border-t-purple-500 rounded-full animate-spin"></div>
                {/* Secondary spinner */}
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-pink-500 rounded-full animate-spin animate-reverse" style={{animationDuration: '1.5s'}}></div>
                {/* Inner glow */}
                <div className="absolute inset-2 w-16 h-16 border-2 border-transparent border-b-blue-400 rounded-full animate-spin" style={{animationDuration: '0.8s'}}></div>
            </div>
    
            <div className="text-center mb-12">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    Loading Videos
                </h3>
                <p className="text-slate-400">Fetching your compressed video collection...</p>
            
                {/* Loading dots */}
                <div className="flex justify-center items-center space-x-1 mt-4">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4">
                {[...Array(6)].map((_, i) => (
                    <VideoSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}



export default LoadingState