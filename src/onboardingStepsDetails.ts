export interface OnboardingStep {
  stepNumber:number;
  stepTitle: string;
  stepDescription: string;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    stepNumber:1,
    stepTitle: "Job Role Selection",
    stepDescription: "Select your role from the career framework.",
  },
  { 
    stepNumber:2,
    stepTitle: "Job Role Details",
    stepDescription: "Know More about your desired role",
  },
  {
    stepNumber:3,
    stepTitle: "Legends, Pathway & Print",
    stepDescription: "Build your pathway across various roles",
  },
  {
    stepNumber:4,
    stepTitle: "Copilot Corner",
    stepDescription: "Generate AI Prompt to achieve the desired role",
  },
];
