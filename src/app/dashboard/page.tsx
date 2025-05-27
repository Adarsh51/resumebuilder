"use client";

// import { useState } from "react";
import ResumeGrid from "@/components/resume-grid";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Your Resumes
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your resumes and create new ones from your dashboard.
        </p>
      </div>
      
      <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <ResumeGrid />
      </div>
      
      <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-foreground">Tips for a Great Resume</h2>
        <ul className="mt-4 space-y-2 text-muted-foreground">
          <li className="flex items-start">
            <svg className="mr-2 h-5 w-5 flex-shrink-0 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Keep your resume concise and focused on relevant experience</span>
          </li>
          <li className="flex items-start">
            <svg className="mr-2 h-5 w-5 flex-shrink-0 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Use action verbs and quantify your achievements when possible</span>
          </li>
          <li className="flex items-start">
            <svg className="mr-2 h-5 w-5 flex-shrink-0 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Tailor your resume for each job application</span>
          </li>
          <li className="flex items-start">
            <svg className="mr-2 h-5 w-5 flex-shrink-0 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Proofread carefully to avoid spelling and grammar errors</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
