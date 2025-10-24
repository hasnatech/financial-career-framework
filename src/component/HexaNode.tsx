import { Info } from "lucide-react";
import { bandClass } from "./Constant";
import { useEffect, useState } from "react";

export function HexaNode(props: any) {
  const zoom = props.zoom || 1;
  const [zoomLevel, setZoomLevel] = useState("small");

  useEffect(() => {
    console.log(zoom);
    if (zoom < 1.5) {
      setZoomLevel("small");
    } else {
      setZoomLevel("large");
    }
  }, [zoom]);

  const getImage = (band: string) => {
    const fileName = `${band
      .replace(/\//g, "_")
      .replace(/\s+/g, "_")
      .toLowerCase()}.svg`;

    return `/${fileName}`;
  };

  return (
    <div
      title={props.data.label}
      className={`group relative flex items-center justify-center 
        hover:scale-[200%] hover:z-[100] transition-transform duration-300
        ${bandClass(props)}`}
    >
      <div
        className={`relative text-center text-sm h-24 w-28 
  flex items-center justify-center 
          `}
        
      >
        <div
          className="relative text-center text-sm h-28 w-32 flex items-center 
          justify-center"
          onClick={(e) => {
            e.stopPropagation();
            props.data.onClick?.(props.data);
          }}
        >
          <img
            src={getImage(props.data.band)}
            alt="hexagon"
            className="absolute top-0 left-0 h-28 w-32"
          />
          <span
            className={`z-10 px-2 text-black text-center sm:text-sm font-medium
            overflow-hidden leading-[1.2] w-[85%] line-clamp-3
            transition-all duration-200 group-hover:leading-[1.1] 
            group-hover:line-clamp-none
            group-hover:text-[0.7rem] cursor-pointer
             `}
            // ${
            //   zoomLevel === "small"
            //     ? "w-[85%] text-sm text-ellipsis line-clamp-3"
            //     : ""
            // }`}
            // style={{
            //   fontSize:
            //     zoomLevel === "small"
            //       ? ""
            //       : `${Math.max(10, 14 / (props.zoom || 1))}px`, // auto-scale with zoom
            // }}
            title={props.data.label} // tooltip shows full text on hover
          >
            {props.data.label}
          </span>
        </div>
      </div>

      {/* Info icon */}
      <div
        className="z-15 absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 
        transition-opacity duration-200 cursor-pointer bg-white rounded-full bg-white
         "
        onClick={(e) => {
          e.stopPropagation(); // prevent ReactFlow canvas from handling the click
          props.data.onInfoClick?.(props.data);
        }}
      >
        <Info className="w-4 h-4 stroke-slate-600" />
      </div>
    </div>
  );
}
