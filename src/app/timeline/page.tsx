"use client";

import { useElectionData } from '@/hooks/useElectionData';
import TimelineCard from '@/components/TimelineCard';

export default function TimelinePage() {
  const { timeline, currentStepIndex, setCurrentStep } = useElectionData();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Election Process Timeline</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Follow the step-by-step journey of a typical democratic election. Click on any step to learn more.
        </p>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 dark:before:via-gray-700 before:to-transparent">
        {timeline.map((step, index) => (
          <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="hidden md:block w-full" />
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-950 bg-blue-500 text-white font-bold shrink-0 md:order-1 shadow-md z-10">
              {index + 1}
            </div>
            <div className="w-full md:w-[calc(50%-2.5rem)] ml-6 md:ml-0 md:px-6">
              <TimelineCard 
                step={step} 
                isActive={currentStepIndex === index}
                isPast={index < currentStepIndex}
                onClick={() => setCurrentStep(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
