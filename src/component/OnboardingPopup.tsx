import { LucideUser, LucideX } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { onboardingSteps } from '../onboardingStepsDetails';
import Step from './Step';
import type { OnboardingStep } from '../onboardingStepsDetails';



interface Props {
  setShouldShowOnboardingPopup: (value: boolean) => void;
}

const OnboardingPopup: React.FC<Props> = ({setShouldShowOnboardingPopup}) => {
  const [currentStep,setCurrentStep]=useState<number>(1);

  useEffect(()=>{
    console.log(currentStep);
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50 p-4">
        <div className="relative bg-white h-[90%] w-[90%] max-w-full max-h-full flex gap-y-2 rounded-lg overflow-clip p-4">
               <button
                  onClick={() => {
                    setShouldShowOnboardingPopup(false);
                  }}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-100"
                >
                  <LucideX className="w-6 h-6"></LucideX>
                </button>
            <div className='flex flex-col relative gap-y-4 bg-slate-50 h-full p-4 rounded-lg'>
                <h1 className='font-bold text-2xl'>Cargil Career Framework</h1>
                {onboardingSteps.map((stepDetails:OnboardingStep)=>{
                  return <Step stepDetails={stepDetails} currentStep={currentStep} setCurrentStep={setCurrentStep}></Step>
                })}
                <button onClick={()=>{
                  setShouldShowOnboardingPopup(false);
                }} className='absolute bottom-4 left-8'>Skip</button>
            </div>
            <div className='flex flex-col p-4 relative items-center h-full w-full max-w-[80%] justify-center max-xl:justify-around  max-h-full'>
                <p className='font-bold text-2xl mt-px'>Welcome to Cargil Career Framework</p>
                <div className='flex flex-col h-full justify-around max-xl:justify-center max-xl:gap-y-8 max-h-full gap-y-4 w-full items-center p-4'>  
                    <img className='max-h-[24rem] max-w-full rounded-lg object-contain' src={`/images/onboarding_step_${currentStep}.png`}></img>
                    <div className='flex flex-col items-center gap-y-4'>
                        <div className='flex flex-col items-center gap-y-2'>
                          <p className='text-xl font-bold'>
                          {onboardingSteps[currentStep-1].stepTitle}
                        </p>
                        <p>
                          {onboardingSteps[currentStep-1].stepDescription}
                        </p>
                        </div>
                        <button onClick={()=>{
                      if(currentStep===4){
                        setShouldShowOnboardingPopup(false);
                      }
                      else{
                        setCurrentStep(prev=>prev+1);
                      }
                    }} className='bg-green-700 rounded-lg font-bold w-80 p-2 text-white hover:opacity-75 duration-500'>{currentStep===4 ? 'Finish' : 'Next'}</button>                
                    </div>
                  
                </div>
                <div className='flex gap-x-4 absolute bottom-6 xl:bottom-4'>
                <button onClick={()=>{
                  setCurrentStep(1)
                }} className={`h-[5px] w-16 rounded-full ${currentStep===1 ? 'bg-green-700' : 'bg-slate-300'}`}></button>
                <button onClick={()=>{
                  setCurrentStep(2)
                }} className={`h-[5px] w-16 rounded-full ${currentStep===2 ? 'bg-green-700' : 'bg-slate-300'}`}></button>
                <button onClick={()=>{
                  setCurrentStep(3)
                }} className={`h-[5px] w-16 rounded-full ${currentStep===3 ? 'bg-green-700' : 'bg-slate-300'}`}></button>
                <button onClick={()=>{
                  setCurrentStep(4)
                }} className={`h-[5px] w-16 rounded-full ${currentStep===4 ? 'bg-green-700' : 'bg-slate-300'}`}></button>
                </div>           
            </div>
            
        </div>
    </div>
  );
}

export default OnboardingPopup;
