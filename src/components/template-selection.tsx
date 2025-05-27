"use client";

import TemplateCard from "@/components/template-card";

type TemplateSelectionProps = {
  selectedTemplateId: number;
  onSelectTemplate: (id: number) => void;
  onNext: () => void;
  onPrevious: () => void;
};

export default function TemplateSelection({
  selectedTemplateId,
  onSelectTemplate,
  onNext,
  onPrevious,
}: TemplateSelectionProps) {
  const templates = [
    {
      id: 1,
      name: "Minimal",
      description: "Clean, straightforward layout with a focus on content",
      previewImageUrl: "/templates/minimal.png",
    },
    {
      id: 2,
      name: "Modern",
      description: "Contemporary design with accent colors and modern typography",
      previewImageUrl: "/templates/modern.png",
    },
    {
      id: 3,
      name: "Elegant",
      description: "Sophisticated layout with subtle design elements and refined styling",
      previewImageUrl: "/templates/elegant.png",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">
          Choose a Template
        </h2>
        <p className="mt-1 text-neutral-600">
          Select a professional template for your resume. You can preview how your information will look.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            id={template.id}
            name={template.name}
            description={template.description}
            previewImageUrl={template.previewImageUrl}
            selected={selectedTemplateId === template.id}
            onSelect={onSelectTemplate}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onPrevious}
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Finalize Resume
        </button>
      </div>
    </div>
  );
}
