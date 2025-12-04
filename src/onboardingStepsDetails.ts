export interface OnboardingStep {
  stepNumber:number;
  stepTitle: string;
  stepDescription: string;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    stepNumber:1,
    stepTitle: "Role Selection",
    stepDescription: "Select your role from the career framework.",
  },
  { 
    stepNumber:2,
    stepTitle: "Pathway",
    stepDescription: "Build your pathway across various roles",
  },
  {
    stepNumber:3,
    stepTitle: "Role Details",
    stepDescription: "Know More about your desired role",
  },
  {
    stepNumber:4,
    stepTitle: "Generate AI Prompt",
    stepDescription: "Generate AI Prompt to achieve the desired role",
  },
];
