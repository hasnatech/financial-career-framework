export interface OnboardingStep {
  stepNumber:number;
  stepTitle: string;
  stepDescription: string;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    stepNumber:1,
    stepTitle: "Job Role Navigation & Selection",
    stepDescription: "Zoom in and out to explore the framework. Select your current or desired role.",
  },
  { 
    stepNumber:2,
    stepTitle: "Job Profile Details",
    stepDescription: "Learn about the key tasks, skills and behaviors expected in each role and how they align to the Technical Finance Competency Model.",
  },
  {
    stepNumber:3,
    stepTitle: "Search, Legend, Pathway, and Print",
    stepDescription: "Type in the desired job title in the search box or use the legend to find roles in a particular area. Use My Pathway to build your desired pathway, print it, share it, and use it in career-focused conversations.",
  },
  {
    stepNumber:4,
    stepTitle: "Copilot Corner",
    stepDescription: "Generate AI prompts to copy and paste into the Finance Career Coach Agent in Copilot. Get individualized development suggestions and coaching support (for managers).",
  },
];
