"use client";

import { useState } from "react";
import { FormStep, useResumeForm } from "@/hooks/use-resume-form";

export default function NewResumePage() {
  const {
    currentStep,
    isLoading,
    error,
    isSaving,
    lastSaved,
    updateField,
    nextStep,
    prevStep,
  } = useResumeForm();

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateField("personal", personalInfo);
    nextStep();
  };

  const renderStepIndicator = () => {
    const steps: FormStep[] = [
      "personal",
      "education",
      "experience",
      "skills",
      "projects",
      "certifications",
      "languages",
      "hobbies",
      "template",
    ];
    
    const currentIndex = steps.indexOf(currentStep);
    
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div 
              key={step} 
              className={`flex flex-col items-center ${
                index <= currentIndex ? "text-indigo-600" : "text-neutral-400"
              }`}
            >
              <div 
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  index < currentIndex 
                    ? "bg-indigo-600 text-white" 
                    : index === currentIndex 
                    ? "border-2 border-indigo-600 text-indigo-600" 
                    : "border-2 border-neutral-300 text-neutral-400"
                }`}
              >
                {index < currentIndex ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span className="mt-2 text-xs font-medium capitalize">{step}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-neutral-200">
          <div 
            className="h-2 rounded-full bg-indigo-600 transition-all duration-300" 
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderPersonalInfoForm = () => {
    return (
      <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={personalInfo.fullName}
              onChange={handlePersonalInfoChange}
              required
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
              required
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="john.doe@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
              required
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-neutral-700">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={personalInfo.location}
              onChange={handlePersonalInfoChange}
              required
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="San Francisco, CA"
            />
          </div>
          
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-neutral-700">
              LinkedIn (optional)
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={personalInfo.linkedin}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
          
          <div>
            <label htmlFor="github" className="block text-sm font-medium text-neutral-700">
              GitHub (optional)
            </label>
            <input
              type="url"
              id="github"
              name="github"
              value={personalInfo.github}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="https://github.com/johndoe"
            />
          </div>
          
          <div>
            <label htmlFor="portfolio" className="block text-sm font-medium text-neutral-700">
              Portfolio Website (optional)
            </label>
            <input
              type="url"
              id="portfolio"
              name="portfolio"
              value={personalInfo.portfolio}
              onChange={handlePersonalInfoChange}
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              placeholder="https://johndoe.com"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          {isSaving && (
            <span className="mr-4 flex items-center text-sm text-neutral-500">
              <svg className="mr-2 h-4 w-4 animate-spin text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          )}
          
          {lastSaved && !isSaving && (
            <span className="mr-4 flex items-center text-sm text-neutral-500">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
          
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Next: Education
          </button>
        </div>
      </form>
    );
  };

  // Placeholder for other form steps
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "personal":
        return renderPersonalInfoForm();
      default:
        return (
          <div className="text-center">
            <p className="text-neutral-600">
              This step is under construction. More form sections coming soon!
            </p>
            <div className="mt-6 flex justify-between">
              <button
                onClick={prevStep}
                className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Next
              </button>
            </div>
          </div>
        );
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
          <p className="mt-4 text-neutral-600">Loading resume data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Create New Resume
        </h1>
        <p className="mt-2 text-neutral-600">
          Fill out the form below to create your professional resume. Your progress is automatically saved.
        </p>
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
      
      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        {renderStepIndicator()}
        {renderCurrentStep()}
      </div>
    </div>
  );
}
