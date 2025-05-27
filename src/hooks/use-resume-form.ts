"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { createUserInSupabaseAction } from "@/app/actions/user-actions";

// Form steps
export type FormStep = 
  | "personal"
  | "education"
  | "experience"
  | "skills"
  | "projects"
  | "certifications"
  | "languages"
  | "hobbies"
  | "template";

// Resume data types
export type PersonalInfo = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements?: string;
};

export type Skill = {
  id: string;
  name: string;
  proficiency: "beginner" | "intermediate" | "advanced" | "expert";
  category: "technical" | "soft" | "other";
};

export type Project = {
  id: string;
  name: string;
  technologies: string;
  description: string;
  link?: string;
  githubLink?: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
};

export type Language = {
  id: string;
  name: string;
  proficiency: "basic" | "conversational" | "fluent" | "native";
};

export type Hobby = {
  id: string;
  name: string;
};

export type ResumeFormData = {
  personal: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  hobbies: Hobby[];
  templateId: number;
  title: string;
  template?: number;
};

// Initial empty form data
export const initialFormData: ResumeFormData = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  hobbies: [],
  templateId: 1, // Default to first template
  title: "My Resume",
};

// Custom hook for resume form with autosave
export function useResumeForm(resumeId?: string) {
  const { user } = useUser();
  const [formData, setFormData] = useState<ResumeFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState<FormStep>("personal");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const router = useRouter();

  // Debounced autosave function
  const saveFormData = async (data: ResumeFormData) => {
    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      setIsSaving(true);
      
      // Ensure user exists in Supabase using server action
      const supabaseUser = await createUserInSupabaseAction();
      
      if (!resumeId) {
        // Create new resume
        const { data: newResume, error: resumeError } = await supabase
          .from('resumes')
          .insert([
            {
              user_id: supabaseUser.id,
              title: data.title,
              template_id: data.templateId,
            }
          ])
          .select()
          .single();
          
        if (resumeError) {
          throw new Error(resumeError.message);
        }
        
        resumeId = newResume.id;
      } else {
        // Update existing resume
        const { error: updateError } = await supabase
          .from('resumes')
          .update({
            title: data.title,
            template_id: data.templateId,
            updated_at: new Date().toISOString(),
          })
          .eq('id', resumeId);
          
        if (updateError) {
          throw new Error(updateError.message);
        }
      }
      
      // Save each section of data
      for (const section of Object.keys(data) as Array<keyof ResumeFormData>) {
        if (section !== 'title' && section !== 'templateId') {
          // Check if section data already exists
          const { data: existingData, error: fetchError } = await supabase
            .from('resume_data')
            .select('*')
            .eq('resume_id', resumeId)
            .eq('section_type', section)
            .single();
            
          if (fetchError && fetchError.code !== 'PGRST116') {
            throw new Error(fetchError.message);
          }
          
          if (existingData) {
            // Update existing section data
            const { error: updateError } = await supabase
              .from('resume_data')
              .update({
                section_data: data[section],
                updated_at: new Date().toISOString(),
              })
              .eq('id', existingData.id);
              
            if (updateError) {
              throw new Error(updateError.message);
            }
          } else {
            // Insert new section data
            const { error: insertError } = await supabase
              .from('resume_data')
              .insert([
                {
                  resume_id: resumeId,
                  section_type: section,
                  section_data: data[section],
                }
              ]);
              
            if (insertError) {
              throw new Error(insertError.message);
            }
          }
        }
      }
      
      setLastSaved(new Date());
      return resumeId;
    } catch (err) {
      console.error('Error saving resume data:', err);
      setError(err instanceof Error ? err.message : 'Failed to save resume data');
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  // Update form data with autosave
  const updateField = (field: keyof ResumeFormData, data: ResumeFormData[keyof ResumeFormData]) => {
    let updatedData: ResumeFormData;

    if (field === "personal") {
      updatedData = {
        ...formData,
        personal: {
          ...formData.personal,
          ...(typeof data === 'object' && data !== null ? data as Partial<PersonalInfo> : {})
        },
      };
    } else {
      updatedData = {
        ...formData,
        [field]: data,
      };
    }

    setFormData(updatedData);
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
  };

  // Navigate to next step
  const nextStep = () => {
    const steps: FormStep[] = [
      "personal",
      "education",
      "experience",
      "skills",
      "projects",
      "certifications",
      "languages",
      "hobbies",
      "template"
    ];
    
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    const steps: FormStep[] = [
      "personal",
      "education",
      "experience",
      "skills",
      "projects",
      "certifications",
      "languages",
      "hobbies",
      "template"
    ];
    
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  // Load resume data if resumeId is provided
  const loadResumeData = async (id: string) => {
    try {
      setIsLoading(true);
      
      // Load resume details
      const { data: resume, error: resumeError } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .single();
        
      if (resumeError) {
        throw new Error(resumeError.message);
      }
      
      // Load all resume data sections
      const { data: sections, error: sectionsError } = await supabase
        .from('resume_data')
        .select('*')
        .eq('resume_id', id);
        
      if (sectionsError) {
        throw new Error(sectionsError.message);
      }
      
      // Reconstruct form data from sections
      const loadedData = { ...initialFormData };
      loadedData.title = resume.title;
      loadedData.templateId = resume.template_id;
      
      for (const section of sections) {
        if (section.section_data !== undefined) {
          switch (section.section_type) {
            case "personal":
              loadedData.personal = section.section_data as PersonalInfo;
              break;
            case "education":
              loadedData.education = section.section_data as Education[];
              break;
            case "experience":
              loadedData.experience = section.section_data as Experience[];
              break;
            case "skills":
              loadedData.skills = section.section_data as Skill[];
              break;
            case "projects":
              loadedData.projects = section.section_data as Project[];
              break;
            case "certifications":
              loadedData.certifications = section.section_data as Certification[];
              break;
            case "languages":
              loadedData.languages = section.section_data as Language[];
              break;
            case "hobbies":
              loadedData.hobbies = section.section_data as Hobby[];
              break;
            case "template":
              loadedData.template = section.section_data as number;
              break;
            default:
              break;
          }
        }
      }
      
      setFormData(loadedData);
    } catch (err) {
      console.error('Error loading resume data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load resume data');
    } finally {
      setIsLoading(false);
    }
  };

  // Finalize and generate resume
  const finalizeResume = async () => {
    try {
      setIsLoading(true);
      
      // Save final form data
      const savedResumeId = await saveFormData(formData);
      
      if (!savedResumeId) {
        throw new Error('Failed to save resume');
      }
      
      // Update resume to mark as finalized
      const { error: updateError } = await supabase
        .from('resumes')
        .update({
          is_public: true,
          public_url: `/resume/${savedResumeId}`,
        })
        .eq('id', savedResumeId);
        
      if (updateError) {
        throw new Error(updateError.message);
      }
      
      // Redirect to view the completed resume
      router.push(`/dashboard/resume/${savedResumeId}`);
    } catch (err) {
      console.error('Error finalizing resume:', err);
      setError(err instanceof Error ? err.message : 'Failed to finalize resume');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    currentStep,
    setCurrentStep,
    isLoading,
    error,
    isSaving,
    lastSaved,
    updateField,
    nextStep,
    prevStep,
    loadResumeData,
    finalizeResume,
  };
}
