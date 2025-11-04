import { X } from "lucide-react";

interface NodeData {
  label?: string;
  band?: string;
  sub_family?: string;
  contributor_type?: string;
  job_purpose?: string;
  key_account?: string;
 finance_technical?: string;
  // Add other properties from your data as needed
}

interface NodeDetailPopupProps {
  nodeData: NodeData | null;
  onClose: () => void;
}

export function NodeDetailPopup({ nodeData, onClose }: NodeDetailPopupProps) {
  if (!nodeData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl">
        
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold">{nodeData.label}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Sub Family</h3>
            <p className="text-sm text-slate-700">{nodeData["sub_family"] || "Not available"}</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Band</h3>
            <p className="text-sm text-slate-700">{nodeData["band"] || "Not available"}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Contributor Type</h3>
            <p className="text-sm text-slate-700">{nodeData["contributor_type"] || "Not available"}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Job Purpose</h3>
            <p className="text-sm text-slate-700">{nodeData["job_purpose"] || "Not available"}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Key Accountabilities</h3>
            <p className="text-sm text-slate-700"
            dangerouslySetInnerHTML={nodeData["key_account"] ? { __html: nodeData["key_account"] } : { __html: "Not available" }}
            ></p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Finance Technical Competencies</h3>
            <p className="text-sm text-slate-700"
            dangerouslySetInnerHTML={nodeData["finance_technical"] ? { __html: nodeData["finance_technical"] } : { __html: "Not available" }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
}