"use client";

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTemplateComponent } from '@/components/resume-templates';
import { generateResumePDF, downloadPDF } from '@/lib/pdf-generator';
import { supabase } from '@/lib/supabase';
import { ResumeFormData } from '@/hooks/use-resume-form';

type ResumeViewerProps = {
  resumeData: ResumeFormData;
  resumeId: string;
};

export default function ResumeViewer({ resumeData, resumeId }: ResumeViewerProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Get the appropriate template component based on the template ID
  const TemplateComponent = getTemplateComponent(resumeData.templateId);
  
  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      
      if (!resumeRef.current) {
        throw new Error('Resume preview not available');
      }
      
      const pdfBlob = await generateResumePDF(resumeData, 'resume-preview');
      downloadPDF(pdfBlob, `${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      
      // Update download count or track analytics if needed
      await supabase
        .from('resumes')
        .update({ last_edited: new Date().toISOString() })
        .eq('id', resumeId);
        
    } catch (err) {
      console.error('Error downloading PDF:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleShareResume = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      
      // Update resume to make it public
      const { error: updateError } = await supabase
        .from('resumes')
        .update({
          is_public: true,
          public_url: `/resume/${resumeId}`,
        })
        .eq('id', resumeId);
        
      if (updateError) {
        throw new Error(updateError.message);
      }
      
      // Copy the public URL to clipboard
      const publicUrl = `${window.location.origin}/resume/${resumeId}`;
      await navigator.clipboard.writeText(publicUrl);
      
      alert('Public URL copied to clipboard!');
      
    } catch (err) {
      console.error('Error sharing resume:', err);
      setError('Failed to share resume. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleEditResume = () => {
    router.push(`/dashboard/edit/${resumeId}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-neutral-900">
          {resumeData.title || 'My Resume'}
        </h1>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleEditResume}
            className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Edit Resume
          </button>
          
          <button
            onClick={handleShareResume}
            className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Share Public URL
          </button>
          
          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
          >
            {isGenerating ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div 
          id="resume-preview" 
          ref={resumeRef}
          className="max-w-[800px] mx-auto"
        >
          <TemplateComponent data={resumeData} />
        </div>
      </div>
    </div>
  );
}
