"use client";

import React from "react";
import { AlertCircle } from "lucide-react";


function ErrorBanner({ error, onDismiss }: { error: string, onDismiss: () => void }) {
  return (
    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6 backdrop-blur-sm">
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-red-300 font-medium mb-1">Error occurred</h4>
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="text-red-400 hover:text-red-200 transition-colors ml-4"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
  )
}



export default ErrorBanner