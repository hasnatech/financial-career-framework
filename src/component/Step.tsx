import { LucideUser } from "lucide-react";
import React from "react";
import type { OnboardingStep } from "../onboardingStepsDetails";

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
      className={`${
        currentStep != stepDetails.stepNumber
          ? "opacity-50 cursor-pointer hover:opacity-40 duration-500"
          : ""
      } `}
    >
      <div className="flex gap-x-4 mb-10">
        <div className="relative flex flex-col items-center">
          <span className="shadow-sm h-fit ">
            {/* <LucideUser className="stroke-slate-600"></LucideUser> */}
            <div className="rounded-full px-3 py-1 bg-primary text-white">
                {stepDetails.stepNumber}
            </div>
          </span>
          <span
            className={`w-px h-16 absolute -bottom-14 bg-slate-400 ${
              stepDetails.stepNumber === 4 ? "hidden" : ""
            }`}
          ></span>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">{stepDetails.stepTitle}</p>
          <p className="text-sm text-gray-800 ">{stepDetails.stepDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default Step;
