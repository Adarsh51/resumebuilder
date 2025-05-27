"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Resume } from "@/lib/supabase";

export default function ResumeGrid() {
  const { user } = useUser();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResumes() {
      try {
        if (!user) {
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        setError(null);
        
        // Fetch user's resumes using the Clerk user ID
        const { data, error: fetchError } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });
          
        if (fetchError) {
          throw new Error(fetchError.message);
        }
        
        setResumes(data || []);
      } catch (err) {
        console.error('Error fetching resumes:', err);
        setError('Failed to load your resumes. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchResumes();
  }, [user]);
  
  const handleDeleteResume = async (resumeId: string) => {
    if (!confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      return;
    }
    
    try {
      setError(null);
      
      // Delete resume
      const { error: deleteError } = await supabase
        .from('resumes')
        .delete()
        .eq('id', resumeId);
        
      if (deleteError) {
        throw new Error(deleteError.message);
      }
      
      // Update local state
      setResumes(resumes.filter(resume => resume.id !== resumeId));
    } catch (err) {
      console.error('Error deleting resume:', err);
      setError('Failed to delete resume. Please try again.');
    }
  };
  
  const handleDuplicateResume = async (resumeId: string) => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      setError(null);
      
      // Get the resume to duplicate
      const resumeToDuplicate = resumes.find(resume => resume.id === resumeId);
      if (!resumeToDuplicate) {
        throw new Error('Resume not found');
      }
      
      // Create new resume
      const { data: newResume, error: createError } = await supabase
        .from('resumes')
        .insert([
          {
            user_id: user.id,
            title: `${resumeToDuplicate.title} (Copy)`,
            template_id: resumeToDuplicate.template_id,
          }
        ])
        .select()
        .single();
        
      if (createError) {
        throw new Error(createError.message);
      }
      
      // Get all resume data sections
      const { data: sections, error: sectionsError } = await supabase
        .from('resume_data')
        .select('*')
        .eq('resume_id', resumeId);
        
      if (sectionsError) {
        throw new Error(sectionsError.message);
      }
      
      // Duplicate all sections for the new resume
      if (sections && sections.length > 0) {
        const newSections = sections.map(section => ({
          resume_id: newResume.id,
          section_type: section.section_type,
          section_data: section.section_data,
        }));
        
        const { error: insertError } = await supabase
          .from('resume_data')
          .insert(newSections);
          
        if (insertError) {
          throw new Error(insertError.message);
        }
      }
      
      // Update local state
      setResumes([newResume, ...resumes]);
    } catch (err) {
      console.error('Error duplicating resume:', err);
      setError('Failed to duplicate resume. Please try again.');
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-neutral-600">Loading your resumes...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
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
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Create New Resume Card */}
        <div className="flex h-64 flex-col justify-center rounded-xl border border-dashed border-neutral-300 p-6 text-center transition-colors hover:border-neutral-400">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-neutral-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-sm font-medium text-neutral-900">
            Create new resume
          </h3>
          <p className="mt-1 text-sm text-neutral-500">
            Start fresh with a new resume
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/new"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create resume →
            </Link>
          </div>
        </div>
        
        {/* Resume Cards */}
        {resumes.map((resume) => (
          <div 
            key={resume.id} 
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-neutral-900 line-clamp-1">
                {resume.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                Last edited: {new Date(resume.updated_at).toLocaleDateString()}
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                Template: {resume.template_id === 1 ? 'Minimal' : resume.template_id === 2 ? 'Modern' : 'Elegant'}
              </p>
              
              {resume.is_public && (
                <div className="mt-2 flex items-center">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Public
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex border-t border-neutral-200 bg-neutral-50 p-4">
              <Link
                href={`/dashboard/resume/${resume.id}`}
                className="flex-1 text-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View
              </Link>
              <button
                onClick={() => handleDuplicateResume(resume.id)}
                className="flex-1 text-center text-sm font-medium text-neutral-600 hover:text-neutral-900"
              >
                Duplicate
              </button>
              <button
                onClick={() => handleDeleteResume(resume.id)}
                className="flex-1 text-center text-sm font-medium text-red-600 hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {resumes.length === 0 && (
        <div className="mt-4 rounded-md bg-neutral-50 p-4 text-center">
          <p className="text-neutral-600">You have not created any resumes yet. Get started by creating your first resume!</p>
        </div>
      )}
    </div>
  );
}
