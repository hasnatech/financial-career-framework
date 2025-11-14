import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { getBandBackgroundColor } from './Constant';
import { LucideX } from 'lucide-react';

interface PromptDetails {
  band: string;
  contributor_type: string;
  finance_technical: string;
  group: string;
  id: number | null;
  key_account: string;
  label: string;
  purpose: string;
  sub_family: string;
  timeline: string;
}

interface Props {
  data: any;
  promptDetails?: PromptDetails;
  setShouldCopilotPopupOpen?: (open: boolean) => void;
  setSelectedNodeForCopilotPopup?: (value: any) => void;
  setCopilotPromptDetails: (value:PromptDetails | null) => void
  
}

const CopilotPopup: React.FC<Props> = ({
  data,
  promptDetails = {
    band: '',
    contributor_type: '',
    finance_technical: '',
    group: '',
    id: null,
    key_account: '',
    label: '',
    purpose: '',
    sub_family: '',
    timeline: '',
  },
  setCopilotPromptDetails,
  setShouldCopilotPopupOpen,
  setSelectedNodeForCopilotPopup,
}) => {
  const [currentPromptDetails, setCurrentPromptDetails] = useState<any>({
    band: promptDetails.band,
    contributor_type: promptDetails.contributor_type,
    finance_technical: promptDetails.finance_technical,
    group: promptDetails.group,
    id: promptDetails.id,
    key_account: promptDetails.key_account,
    label: promptDetails.label,
    purpose: promptDetails.purpose,
    sub_family: promptDetails.sub_family,
    timeline: promptDetails.timeline,
  });

  const [shouldOpenTimelinePrompt, setShouldOpenTimelinePrompt] =
    useState<boolean>(false);

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isPromptCopied, setIsPromptCopied] = useState(false);

  const bgColor = getBandBackgroundColor(currentPromptDetails.group);

  useEffect(() => {
    const isPromptDetailsEmpty = !Object.values(currentPromptDetails).some(v => v);
    if(currentPromptDetails.timeline && !isPromptDetailsEmpty){
      handleGeneratePrompt();
    }
    else{
      setGeneratedPrompt('');

    }
    console.log(currentPromptDetails);
    
    
  }, [currentPromptDetails]);

  const handleGeneratePrompt = () => {
    const promptHeader = `The Role I aspire to attaining in the next ${
      currentPromptDetails.timeline 
    } has the following job profile`;
    const purpose = currentPromptDetails.purpose || "[Specify Role]";
    const keyAccount = handlePlainTextRetrieval(
      currentPromptDetails.key_account
    ) || "[Specify Role]";
    const financeTechnical = handlePlainTextRetrieval(
      currentPromptDetails.finance_technical
    ) || "[Specify Role]";
    const promptInstruction="Develop a detailed development plan and career roadmap to help me get to this next level";

    const prompt = `${promptHeader}\n\nPurpose:\n${purpose}\n\nKey Accountabilities:\n${keyAccount}\n\nFinance Technical Competencies:\n${financeTechnical}\n\n${promptInstruction}`;

    setGeneratedPrompt(prompt);

    return (
      <div className='flex flex-col h-full gap-y-3 border shadow-sm p-3 pt-0 overflow-auto '>
        <p className='text-slate-400 self-star sticky top-0 left-5 bg-white py-3 border-b border-b-slate-100'>
          Generated Prompt
        </p>

        <h2>{promptHeader}</h2>
        <div className='flex-col gap-y-4'>
          <h3 className='font-bold'>Purpose :</h3>
          <p>{purpose}</p>
        </div>
        <div className='flex-col gap-y-4'>
          <h3 className='font-bold'>Key Accountabilites :</h3>
          <p>{handlePlainTextRetrieval(keyAccount)}</p>
        </div>
        <div className='flex-col gap-y-4'>
          <h3 className='font-bold'>Finance Technical Competencies :</h3>
          <p>{handlePlainTextRetrieval(financeTechnical)}</p>
        </div>
      </div>
    );
  };

  const handlePlainTextRetrieval = (htmlString: string) => {
    if(!htmlString){
      return;
    }
    const plainText = htmlString
      .replace(/<\/?ul>/g, '')
      .replace(/<\/li><li>/g, '\n')
      .replace(/<\/?li>/g, '')
      .trim();
    return plainText;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setIsPromptCopied(true);
      setTimeout(() => {
        setIsPromptCopied(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5'>
        <div className='relative bg-white h-full w-full flex flex-col items-start gap-y-3 rounded-lg overflow-clip  '>
          <div className='flex w-full border-2 items-center justify-between sticky top-0 pt-3 p-3 pl-4'>
            <h1 className='text-black font-bold text-xl'>Copilot Corner</h1>
            <button
              onClick={() => {
                setSelectedNodeForCopilotPopup(null);
                setShouldCopilotPopupOpen(false);
                setCopilotPromptDetails(null);
              }}
              className='p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-100  '
            >
              <LucideX className='w-6 h-6'></LucideX>
            </button>
          </div>

          <div className='grid grid-cols-2 w-full max-w-full h-full max-h-full gap-x-5 p-5 pt-0 pb-2'>
            <div className='flex flex-col items-start gap-y-4'>
              <h2 className='self-start text-lg font-bold'>
                Enter Details of the role{' '}
              </h2>
              <div className='grid grid-cols-2 gap-x-2 min-w-96 items-center text-sm  '>
                <div className='w-full flex flex-col items-start gap-y-2 '>
                  <label className='font-medium' htmlFor=''>Search for the Role</label>
                  <SearchBar
                    isCopilotPopupOpen={true}
                    data={data}
                    className={'w-full'}
                    currentPromptDetails={currentPromptDetails}
                    setCurrentPromptDetails={setCurrentPromptDetails}
                    onSearchChange={()=>{}}
                  ></SearchBar>
                </div>

                <div className='flex flex-col items-start gap-y-2 w-full'>
                  <label className='font-medium' htmlFor=''>
                    Timeline
                  </label>
                  <input
                    onChange={(event) => {
                      setCurrentPromptDetails({
                        ...currentPromptDetails,
                        timeline: event.target.value,
                      });
                    }}
                    value={currentPromptDetails.timeline ?? ''}
                    className='border w-full p-3 py-2 pl-3 rounded-md outline-none'
                    placeholder='12 Months'
                  />
                </div>
              </div>

              {generatedPrompt && (
                <div className='space-y-4 p-0 pb-0 h-full max-h-full '>
                  <div className='flex gap-4   '>
                    <div
                      className={`${bgColor} border rounded px-3 py-2 min-w-[180px]`}
                    >
                      <h3 className='font-bold text-lg mb-2 whitespace-nowrap'>
                        Sub Family
                      </h3>
                      <p className='text-sm text-black/90'>
                        {currentPromptDetails.sub_family || 'Not available'}
                      </p>
                    </div>

                    <div
                      className={`${bgColor} border rounded px-3 py-2 min-w-[180px] `}
                    >
                      <h3 className='font-bold text-lg mb-2 whitespace-nowrap'>
                        Band
                      </h3>
                      <p className='text-sm text-black/90'>
                        {currentPromptDetails.band || 'Not available'}
                      </p>
                    </div>

                    <div
                      className={`${bgColor} border rounded px-3 py-2 min-w-[180px]`}
                    >
                      <h3 className='font-bold text-lg mb-2 whitespace-nowrap'>
                        Contributor Type
                      </h3>
                      <p className='text-sm text-black/90'>
                        {currentPromptDetails.contributor_type ||
                          'Not available'}
                      </p>
                    </div>
                          
                    <div className={`${bgColor} border rounded px-3 py-2 `}>
                      <h3 className='font-bold text-lg mb-2 line-clamp-3'>Job Purpose</h3>
                      <p className='text-sm text-black/90 text-ellipsis line-clamp-3'>
                        {`${currentPromptDetails.purpose}` ||
                          'Not available'}
                      </p>
                    </div>
                  </div>

                  <div className='flex gap-4'>
                    <div className={`flex-1 ${bgColor} border rounded px-3 py-2`}>
                      <h3 className='font-bold text-lg mb-2'>
                        Key Accountabilities  
                      </h3>
                      <p
                        className='text-sm text-black/90 line-clamp-3'
                        dangerouslySetInnerHTML={
                          currentPromptDetails.key_account
                            ? {
                                __html:
                                  currentPromptDetails.key_account,
                              }
                            : { __html: 'Not available' }
                        }
                      ></p>
                    </div>
                    <div className={`flex-1 ${bgColor} border rounded px-3 py-2`}>
                      <h3 className='font-bold text-lg mb-2'>
                        Finance Technical Competencies
                      </h3>
                      <p
                        className='text-sm text-black/90 line-clamp-3'
                        dangerouslySetInnerHTML={
                          currentPromptDetails.finance_technical
                            ? {
                                __html:
                                  currentPromptDetails.finance_technical,
                              }
                            : { __html: 'Not available' }
                        }
                      ></p>
                    </div>
                  </div>
                </div>
              )}
            </div>

              {generatedPrompt ? (

                <div className='grid  grid-rows-[6%_84%_10%] items-start  h-full'>
                <h3 className='font-bold text-lg'>Copilot Prompt</h3>
                <div className=' p-[3px] rounded-3xl bg-gradient-to-r from-[#ffc9d4] to-[#beb8ff]'>

                  <div className='relative rounded-[1.313rem]  bg-white max-h-[70vh]  min-h-[70vh] overflow-auto flex    gap-y-2  w-full hide-scrollbar'>
                    
                    <div>
                      <pre className='whitespace-pre-wrap p-5 '>
                      {generatedPrompt}
                      </pre>
                    </div>

                    {isPromptCopied && (
                  <div className='absolute rounded-[1.313rem] top-0 bottom-0 left-0 right-0 fade-in z-20 inset-0 bg-black/80 flex items-center justify-center z-50 rounded-lg'>
                  <div className='flex rounded-lg border-primary h-full w-full items-center justify-center '>
                  <p className='font-bold  text-center text-white text-2xl  rounded-xl'>
                  Prompt Copied
                  </p>
                  </div>

                  </div>
                  )}
                  </div>
                </div>

                  <button
                    onClick={() => {
                      handleCopy();
                    }}
                    className='border-2 w-fit self-end justify-self-end px-8 py-2 rounded-full bg-secondary'
                  >
                    Copy
                  </button>
                  
                </div>

              ) : (
                <div className=' p-[3px] rounded-3xl bg-gradient-to-r from-[#ffc9d4] to-[#beb8ff]'>
                <div className='bg-white rounded-[1.313rem] h-full w-full flex flex-col  gap-y-3 items-center justify-center justify-items-center'>
                  <img src='./src/assets/icons/icons8-microsoft-copilot-50 (2).png'></img>
                  <p className='text-slate-400'>
                    Enter Details and Generate a Prompt
                  </p>  
                </div>
                </div>

              )}
            </div>
          
        </div>
      </div>
    </>
  );
};

export default CopilotPopup;
