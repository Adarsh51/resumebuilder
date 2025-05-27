import React from "react";

type PersonalInfo = {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
};

type Education = {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string;
};

type Experience = {
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  achievements?: string;
};

type Skill = {
  name: string;
  proficiency?: string;
};

type Project = {
  name: string;
  technologies: string;
  description: string;
  link?: string;
  githubLink?: string;
};

type Certification = {
  name: string;
  issuer: string;
  date: string;
};

type Language = {
  name: string;
  proficiency: string;
};

type Hobby = {
  name: string;
  description?: string;
};

type ResumeData = {
  personal?: PersonalInfo;
  education?: Education[];
  experience?: Experience[];
  skills?: Skill[];
  projects?: Project[];
  certifications?: Certification[];
  languages?: Language[];
  hobbies?: Hobby[];
};

type ResumeTemplateProps = {
  data: ResumeData;
  className?: string;
};

export const MinimalTemplate: React.FC<ResumeTemplateProps> = ({ data, className = "" }) => {
  return (
    <div className={`bg-white p-8 font-sans text-neutral-900 ${className}`}>
      {/* Header */}
      <header className="border-b border-neutral-200 pb-4">
        <h1 className="text-3xl font-bold">{data.personal?.fullName || "Full Name"}</h1>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {data.personal?.email && (
            <div className="flex items-center">
              <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>{data.personal.email}</span>
            </div>
          )}
          {data.personal?.phone && (
            <div className="flex items-center">
              <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal?.location && (
            <div className="flex items-center">
              <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{data.personal.location}</span>
            </div>
          )}
          {data.personal?.linkedin && (
            <div className="flex items-center">
              <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.08-1.6 2.2v4.26H8.014v-8.6h2.558v1.17h.036c.356-.67 1.227-1.38 2.526-1.38 2.7 0 3.204 1.78 3.204 4.09v4.72zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.6H3.667v8.6zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
              <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                LinkedIn
              </a>
            </div>
          )}
          {data.personal?.github && (
            <div className="flex items-center">
              <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z" clipRule="evenodd" />
              </svg>
              <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                GitHub
              </a>
            </div>
          )}
          {data.personal?.portfolio && (
            <div className="flex items-center">
              <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              <a href={data.personal.portfolio} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Education</h2>
          <div className="mt-3 space-y-4">
            {data.education.map((edu: Education, index: number) => (
              <div key={index} className="border-l-2 border-neutral-200 pl-4">
                <h3 className="font-medium">{edu.degree}</h3>
                <p className="text-sm text-neutral-600">{edu.institution}</p>
                <p className="text-sm text-neutral-500">
                  {edu.startDate} - {edu.endDate}
                </p>
                {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                {edu.achievements && <p className="text-sm">{edu.achievements}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Experience</h2>
          <div className="mt-3 space-y-4">
            {data.experience.map((exp: Experience, index: number) => (
              <div key={index} className="border-l-2 border-neutral-200 pl-4">
                <h3 className="font-medium">{exp.position}</h3>
                <p className="text-sm text-neutral-600">{exp.company}</p>
                <p className="text-sm text-neutral-500">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </p>
                <p className="mt-1 text-sm">{exp.description}</p>
                {exp.achievements && (
                  <p className="mt-1 text-sm italic">{exp.achievements}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.skills.map((skill: Skill, index: number) => (
              <span
                key={index}
                className="rounded-full bg-neutral-100 px-3 py-1 text-sm"
              >
                {skill.name}
                {skill.proficiency && ` (${skill.proficiency})`}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Projects</h2>
          <div className="mt-3 space-y-4">
            {data.projects.map((project: Project, index: number) => (
              <div key={index} className="border-l-2 border-neutral-200 pl-4">
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-sm text-neutral-600">{project.technologies}</p>
                <p className="mt-1 text-sm">{project.description}</p>
                <div className="mt-1 flex gap-3 text-sm">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Certifications</h2>
          <div className="mt-3 space-y-2">
            {data.certifications.map((cert: Certification, index: number) => (
              <div key={index} className="flex items-baseline justify-between">
                <div>
                  <span className="font-medium">{cert.name}</span>
                  <span className="ml-2 text-sm text-neutral-600">
                    {cert.issuer}
                  </span>
                </div>
                <span className="text-sm text-neutral-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages Section */}
      {data.languages && data.languages.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Languages</h2>
          <div className="mt-3 flex flex-wrap gap-4">
            {data.languages.map((lang: Language, index: number) => (
              <div key={index} className="flex items-center">
                <span className="font-medium">{lang.name}</span>
                <span className="ml-1 text-sm text-neutral-600">
                  ({lang.proficiency})
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies Section */}
      {data.hobbies && data.hobbies.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Hobbies</h2>
          <div className="mt-3 flex flex-wrap gap-4">
            {data.hobbies.map((hobby: Hobby, index: number) => (
              <div key={index} className="flex items-center">
                <span className="font-medium">{hobby.name}</span>
                {hobby.description && (
                  <span className="ml-1 text-sm text-neutral-600">
                    ({hobby.description})
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export const ModernTemplate: React.FC<ResumeTemplateProps> = ({ data, className = "" }) => {
  return (
    <div className={`bg-white font-sans text-neutral-900 ${className}`}>
      {/* Header with accent color */}
      <header className="bg-indigo-600 p-8 text-white">
        <h1 className="text-3xl font-bold">{data.personal?.fullName || "Full Name"}</h1>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {data.personal?.email && (
            <div className="flex items-center">
              <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>{data.personal.email}</span>
            </div>
          )}
          {data.personal?.phone && (
            <div className="flex items-center">
              <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal?.location && (
            <div className="flex items-center">
              <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{data.personal.location}</span>
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-3">
          {data.personal?.linkedin && (
            <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-1-.02-2.28-1.39-2.28-1.39 0-1.6 1.08-1.6 2.2v4.26H8.014v-8.6h2.558v1.17h.036c.356-.67 1.227-1.38 2.526-1.38 2.7 0 3.204 1.78 3.204 4.09v4.72zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.6H3.667v8.6zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
            </a>
          )}
          {data.personal?.github && (
            <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z" clipRule="evenodd" />
              </svg>
            </a>
          )}
          {data.personal?.portfolio && (
            <a href={data.personal.portfolio} target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-100">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-indigo-600">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu: Education, index: number) => (
                <div key={index} className="rounded-lg bg-neutral-50 p-4 shadow-sm">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-sm text-neutral-600">{edu.institution}</p>
                  <p className="text-sm text-neutral-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.gpa && <p className="mt-1 text-sm">GPA: {edu.gpa}</p>}
                  {edu.achievements && <p className="mt-1 text-sm">{edu.achievements}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-indigo-600">Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp: Experience, index: number) => (
                <div key={index} className="rounded-lg bg-neutral-50 p-4 shadow-sm">
                  <h3 className="font-medium">{exp.position}</h3>
                  <p className="text-sm text-neutral-600">{exp.company}</p>
                  <p className="text-sm text-neutral-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                  <p className="mt-2 text-sm">{exp.description}</p>
                  {exp.achievements && (
                    <p className="mt-1 text-sm italic">{exp.achievements}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two-column layout for skills and other sections */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Skills Section */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-semibold text-indigo-600">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: Skill, index: number) => (
                  <span
                    key={index}
                    className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800"
                  >
                    {skill.name}
                    {skill.proficiency && ` (${skill.proficiency})`}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages Section */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="mb-4 text-xl font-semibold text-indigo-600">Languages</h2>
              <div className="space-y-2">
                {data.languages.map((lang: Language, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-sm text-neutral-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-indigo-600">Projects</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.projects.map((project: Project, index: number) => (
                <div key={index} className="rounded-lg bg-neutral-50 p-4 shadow-sm">
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-indigo-600">{project.technologies}</p>
                  <p className="mt-2 text-sm">{project.description}</p>
                  <div className="mt-2 flex gap-3 text-sm">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-indigo-600">Certifications</h2>
            <div className="space-y-2">
              {data.certifications.map((cert: Certification, index: number) => (
                <div key={index} className="flex items-baseline justify-between rounded-lg bg-neutral-50 p-3 shadow-sm">
                  <div>
                    <span className="font-medium">{cert.name}</span>
                    <span className="ml-2 text-sm text-neutral-600">
                      {cert.issuer}
                    </span>
                  </div>
                  <span className="text-sm text-neutral-500">{cert.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hobbies Section */}
        {data.hobbies && data.hobbies.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-indigo-600">Hobbies</h2>
            <div className="flex flex-wrap gap-2">
              {data.hobbies.map((hobby: Hobby, index: number) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-sm"
                >
                  {hobby.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export const ElegantTemplate: React.FC<ResumeTemplateProps> = ({ data, className = "" }) => {
  return (
    <div className={`bg-white font-serif text-neutral-900 ${className}`}>
      {/* Header with subtle styling */}
      <header className="border-b border-neutral-200 p-8 text-center">
        <h1 className="text-3xl font-light tracking-wide">{data.personal?.fullName || "Full Name"}</h1>
        <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-neutral-600">
          {data.personal?.email && (
            <div className="flex items-center">
              <span>{data.personal.email}</span>
            </div>
          )}
          {data.personal?.phone && (
            <div className="flex items-center">
              <span>{data.personal.phone}</span>
            </div>
          )}
          {data.personal?.location && (
            <div className="flex items-center">
              <span>{data.personal.location}</span>
            </div>
          )}
        </div>
        <div className="mt-3 flex justify-center gap-4 text-sm">
          {data.personal?.linkedin && (
            <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900">
              LinkedIn
            </a>
          )}
          {data.personal?.github && (
            <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900">
              GitHub
            </a>
          )}
          {data.personal?.portfolio && (
            <a href={data.personal.portfolio} target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900">
              Portfolio
            </a>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Education Section */}
        {data.education && data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 border-b border-neutral-200 pb-2 text-center text-xl font-light uppercase tracking-widest">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu: Education, index: number) => (
                <div key={index} className="text-center">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className="text-neutral-600">{edu.institution}</p>
                  <p className="text-sm text-neutral-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.gpa && <p className="mt-1 text-sm">GPA: {edu.gpa}</p>}
                  {edu.achievements && <p className="mt-1 text-sm italic">{edu.achievements}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 border-b border-neutral-200 pb-2 text-center text-xl font-light uppercase tracking-widest">Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp: Experience, index: number) => (
                <div key={index}>
                  <div className="mb-2 flex justify-between">
                    <h3 className="font-medium">{exp.position}</h3>
                    <p className="text-sm text-neutral-500">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                  </div>
                  <p className="text-neutral-600">{exp.company}</p>
                  <p className="mt-2 text-sm">{exp.description}</p>
                  {exp.achievements && (
                    <p className="mt-1 text-sm italic">{exp.achievements}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 border-b border-neutral-200 pb-2 text-center text-xl font-light uppercase tracking-widest">Skills</h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {data.skills.map((skill: Skill, index: number) => (
                <div key={index} className="text-center">
                  <span className="font-medium">{skill.name}</span>
                  {skill.proficiency && (
                    <span className="ml-1 text-sm text-neutral-500">
                      ({skill.proficiency})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 border-b border-neutral-200 pb-2 text-center text-xl font-light uppercase tracking-widest">Projects</h2>
            <div className="space-y-6">
              {data.projects.map((project: Project, index: number) => (
                <div key={index}>
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-neutral-600">{project.technologies}</p>
                  <p className="mt-2 text-sm">{project.description}</p>
                  <div className="mt-2 flex gap-4 text-sm">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-neutral-900"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-neutral-900"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two-column layout for certifications and languages */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Certifications Section */}
          {data.certifications && data.certifications.length > 0 && (
            <section>
              <h2 className="mb-4 border-b border-neutral-200 pb-2 text-center text-xl font-light uppercase tracking-widest">Certifications</h2>
              <div className="space-y-3">
                {data.certifications.map((cert: Certification, index: number) => (
                  <div key={index} className="text-center">
                    <span className="font-medium">{cert.name}</span>
                    <p className="text-sm text-neutral-600">{cert.issuer}</p>
                    <p className="text-sm text-neutral-500">{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages Section */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="mb-4 border-b border-neutral-200 pb-2 text-center text-xl font-light uppercase tracking-widest">Languages</h2>
              <div className="space-y-3">
                {data.languages.map((lang: Language, index: number) => (
                  <div key={index} className="text-center">
                    <span className="font-medium">{lang.name}</span>
                    <p className="text-sm text-neutral-600">{lang.proficiency}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Hobbies Section */}
        {data.hobbies && data.hobbies.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 border-b border-neutral-200 pb-2 text-center text-xl font-light uppercase tracking-widest">Hobbies</h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {data.hobbies.map((hobby: Hobby, index: number) => (
                <span key={index} className="text-neutral-600">
                  {hobby.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export const getTemplateComponent = (templateId: number) => {
  switch (templateId) {
    case 1:
      return MinimalTemplate;
    case 2:
      return ModernTemplate;
    case 3:
      return ElegantTemplate;
    default:
      return MinimalTemplate;
  }
};
