"use client";

import React from "react";


function VideoSkeleton() {
    return (
        <div 
            className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 animate-pulse"
            style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(148, 163, 184, 0.2)'
            }}
        >
            {/* Video preview skeleton */}
            <div className="relative aspect-video overflow-hidden rounded-t-3xl">
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700 animate-pulse"></div>
                {/* Duration badge skeleton */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-slate-700/60 backdrop-blur-sm border border-slate-600/20">
                    <div className="w-12 h-4 bg-slate-600 rounded animate-pulse"></div>
                </div>
            </div>

            {/* Content section skeleton */}
            <div className="p-6 space-y-6">
                {/* Title and description skeleton */}
                <div className="space-y-3">
                    <div className="h-6 bg-slate-700 rounded-lg w-3/4 animate-pulse"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-slate-700/70 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-slate-700/70 rounded w-2/3 animate-pulse"></div>
                    </div>
                    <div className="h-3 bg-slate-700/50 rounded w-20 animate-pulse"></div>
                </div>

                {/* File size comparison skeleton */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-600/40 animate-pulse"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-2 bg-slate-600/60 rounded w-16 animate-pulse"></div>
                                <div className="h-4 bg-slate-600 rounded w-12 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-600/40 animate-pulse"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-2 bg-slate-600/60 rounded w-20 animate-pulse"></div>
                                <div className="h-4 bg-slate-600 rounded w-10 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compression stats and download skeleton */}
                <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1">
                        <div className="h-2 bg-slate-600/60 rounded w-12 animate-pulse"></div>
                        <div className="h-8 bg-slate-600 rounded w-12 animate-pulse"></div>
                    </div>
                    
                    <div className="px-6 py-3 rounded-2xl bg-slate-700/60 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-slate-600 rounded animate-pulse"></div>
                            <div className="w-16 h-4 bg-slate-600 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>
        </div>
    )
}



export default VideoSkeleton