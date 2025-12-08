import { LucideUser } from "lucide-react";
import React from "react";
import type { OnboardingStep } from "../onboardingStepsDetails";
import { div } from "framer-motion/client";

interface Props {
  stepDetails: OnboardingStep;
  currentStep: number;
  setCurrentStep: (value: number) => void;
}

const Step: React.FC<Props> = ({
  stepDetails,
  currentStep,
  setCurrentStep,
}) => {
  return (
    
      <div
        onClick={() => {
          setCurrentStep(stepDetails.stepNumber);
        }}
        className={`flex-1 ${
          currentStep != stepDetails.stepNumber
            ? "opacity-50 cursor-pointer hover:opacity-40 duration-500"
            : ""
        } `}
      >
        <div className="flex gap-x-4 h-full">
          <div className="relative flex flex-col items-center">
            <span className="z-10 rounded-full px-3 py-1 bg-white text-primary">
              {stepDetails.stepNumber}
            </span>

            {/* vertical line */}
            {stepDetails.stepNumber !== 4 && (
              <span className="absolute top-0 bottom-0 w-px bg-slate-400" />
            )}
          </div>
          <div className="flex flex-col">
            <p className="font-bold">{stepDetails.stepTitle}</p>
            <p className="text-sm text-white/70 mb-5">
              {stepDetails.stepDescription}
            </p>
          </div>
        </div>
      </div>
    
  );
};

export default Step;
