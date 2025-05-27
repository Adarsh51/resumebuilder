"use client";

import React from "react";
import Image from "next/image";

type TemplateProps = {
  id: number;
  name: string;
  description: string;
  previewImageUrl: string;
  selected: boolean;
  onSelect: (id: number) => void;
};

export default function TemplateCard({
  id,
  name,
  description,
  previewImageUrl,
  selected,
  onSelect,
}: TemplateProps) {
  return (
    <div
      className={`relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-200 ${
        selected
          ? "border-indigo-600 ring-2 ring-indigo-600 ring-offset-2"
          : "border-neutral-200 hover:border-neutral-300"
      }`}
      onClick={() => onSelect(id)}
    >
      <div className="aspect-[3/4] w-full overflow-hidden bg-white">
        <Image
          src={previewImageUrl}
          alt={`${name} template preview`}
          className="h-full w-full object-cover"
          width={300}
          height={400}
          priority
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-neutral-900">{name}</h3>
        <p className="mt-1 text-sm text-neutral-500">{description}</p>
      </div>
      {selected && (
        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
