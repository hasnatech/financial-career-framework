import React, { useState } from "react";
import type { OnboardingStep } from "../onboardingStepsDetails";
import { onboardingSteps } from "../onboardingStepsDetails";
import Step from "./Step";

interface Props {
  setShouldShowOnboardingPopup: (value: boolean) => void;
}

const OnboardingPopup: React.FC<Props> = ({ setShouldShowOnboardingPopup }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <div className="fixed inset-0 backdrop-blur-lg  bg-black bg-opacity-50 flex flex-col items-center justify-center z-50 ">
      <div className="relative bg-white w-[98%] max-w-[1240px] max-h-full flex gap-y-2 rounded-lg overflow-clip p-1">
        {/* <button
          onClick={() => {
            setShouldShowOnboardingPopup(false);
          }}
          className="group absolute top-3 right-3 z-20 p-2 rounded-full hover:bg-red-800 hover:text-white transition-colors duration-100"
        >
          <LucideX className="w-4 h-4 text-red-800 group-hover:text-white"></LucideX>
        </button> */}
        <div className="flex flex-col flex-1 relative gap-y-4 bg-primary text-white h-full p-4 rounded-lg">
          <h1 className="font-bold text-2xl  mb-4">Cargil Career Framework</h1>
          <div className="flex flex-col flex-1 mb-6">
          {onboardingSteps.map((stepDetails: OnboardingStep) => {
            return (
              <Step
                stepDetails={stepDetails}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
              ></Step>
            );
          })}
          </div>
          <button
            onClick={() => {
              setShouldShowOnboardingPopup(false);
            }}
            className="absolute bottom-4 left-8"
          >
            Skip
          </button>
          <button
                onClick={() => {
                  if (currentStep === 4) {
                    setShouldShowOnboardingPopup(false);
                  } else {
                    setCurrentStep((prev) => prev + 1);
                  }
                }}
                className="absolute bottom-3 right-4 bg-white  rounded-lg  px-4 py-1 text-primary hover:opacity-75 duration-500"
              >
                {currentStep === 4 ? "Finish" : "Next"}
              </button>
        </div>
        <div className="flex flex-col p-4 relative items-center h-full w-full flex-1 justify-center max-xl:justify-around  max-h-full">
          
          <div className="flex flex-col h-full justify-around max-xl:justify-center max-xl:gap-y-8 max-h-full 
          gap-y-4 w-full items-center ">
            {/* <video muted autoPlay
              className="max-h-[24rem] max-w-full rounded-lg object-contain border border-gray-100 rounded bg-gray-100"
              src={`/images/step${currentStep}.mp4`}
            ></video> */}
            <img 
              className="max-h-[20rem] max-w-full rounded-lg object-contain border border-gray-300 rounded bg-gray-100"
              src={`images/onboarding_step_${currentStep}.png`}
            ></img>
            <div className="flex flex-col items-center gap-y-4">
              <div className="flex flex-col items-center gap-y-2">
                <p className="text-xl font-bold text-primary">
                  {onboardingSteps[currentStep - 1].stepTitle}
                </p>
                <p className="min-h-20 text-center">{onboardingSteps[currentStep - 1].stepDescription}</p>
              </div>
              
            </div>
          </div>
          <div className="flex gap-x-4 my-3">
            <button
              onClick={() => {
                setCurrentStep(1);
              }}
              className={`h-[5px] w-16 rounded-full ${
                currentStep === 1 ? "bg-primary" : "bg-slate-300"
              }`}
            ></button>
            <button
              onClick={() => {
                setCurrentStep(2);
              }}
              className={`h-[5px] w-16 rounded-full ${
                currentStep === 2 ? "bg-primary" : "bg-slate-300"
              }`}
            ></button>
            <button
              onClick={() => {
                setCurrentStep(3);
              }}
              className={`h-[5px] w-16 rounded-full ${
                currentStep === 3 ? "bg-primary" : "bg-slate-300"
              }`}
            ></button>
            <button
              onClick={() => {
                setCurrentStep(4);
              }}
              className={`h-[5px] w-16 rounded-full ${
                currentStep === 4 ? "bg-primary" : "bg-slate-300"
              }`}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPopup;
