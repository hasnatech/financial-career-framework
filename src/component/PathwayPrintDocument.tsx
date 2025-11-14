import React from 'react';
import { getBandBackgroundColor } from './Constant';
import { MoveUp } from 'lucide-react';
import { HexaNode } from './HexaNode';

interface PathwayNode {
  label: string;
  sub_family?: string;
  band?: string;
  contributor_type?: string;
  purpose?: string;
  key_account?: string;
  finance_technical?: string;
}

interface PathwayPrintDocumentProps {
  pathWay: PathwayNode[];
}

const PathwayPrintDocument = React.forwardRef<HTMLDivElement, PathwayPrintDocumentProps>(({pathWay}, ref) => {
  return (
    <div ref={ref} className='print-root flex flex-col'>
    

    {pathWay.map((node,index)=>{
            const bgColor=getBandBackgroundColor(node.label);
            return (
           <div className="print-page page relative">
            
  <div className="node-details space-y-2 p-0 pb-0 h-full max-h-full">
      
    <div className="flex flex-col items-start w-full gap-2">
      {index===0 && 
      <div className="page-header flex w-full absolute top-0 left-0 right-0 justify-center    ">
      <h1 className="print-title">Pathway</h1>
      </div>
      }
      <div className={`${bgColor} rounded px-3 py-2 min-w-[180px]`}>
        <h3 className="font-bold text-lg mb-2 whitespace-nowrap">Sub Family</h3>
        <p className="text-sm text-black/90">{node.sub_family || "Not available"}</p>
      </div>  

      <div className={`band ${bgColor} rounded px-3 py-2 min-w-[180px]`}>
        <h3 className="font-bold text-lg mb-2 whitespace-nowrap">Band</h3>
        <p className="text-sm text-black/90">{node.band || "Not available"}</p>
      </div>

      <div className={`contributor-type ${bgColor} rounded px-3 py-2 min-w-[180px]`}>
        <h3 className="font-bold text-lg mb-2 whitespace-nowrap">Contributor Type</h3>
        <p className="text-sm text-black/90">{node.contributor_type || "Not available"}</p>
      </div>

      <div className={`purpose ${bgColor} rounded px-3 py-2`}>
        <h3 className="font-bold text-lg mb-2">Job Purpose</h3>
        <p className="text-sm text-black/90">{node.purpose || "Not available"}</p>
      </div>
    </div>

    <div className="flex flex-col items-start w-full gap-2">
      <div className={`flex-1 ${bgColor} rounded py-2`}>
        <h3 className="font-bold text-lg mb-2">Key Accountabilities</h3>
        <p
          className="text-sm text-black/90 flex flex-col gap-y-4"
          dangerouslySetInnerHTML={
            node.key_account
              ? { __html: node.key_account }
              : { __html: "Not available" }
          }
        ></p>
      </div>

      <div className={`finance-technical flex-1 ${bgColor} rounded py-2`}>
        <h3 className="font-bold text-lg mb-2">Finance Technical Competencies</h3>
        <p
          className="text-sm text-black/90"
          dangerouslySetInnerHTML={
            node.finance_technical
              ? { __html: node.finance_technical }
              : { __html: "Not available" }
          }
        ></p>
      </div>
    </div>
  </div>

  <div className="pathway-column flex flex-col-reverse justify-center items-center gap-3 p-3 h-full">
    {pathWay.map((pathWayNode, index) => (
      <div className="w-full" key={index}>
        {index < pathWay.length - 1 && (
          <div className="pb-2 flex justify-center items-center w-full">
            <MoveUp className="w-4 h-4 stroke-slate-400" />
          </div>
        )}
        <div
          className="transition-opacity flex gap-x-3 justify-center relative"
          style={{ opacity: pathWayNode.label === node.label ? 1 : 0.3 }}
        >
          <HexaNode data={pathWayNode} index={index} pathWay={pathWay} />
        </div>
      </div>
    ))}
  </div>
</div>

            
        )
    })}
    </div>
  );
})

export default PathwayPrintDocument;
