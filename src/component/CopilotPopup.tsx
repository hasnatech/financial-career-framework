import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { getBandBackgroundColor } from "./Constant";
import { Check, Copy, LucideX } from "lucide-react";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
  setCopilotPromptDetails: (value: PromptDetails | null) => void;
}

const CopilotPopup: React.FC<Props> = ({
  data,
  promptDetails = {
    band: "",
    contributor_type: "",
    finance_technical: "",
    group: "",
    id: null,
    key_account: "",
    label: "",
    purpose: "",
    sub_family: "",
    timeline: "",
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
  const [visible, setVisible] = useState(true);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isPromptCopied, setIsPromptCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"employee" | "manager">(
    "employee"
  );
  const bgColor = getBandBackgroundColor(currentPromptDetails.group);

  useEffect(() => {
    const isPromptDetailsEmpty = !Object.values(currentPromptDetails).some(
      (v) => v
    );
    if (currentPromptDetails.timeline && !isPromptDetailsEmpty) {
      handleGeneratePrompt();
    } else {
      setGeneratedPrompt("");
    }
    // console.log(currentPromptDetails);
  }, [currentPromptDetails, activeTab]);

  const handleGeneratePrompt = () => {
    const promptHeader = `The Role I aspire to attaining in the next ${currentPromptDetails.timeline} months has the following job profile`;
    const purpose = currentPromptDetails.purpose || "[Specify Role]";
    const keyAccount =
      handlePlainTextRetrieval(currentPromptDetails.key_account) ||
      "[Specify Role]";
    const financeTechnical =
      handlePlainTextRetrieval(currentPromptDetails.finance_technical) ||
      "[Specify Role]";
    const promptInstruction =
      "Develop a detailed development plan and career roadmap to help me get to this next level";

    if (activeTab === "manager") {
      console.log("activeTab", currentPromptDetails);
      const managerPromptInstruction =
        `${currentPromptDetails.label} Conversation Guide for Finance Managers
🎯 Purpose
•	Encourage reflection and career ownership
•	Understand each team member’s aspirations
•	Identify development needs and support opportunities
•	Align goals with team and business priorities

💬 Discussion Questions
1. What are you most proud of accomplishing this year, and what energized you the most?
→ Reflect on strengths and motivation
2. Where do you see yourself growing in the next 12–18 months?
→ Explore aspirations and career direction
3. What skills or experiences do you need to develop to reach your next goal?
→ Identify development areas and learning needs
4. How can I or the team support you in your development journey?
→ Discuss coaching, mentorship, and stretch opportunities

🛠️ Copilot Prompts for Team Members
Encourage your team to use Copilot to prepare:
•	“Summarize what I accomplished this year and what I’m most proud of.”
•	“What are some career paths I can explore based on my current finance role?”
•	“Create a 70-20-10 development plan to help me grow toward a leadership role.”
•	“Suggest ways my manager can support my career development goals.”

📌 Follow-Up Actions
•	Document key takeaways and goals
•	Align development plans with team priorities
•	Schedule follow-up check-ins
•	Encourage use of https://cargillonline.sharepoint.com/sites/GlobalFinance/SitePages/Finance-Career-Framework.aspx
`;
      setGeneratedPrompt(`${managerPromptInstruction}`);
      return;
    } else {
      const prompt = `${promptHeader}\n\nPurpose:\n${purpose}\n\nKey Accountabilities:\n${keyAccount}\n\nFinance Technical Competencies:\n${financeTechnical}\n\n${promptInstruction}`;
      console.log("activeTab", activeTab);
      setGeneratedPrompt(prompt);
    }

    // setGeneratedPrompt(prompt);

    return (
      <div className="flex flex-col h-full gap-y-3 border shadow-sm p-3 pt-0 overflow-auto ">
        <p className="text-slate-400 self-star sticky top-0 left-5 bg-white py-3 border-b border-b-slate-100">
          Generated Prompt
        </p>

        <h2>{promptHeader}</h2>
        <div className="flex-col gap-y-4">
          <h3 className="font-bold">Purpose :</h3>
          <p>{purpose}</p>
        </div>
        <div className="flex-col gap-y-4">
          <h3 className="font-bold">Key Accountabilites :</h3>
          <p>{handlePlainTextRetrieval(keyAccount)}</p>
        </div>
        <div className="flex-col gap-y-4">
          <h3 className="font-bold">Finance Technical Competencies :</h3>
          <p>{handlePlainTextRetrieval(financeTechnical)}</p>
        </div>
      </div>
    );
  };

  const handlePlainTextRetrieval = (htmlString: string) => {
    if (!htmlString) {
      return;
    }
    const plainText = htmlString
      .replace(/<\/?ul>/g, "")
      .replace(/<\/li><li>/g, "\n")
      .replace(/<\/?li>/g, "")
      .trim();
    return plainText;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setIsPromptCopied(true);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 3000);

      setTimeout(() => {
        setIsPromptCopied(false);
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5">
        <div className="relative bg-slate-50 h-full w-full flex flex-col items-start gap-y-3 rounded-lg overflow-clip  ">
          <div className="flex w-full border-2 bg-white  items-center justify-between sticky top-0 pt-3 p-3 pl-4">
            <div className="flex gap-3 items-center">
              <img src="images/icons/icons8-microsoft-copilot-48.png" />
              <h1 className="text-black font-bold text-xl">Copilot Corner</h1>
            </div>
            <button
              onClick={() => {
                setSelectedNodeForCopilotPopup(null);
                setShouldCopilotPopupOpen(false);
                setCopilotPromptDetails(null);
              }}
              className="p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-100  "
            >
              <LucideX className="w-6 h-6"></LucideX>
            </button>
          </div>
          <div className="px-5">
            To go deeper with the Finance Career Framework and build a more
            individualized development plan, consider using Copilot. Here's a
            prompt you can copy and paste to start this journey:
          </div>
          <div className="grid grid-cols-2 max-xl:flex w-full max-w-full h-full max-h-full gap-x-5 p-5 pt-0 pb-2">
            <div className="max-xl:flex-1 flex flex-col items-start gap-y-4">
              <h2 className="self-start text-lg font-bold">
                Enter Details of the role{" "}
              </h2>
              <div className="flex gap-3 items-center text-sm w-full ">
                <div className="w-full flex-1 flex flex-col items-start gap-y-2 ">
                  <label className="font-medium" htmlFor="">
                    Search for the Role
                  </label>
                  <SearchBar
                    isCopilotPopupOpen={true}
                    data={data}
                    className={"w-full"}
                    currentPromptDetails={currentPromptDetails}
                    setCurrentPromptDetails={setCurrentPromptDetails}
                    onSearchChange={() => {}}
                  ></SearchBar>
                </div>

                <div className="flex flex-col items-start gap-y-2">
                  <label className="font-medium" htmlFor="">
                    Timeline (in months)
                  </label>
                  <input
                    onChange={(event) => {
                      setCurrentPromptDetails({
                        ...currentPromptDetails,
                        timeline: event.target.value,
                      });
                    }}
                    value={currentPromptDetails.timeline ?? ""}
                    type="number"
                    className="border w-full p-3 py-2 pl-3 rounded-md outline-none"
                    placeholder="number of months"
                  />
                </div>
              </div>

              {generatedPrompt && (
                <div className="space-y-4 p-0 pb-0 h-full max-h-full flex flex-col mb-16">
                  <div className="flex gap-4   ">
                    <div
                      className={`${bgColor} border rounded px-3 py-2 min-w-[120px]`}
                    >
                      <h3 className="font-bold text-lg mb-2 whitespace-nowrap">
                        Sub Family
                      </h3>
                      <p className=" text-black/90">
                        {currentPromptDetails.sub_family || "Not available"}
                      </p>
                    </div>

                    <div
                      className={`${bgColor} border rounded px-3 py-2 min-w-[120px] `}
                    >
                      <h3 className="font-bold text-lg mb-2 whitespace-nowrap">
                        Band
                      </h3>
                      <p className=" text-black/90">
                        {currentPromptDetails.band || "Not available"}
                      </p>
                    </div>

                    <div
                      className={`${bgColor} border rounded px-3 py-2 min-w-[120px]`}
                    >
                      <h3 className="font-bold text-lg mb-2 ">
                        Contributor Type
                      </h3>
                      <p className=" text-black/90">
                        {currentPromptDetails.contributor_type ||
                          "Not available"}
                      </p>
                    </div>

                    <div
                      className={`${bgColor} border rounded px-3 py-2 max-h-[150px] overflow-hidden  hover:overflow-auto  `}
                    >
                      <h3 className="font-bold text-lg mb-2">Job Purpose</h3>
                      <p className=" text-black/90 ">
                        {`${currentPromptDetails.purpose}` || "Not available"}
                      </p>
                    </div>
                  </div>

                  <div className="container-1 flex gap-4 xl:max-h-[21.8rem] lg:max-h-[16.6rem]">
                    <div
                      className={`flex-1 ${bgColor} border rounded px-3 py-2 max-h-96 overflow-hidden  hover:overflow-auto `}
                    >
                      <h3 className="font-bold text-lg mb-2">
                        Key Accountabilities
                      </h3>
                      <p
                        className=" text-black/90 text-ellipsis h-full"
                        dangerouslySetInnerHTML={
                          currentPromptDetails.key_account
                            ? {
                                __html: currentPromptDetails.key_account,
                              }
                            : { __html: "Not available" }
                        }
                      ></p>
                    </div>
                    <div
                      className={`flex-1 ${bgColor} border rounded px-3 py-2 max-h-96 overflow-hidden  hover:overflow-auto `}
                    >
                      <h3 className="font-bold text-lg mb-2">
                        Finance Technical Competencies
                      </h3>
                      <p
                        className=" text-black/90"
                        dangerouslySetInnerHTML={
                          currentPromptDetails.finance_technical
                            ? {
                                __html: currentPromptDetails.finance_technical,
                              }
                            : { __html: "Not available" }
                        }
                      ></p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {generatedPrompt ? (
              <div className="max-xl:flex-1 space-y-5">
                <h3 className="font-bold text-lg">Copilot Prompt</h3>
                <div>
                  <div className="flex gap-3">
                    <button
                      className={`px-4 py-2 rounded-t-md  ${
                        activeTab === "employee"
                          ? "bg-gradient-to-t from-[#03441f] to-[#00843D] text-white"
                          : "bg-slate-200"
                      }`}
                      onClick={() => setActiveTab("employee")}
                    >
                      Employee
                    </button>

                    <button
                      className={`px-4 py-2 rounded-t-md ${
                        activeTab === "manager"
                          ? "bg-gradient-to-r from-[#03441f] to-[#00843D] text-white"
                          : "bg-slate-200"
                      }`}
                      onClick={() => setActiveTab("manager")}
                    >
                      Manager
                    </button>
                  </div>
                  <div className="  p-[3px] rounded-b-3xl bg-gradient-to-r from-[#03441f] to-[#BDE588]">
                    {/* --- NEW TABS ---- */}

                    <div
                      className="relative rounded-b-[1.313rem] lg:max-h-[50vh] xl:max-h-[58vh] overflow-hidden hover:overflow-auto 
                   bg-white h-full mb-5  overflow-auto flex    gap-y-2  w-full hide-scrollbar"
                    >
                      <div>
                        <pre className="whitespace-pre-wrap p-5 ">
                          {generatedPrompt}
                        </pre>
                      </div>

                      {isPromptCopied && (
                        <div
                          className={`absolute inset-0 bg-green-700/40 backdrop-blur-sm z-50 flex items-center justify-center
        rounded-b-[1.313rem]
        transition-opacity duration-700
        ${visible ? "opacity-100" : "opacity-0"}`}
                        >
                          <div className="flex flex-col rounded-lg border-primary h-full w-full items-center justify-center ">
                            <p className="font-bold text-center  text-3xl rounded-xl">
                              Prompt Copied...
                            </p>
                            <p className="opacity-90 mt-2">
                              Your prompt copied to clipboard...
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 justify-between items-center">
                  <p>
                    Click on the{" "}
                    <a
                      className="underline text-blue-800"
                      href="https://m365.cloud.microsoft/chat/?titleId=T_24e7e2dc-dc16-b3b7-de2a-51b9d3b65192&source=embedded-builder"
                      target="_blank"
                    >
                      Finance Career Coach Agent{" "}
                    </a>{" "}
                    and paste the prompt.
                  </p>

                  <Button
                    onClick={() => {
                      handleCopy();
                    }}
                    className=""
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isPromptCopied ? (
                        <motion.div
                          key="check"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-4 h-4 stroke-green-500" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Copy className="w-4 h-4 stroke-slate-200" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {isPromptCopied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="max-xl:flex-1 p-[3px] rounded-3xl bg-gradient-to-r from-[#03441f] to-[#BDE588]">
                <div className="bg-white rounded-[1.313rem] h-full w-full flex flex-col  gap-y-3 items-center justify-center justify-items-center">
                  <img src="images/icons/icons8-microsoft-copilot-50 (2).png"></img>
                  <p className="text-slate-400">
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

