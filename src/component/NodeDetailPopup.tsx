import { LucideArrowLeft, LucideArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getBandBackgroundColor } from "./Constant";
import SearchBar from "./SearchBar";
import { Button } from "../components/ui/button";

interface NodeData {
  label?: string;
  band?: string;
  sub_family?: string;
  contributor_type?: string;
  purpose?: string;
  key_account?: string;
  finance_technical?: string;
  group?: string;
}

interface NodeDetailPopupProps {
  nodeData: NodeData | null;
  nodes: any[];
  onSearchChange:(value:string)=>void;
  onClose: () => void;
  setSelectedNodeForPopup:(value:any)=>void;  
  setSelectedNodeForCopilotPopup:(value:any)=>void;
  setShouldCopilotPopupOpen:(value:any)=>void;
  setCopilotPromptDetails:(value:any)=>void;
}

export function NodeDetailPopup({
  nodeData,
  onSearchChange,
  onClose,
  nodes,
  setSelectedNodeForPopup,
  setSelectedNodeForCopilotPopup,
  setShouldCopilotPopupOpen,
  setCopilotPromptDetails
}: NodeDetailPopupProps) {
  if (!nodeData) return null;

  const [currentNodeData, setCurrentNodeData] = useState<NodeData>(nodeData);
  const [currentNodeIndex, setCurrentNodeIndex] = useState<number>(-1);
  const [shouldOpenTimelinePopup,setShouldOpenTimelinePopup]=useState<boolean>(false);
  const [timeline,setTimeline]=useState<string>('');
  const indexMap = new Map<number, NodeData>(
    nodes.map((node, index) => [index, node.data as NodeData])
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
  setCurrentNodeData(nodeData);
}, [nodeData]);




  useEffect(() => {
    const index = nodes.findIndex(
      (node) => node.data.label === currentNodeData.label
    );
    setCurrentNodeIndex(index);
  }, [nodes, currentNodeData]);

  const handleSlide = (prev: boolean, next: boolean) => {
    if (currentNodeIndex === -1) return;

    if (prev) {
      if (currentNodeIndex === 0) {
        return;
      }
      const newIndex = currentNodeIndex - 1;
      const newNode = indexMap.get(newIndex);
      if (newNode) {
        setCurrentNodeData(newNode);
        setCurrentNodeIndex(newIndex);
      }
    } else if (next) {
      if (currentNodeIndex === nodes.length - 1) {
        return;
      }
      const newIndex = currentNodeIndex + 1;
      const newNode = indexMap.get(newIndex);
      if (newNode) {
        setCurrentNodeData(newNode);
        setCurrentNodeIndex(newIndex);
      }
    }
  };

  const handleCopilotPopup=()=>{
    const copilotPromptDetails={...currentNodeData,timeline:timeline};
    setCopilotPromptDetails(copilotPromptDetails);
    console.log(copilotPromptDetails);
    setShouldOpenTimelinePopup(false);
    setShouldCopilotPopupOpen(true);
    setSelectedNodeForPopup(null);
    
    
  }

  if (currentNodeData && indexMap) {
    const bgColor = getBandBackgroundColor(currentNodeData.group);
    return (
      <div className="fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center z-50 p-5">
        <div
          className={`${bgColor} relative bg-white rounded-lg  border w-full m-6 max-h-full max-w-full h-full overflow-y-auto p-0 z-50`}
        >
          <div
            className={`${bgColor} sticky top-0 rounded-t-lg p-2 pl-5  flex justify-between items-center pb-3 mb-2`}
          >
            <h2 className="text-2xl font-bold">{currentNodeData.label}</h2>
            <div className="flex items-center gap-2 ">
              <SearchBar
                onSearchChange={onSearchChange}
                isNodeDetailPopupOpen={true}
                onClose={onClose}
                data={nodes}
                setSelectedNodeForPopup={setSelectedNodeForPopup}
              ></SearchBar>
              <button onClick={()=>{
                setShouldOpenTimelinePopup(true);
              
              }} className="group flex items-center justify-center gap-2 ">

         
              <div className="h-11 w-11 p-2 bg-white rounded-full flex items-center justify-center hover:opacity-80 duration-300 shadow-md">
              <img src="./src/assets/icons/icons8-microsoft-copilot-48.png"/>
              </div>
              </button>
              
              <button
                onClick={() => {
                  setCurrentNodeData({} as NodeData);
                  onClose();
                }}
                className="rounded-full hover:bg-red-500 p-1 hover:text-white transition-colors duration-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="space-y-2 p-0 pb-0 h-full   ">
            <div className="flex gap-2 px-2">
              <div
                className={`${bgColor} border rounded px-3 py-2 min-w-[180px]`}
              >
                <h3 className="font-bold text-lg mb-2 whitespace-nowrap">
                  Sub Family
                </h3>
                <p className="text-sm text-black/90">
                  {currentNodeData.sub_family || "Not available"}
                </p>
              </div>

              <div
                className={`${bgColor} border rounded px-3 py-2 min-w-[180px]`}
              >
                <h3 className="font-bold text-lg mb-2 whitespace-nowrap">
                  Band
                </h3>
                <p className="text-sm text-black/90">
                  {currentNodeData.band || "Not available"}
                </p>
              </div>

              <div
                className={`${bgColor} border rounded px-3 py-2 min-w-[180px]`}
              >
                <h3 className="font-bold text-lg mb-2 whitespace-nowrap">
                  Contributor Type
                </h3>
                <p className="text-sm text-black/90">
                  {currentNodeData.contributor_type || "Not available"}
                </p>
              </div>

              <div className={`${bgColor} border rounded px-3 py-2`}>
                <h3 className="font-bold text-lg mb-2">Job Purpose</h3>
                <p className="text-sm text-black/90">
                  {currentNodeData.purpose || "Not available"}
                </p>
              </div>
            </div>

            <div className="flex gap-2 px-2">
              <div className={`flex-1 ${bgColor} border rounded px-3 py-2`}>
                <h3 className="font-bold text-lg mb-2">Key Accountabilities</h3>
                <p
                  className="text-sm text-black/90"
                  dangerouslySetInnerHTML={
                    currentNodeData.key_account
                      ? { __html: currentNodeData.key_account }
                      : { __html: "Not available" }
                  }
                ></p>
              </div>
              <div className={`flex-1 ${bgColor} border rounded px-3 py-2`}>
                <h3 className="font-bold text-lg mb-2">
                  Finance Technical Competencies
                </h3>
                <p
                  className="text-sm text-black/90"
                  dangerouslySetInnerHTML={
                    currentNodeData.finance_technical
                      ? { __html: currentNodeData.finance_technical }
                      : { __html: "Not available" }
                  }
                ></p>
              </div>
            </div>
          </div>
          <div className=" flex justify-end gap-x-4 p-2 bg-white sticky bottom-0 right-0 bg-slate-200">
            <Button
              className=""
              disabled={currentNodeIndex === 0}
              onClick={() => {
                handleSlide(true, false);
              }}
            >
              <LucideArrowLeft className="h-4 stroke-white group-disabled:stroke-white/30"></LucideArrowLeft>{" "}
              Previous
            </Button>
            <Button
              className=""
              disabled={currentNodeIndex === nodes.length - 1}
              onClick={() => {
                handleSlide(false, true);
              }}
            >
              Next{" "}
              <LucideArrowRight className="h-4 stroke-white "></LucideArrowRight>
            </Button>
          </div>  
        </div>
        {shouldOpenTimelinePopup && 
        <div className="fixed z-50 flex items-center justify-center top-0 bottom-0 left-0 right-0 bg-black/50">
          <div className="relative flex flex-col items-start  rounded-sm bg-white pt-2   pr-1">
            <button
                onClick={() => {
                  setShouldOpenTimelinePopup(false);
                }}
                className="self-end absolute top-2 right-2 p-1 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-100"
              >
                <X className="w-4 h-4" />
              </button>
            <div className="flex flex-col gap-y-3 p-3 pb-5 pt-0">
            <label className="font-bold text-lg " htmlFor="">Enter Timeline</label>
            <input value={timeline} onChange={(event)=>{
              setTimeline(event.target.value)
            }} className="border w-full p-3 py-2 pl-3 rounded-md outline-none text-sm" type="text" placeholder="12 Months" />
            <button onClick={()=>{
              handleCopilotPopup();
            }} className="px-4 py-2 text-sm font-medium self-center rounded-full bg-primary text-primary-foreground mt-1 w-fit border-none outline-none hover:opacity-50 duration-500">Generate Prompt</button>
            </div>
            
          </div>
        </div>
        }
      </div>
    );
  }

  return null;
}
