import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface NodeData {
  label?: string;
  band?: string;
  sub_family?: string;
  contributor_type?: string;
  purpose?: string;
  key_account?: string;
  finance_technical?: string;
}

interface NodeDetailPopupProps {
  nodeData: NodeData | null;
  nodes: any[];
  onClose: () => void;
}

export function NodeDetailPopup({ nodeData, onClose, nodes }: NodeDetailPopupProps) {
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-10">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full m-6 max-h-full max-w-full overflow-y-auto pb-0">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-2xl font-bold">{currentNodeData.label}</h2>
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
          <div className="space-y-3">
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
            <button className="disabled:text-gray-500" disabled={currentNodeIndex===0}
              onClick={() => {
                handleSlide(true, false);
              }}
            >
              Previous
            </button>
            <button className="disabled:text-gray-500" disabled={currentNodeIndex===nodes.length-1}
              onClick={() => {
                handleSlide(false, true);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
