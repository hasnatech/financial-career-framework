import { LucideUser } from 'lucide-react';
import React from 'react';
import type {OnboardingStep} from '../onboardingStepsDetails'

interface Props {
    stepDetails: OnboardingStep,
    currentStep:number,
    setCurrentStep:(value:number)=>void
}

const Step: React.FC<Props> = ({stepDetails,currentStep,setCurrentStep}) => {
    return (
    <div onClick={()=>{
        setCurrentStep(stepDetails.stepNumber);
    }} className={`${currentStep!=stepDetails.stepNumber ? 'opacity-50 cursor-pointer hover:opacity-40 duration-500' : ''} `}>
        <div className='flex items-center gap-x-4'>
            <div className='relative flex flex-col items-center'>
                <span className='shadow-sm rounded-lg bg-white p-1 h-fit '>
                    <LucideUser className='stroke-slate-600'></LucideUser>
                </span>
                <span className={`w-px h-12 absolute -bottom-14 bg-slate-400 ${stepDetails.stepNumber===4 ? 'hidden' : ''}`}></span>
            </div>
            <div className='flex flex-col gap-y-2'>
                <p className='font-bold'>{stepDetails.stepTitle}</p>
                <p>{stepDetails.stepDescription}</p>
            </div>
        </div>
    </div>
    );
}

export default Step;
