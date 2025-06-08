"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { Download, Clock, FileDown, FileUp, Play } from "lucide-react";
import { filesize } from "filesize";
import { Video } from '@/types';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";


dayjs.extend(relativeTime);


interface VideoCardProps {
    video: Video;
    onDownload: (url: string, title: string) => void;
}



const VideoCard: React.FC<VideoCardProps> = ({video, onDownload}) => {

    const [isHovered, setIsHovered] = useState(false)
    const [previewError, setPreviewError] = useState(false)


    const getThumbnailUrl = useCallback((publicId: string) => {
        return getCldImageUrl({
            src: publicId,
            width: 400,
            height: 225,
            crop: "fill",
            gravity: "auto",
            format: "jpg",
            quality: "auto",
            assetType: "video"
        })
    }, [])


    const getFullVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            width: 1920,
            height: 1080,

        })
    }, [])

    const getPreviewVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            width: 400,
            height: 225,
            rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"]

        })
    }, [])


    const formatDuration = useCallback((seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }, []);


    const compressionPercentage = Math.round(
    (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
    );

    
    const formatSize = useCallback((size: number) => {
        return filesize(size)
    }, [])


    useEffect(() => {
        setPreviewError(false);
    }, [isHovered]);


    const handlePreviewError = () => {
        setPreviewError(true);
    };



    return (
        <div
            className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-3xl hover:shadow-purple-500/20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(148, 163, 184, 0.2)'
            }}
        >
            {/* Video preview section */}
            <div className="relative aspect-video overflow-hidden rounded-t-3xl">
                {isHovered ? (
                    previewError ? (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <Play className="w-8 h-8 text-red-400" />
                                </div>
                                <p className="text-red-400 text-sm font-medium">Preview unavailable</p>
                            </div>
                        </div>
                    ) : (
                        <video
                            src={getPreviewVideoUrl(video.publicId)}
                            autoPlay
                            muted
                            loop
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={handlePreviewError}
                        />
                    )
                ) : (
                    <div className="relative">
                        <img
                            src={getThumbnailUrl(video.publicId)}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                <Play className="w-8 h-8 text-white ml-1" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white text-sm font-medium flex items-center gap-1 ">
                    <Clock className="w-4 h-4" />
                    {formatDuration(video.duration)}
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>


             {/* Content section */}
            <div className="p-6 space-y-6">
                {/* Title and description */}
                <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-500">
                        {video.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                        {video.description}
                    </p>
                    <p className="text-slate-400 text-xs font-medium">
                        {dayjs(video.createdAt).fromNow()}
                    </p>
                </div>

                {/* File size comparison */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 backdrop-blur-sm group-hover:from-slate-700/50 group-hover:to-slate-600/50 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                <FileUp className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-slate-300 text-xs font-medium uppercase tracking-wide">Original</div>
                                <div className="text-white font-bold">{formatSize(Number(video.originalSize))}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-slate-600/30 backdrop-blur-sm group-hover:from-slate-700/50 group-hover:to-slate-600/50 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                <FileDown className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                                <div className="text-slate-300 text-xs font-medium uppercase tracking-wide">Compressed</div>
                                <div className="text-white font-bold">{formatSize(Number(video.compressedSize))}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compression stats and download */}
                <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1">
                        <div className="text-slate-300 text-xs font-medium uppercase tracking-wide">Compression:</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                            {compressionPercentage}%
                        </div>
                    </div>
                    
                    <button
                        onClick={() => onDownload(getFullVideoUrl(video.publicId), video.title)}
                        className="relative group/btn px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                        <div className="relative flex items-center gap-2">
                            <Download className="w-4 h-4 transform group-hover/btn:scale-110 transition-transform duration-300" />
                            <span className="text-sm">Download</span>
                        </div>
                    </button>
                </div>
            </div>

        </div>
    );
}



export default VideoCard