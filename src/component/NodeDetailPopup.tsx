import { LucideArrowLeft, LucideArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getBandBackgroundColor} from "./Constant";
import SearchBar from "./SearchBar";

interface NodeData {
  label?: string;
  band?: string;
  sub_family?: string;
  contributor_type?: string;
  purpose?: string;
  key_account?: string;
  finance_technical?: string;
  group?:string;
}

interface NodeDetailPopupProps {
  nodeData: NodeData | null;
  nodes: any[];
  searchValue:any;
  setSearchValue:any;
  onClose: () => void;
}



export function NodeDetailPopup({ nodeData, searchValue, setSearchValue, onClose, nodes }: NodeDetailPopupProps) {
  if (!nodeData) return null;

  const [currentNodeData, setCurrentNodeData] = useState<NodeData>(nodeData);
  const [currentNodeIndex, setCurrentNodeIndex] = useState<number>(-1);
  const indexMap = new Map<number, NodeData>(nodes.map((node, index) => [index, node.data as NodeData]));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(()=>{
  console.log(nodeData);
  console.log(nodes);
  console.log(currentNodeData);
})

  useEffect(() => {
    const index = nodes.findIndex((node) => node.data.label === currentNodeData.label);
    setCurrentNodeIndex(index);
  }, [nodes, currentNodeData]);

  const handleSlide = (prev: boolean, next: boolean) => {
    if (currentNodeIndex === -1) return;

    if (prev) {
      if(currentNodeIndex===0){
        return;
      }
      const newIndex = currentNodeIndex-1;
      const newNode = indexMap.get(newIndex);
      if (newNode) {
        setCurrentNodeData(newNode);
        setCurrentNodeIndex(newIndex);
      }
    } else if (next) {
      if(currentNodeIndex===nodes.length-1){
        return;
      }
      const newIndex = currentNodeIndex+1;
      const newNode = indexMap.get(newIndex);
      if (newNode) {
        setCurrentNodeData(newNode);
        setCurrentNodeIndex(newIndex);
      }
    }
  };

  if (currentNodeData && indexMap) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5">
        <div className="bg-white rounded-lg   w-full m-6 max-h-full max-w-full overflow-y-auto p-0 z-50">
          <div className={`${getBandBackgroundColor(currentNodeData.group) as keyof typeof getBandBackgroundColor} sticky top-0 rounded-lg p-2 pl-5  flex justify-between items-center border-b pb-3 mb-4 border-2`}>
            <h2 className="text-2xl font-bold">{currentNodeData.label}</h2>
            <div className="flex gap-x-2" >
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} isNodeDetailPopupOpen={true} onClose={onClose}   ></SearchBar>
            <button
              onClick={() => {
                setCurrentNodeData({} as NodeData);
                onClose();
              }}
              className="p-2 rounded-full hover:bg-slate-100"
            >
              <X className="w-6 h-6" />
            </button>
            </div>
            
          </div>
          <div className="space-y-3 p-5">
            <div className="flex gap-3">
              <div className="bg-slate-200 rounded px-3 py-2 min-w-[180px]">
                <h3 className="font-bold text-lg mb-2 whitespace-nowrap">Sub Family</h3>
                <p className="text-sm text-slate-700">{currentNodeData.sub_family || "Not available"}</p>
              </div>

              <div className="bg-slate-200 rounded px-3 py-2 min-w-[180px]">
                <h3 className="font-bold text-lg mb-2 whitespace-nowrap">Band</h3>
                <p className="text-sm text-slate-700">{currentNodeData.band || "Not available"}</p>
              </div>

              <div className="bg-slate-200 rounded px-3 py-2 min-w-[180px]">
                <h3 className="font-bold text-lg mb-2 whitespace-nowrap">Contributor Type</h3>
                <p className="text-sm text-slate-700">{currentNodeData.contributor_type || "Not available"}</p>
              </div>

              <div className="bg-slate-200 rounded px-3 py-2">
                <h3 className="font-bold text-lg mb-2">Job Purpose</h3>
                <p className="text-sm text-slate-700">{currentNodeData.purpose || "Not available"}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-slate-200 rounded px-3 py-2">
                <h3 className="font-bold text-lg mb-2">Key Accountabilities</h3>
                <p
                  className="text-sm text-slate-700"
                  dangerouslySetInnerHTML={
                    currentNodeData.key_account
                      ? { __html: currentNodeData.key_account }
                      : { __html: "Not available" }
                  }
                ></p>
              </div>
              <div className="flex-1 bg-slate-200 rounded px-3 py-2">
                <h3 className="font-bold text-lg mb-2">Finance Technical Competencies</h3>
                <p
                  className="text-sm text-slate-700"
                  dangerouslySetInnerHTML={
                    currentNodeData.finance_technical
                      ? { __html: currentNodeData.finance_technical }
                      : { __html: "Not available" }
                  }
                ></p>
              </div>
            </div>
          </div>
          <div className="w-full justify-center flex items-center gap-x-4 p-5 bg-white sticky bottom-0">
            <button className="flex items-center justify-center disabled:text-gray-500 hover:bg-gray-50 duration-500 cursor-pointer h-6 w-6 rounded-full " disabled={currentNodeIndex===0}
              onClick={() => {
                handleSlide(true, false);
              }}
            >
             <LucideArrowLeft className="h-4 stroke-slate-600 "></LucideArrowLeft>
            </button>
            <button className="disabled:text-gray-500 flex items-center justify-center hover:bg-gray-50 duration-500 cursor-pointer h-6 w-6 rounded-full " disabled={currentNodeIndex===nodes.length-1}
              onClick={() => {
                handleSlide(false, true);
              }}
            >
              <LucideArrowRight className="h-4 stroke-slate-600 "></LucideArrowRight>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
