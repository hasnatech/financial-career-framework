import { Info } from "lucide-react";
import { bandClass } from "./Constant";

export function TextUpdaterNode(props: any) {
  return (
    <div
      className={`group relative bg-white shadow rounded-lg w-[200px] h-[100px] transition-opacity
        flex items-center justify-center border-t-4 ${bandClass(
        props
      )}`}
    >
      <div
        className="text-center text-sm h-full w-full flex items-center justify-center cursor-pointer p-3"
        onClick={(e) => {
          e.stopPropagation(); // prevent ReactFlow canvas from handling the click
          props.data.onClick?.(props.data);
        }}
      >
        {/* {props.data.target}:  */}
        {props.data.label}
      </div>

      {/* Info icon */}
      <div
        className="z-1 absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation(); // prevent ReactFlow canvas from handling the click
          props.data.onInfoClick?.(props.data);
        }}
      >
        <Info className="w-4 h-4 stroke-slate-400" />
      </div>
    </div>
  );
}
