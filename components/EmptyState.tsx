"use client";

import React from "react";
import { Film } from "lucide-react";


function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
                <Film className="w-12 h-12 text-gray-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">0</span>
            </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">No Videos Available</h3>
        <p className="text-gray-400 mb-8 max-w-md">
            It looks like there are no videos to display right now. 
            You can upload your content and ensure your device is online, or refresh the page.
            If the issue persists, please try again later.
        </p>
        <div className="flex space-x-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105">
                Refresh Page
            </button>
        </div>
    </div>
  )
}



export default EmptyState