import { Info, LucideArrowDown, LucideArrowUp, LucideEllipsis, LucideTrash } from "lucide-react";
import { bandClass } from "./Constant";
import { useEffect, useState } from "react";

export function HexaNode(props: any) {
  const zoom = props.zoom || 1;
  const [zoomLevel, setZoomLevel] = useState("small");
  const [shouldOptionsOpen,setShouldOptionsOpen]=useState<string>("");


  useEffect(() => {
    // console.log(zoom);
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
    return `${import.meta.env.BASE_URL}images/${fileName}`;
  };

 

  
  return (


    <div 
      title={props.data.label}
      className={`group relative w-full flex gap-x-4 items-center justify-center transition-opacity
         ${props.pathWay ? '' :  'hover:scale-[200%]'} hover:z-40 transition-transform duration-300
        ${bandClass(props)} `}
    >

    {props.pathWay && 
    <div className="opacity-0 group-hover:opacity-100 flex absolute top-0 right-0 justify-around w-fit gap-x-1 items-center p-2 border border-slate-400 rounded-sm">
      
      {props.index!=props.pathWay.length-1 && <button onClick={()=>{
        props.handlePathWayMoveUp(props.data,props.index);
      }} className="flex items-center justify-center hover:opacity-30 duration-500">
        <LucideArrowUp className="stroke-slate-400 h-4 w-4" />
      </button>
        }

      {props.index!=0 && <button onClick={()=>{
        props.handlePathWayMoveDown(props.data,props.index);
      }}  className="flex items-center justify-center hover:opacity-30 duration-500">
        <LucideArrowDown className="stroke-slate-400 h-4 w-4" />
      </button>
      }

      <button onClick={()=>{  
        props.handlePathWayDelete(props.data);
      }} className="flex items-center justify-center hover:opacity-30 duration-500">
        <LucideTrash className="stroke-slate-400 h-4 w-4" />
      </button>
    </div>
    }

      

     
      
      <div
        className={`relative text-center text-sm h-24 w-28 
  flex items-center justify-center z
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
            src={getImage(props.data.group)}
            alt="hexagon"
            className="absolute top-0 left-0 h-28 w-32"
          />
          <span
            className={`z-10 px-2 text-black text-center sm:text-sm font-medium
            overflow-hidden leading-[1.2] w-[85%] line-clamp-3
            transition-all duration-200 cursor-pointer
            ${props.pathWay ? '' : 'group-hover:line-clamp-none group-hover:text-[0.7rem] group-hover:leading-[1.1]  '}
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
          <div
        className='z-15 absolute right-2 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer bg-white rounded-full bg-white'
        onClick={(e) => {
          e.stopPropagation(); // prevent ReactFlow canvas from handling the click
          props.data.onInfoClick?.(props.data);
        }}
      >
        <Info className="w-4 h-4 stroke-slate-600" />
      </div>
        </div>
      </div>

      {/* Info icon */}
      
    </div>
  );  
}

/*{props.pathWay && <div className='grid grid-rows-[1.5rem_2rem] gap-y-2 h-10 border-4 w-14  max-w-full  z-20 justify-end absolute top-1 right-2   opacity-0 group-hover:opacity-100  '>
      <button onClick={()=>{
                        if(shouldOptionsOpen===props.data.label){
                          setShouldOptionsOpen('')
                        } 
                        else{ 
                          setShouldOptionsOpen(props.data.label);
                        }
                      }} className=" bg-white rounded-full flex items-center h-[19px] w-[19px]  justify-center hover:opacity-0.3 duration-500">
      <LucideEllipsis className="fill-gray-500 stroke-slate-600 border-2 border-slate-600  h-[16px] w-[16px] rounded-full"></LucideEllipsis>
      </button>
       {shouldOptionsOpen===props.data.label
      &&
      <div className="bg-white rounded-md  border-2 flex flex-col h-10   items-center w-8  p-2 z-[15]">
        <button onClick={()=>{
          props.handlePathWayDelete(props.data);
          setShouldOptionsOpen('');
        }} className="text-[0.5rem] font-medium hover:opacity-50 duration-500">Delete</button>
        {props.index!=props.pathWay.length-1 && <button onClick={()=>{
          props.handlePathWayMoveUp(props.data,props.index);
          setShouldOptionsOpen('');
        }} className="text-[0.5rem] font-medium hover:opacity-50 duration-500">Move Up</button>}
        {props.index!=0 && <button onClick={()=>{
          props.handlePathWayMoveDown(props.data,props.index);
          setShouldOptionsOpen('');
        }}  className="text-[80.5rem] font-medium hover:opacity-50 duration-500">Move Down</button>}
      </div>
      }
      </div>
      }
      */
