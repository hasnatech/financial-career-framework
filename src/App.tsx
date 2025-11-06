import { LucideEllipsis, LucideSearch, MoveUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { CareerRoadmap } from "./component/CareerRoadmap";
import { HexaNode } from "./component/HexaNode";
import { Legend } from "./component/Legend";
import { NodeDetailPopup } from "./component/NodeDetailPopup";
import data from "./data.json";
import MainLayout from "./Layout/MainLayout";

const nodeTypes = {
  textUpdater: HexaNode,
};

export default function Option2() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [isTransposed, setIsTransposed] = useState(false);
  const [selectedNodeForPopup, setSelectedNodeForPopup] = useState<any | null>(
    null
  );
  const [selectedBands, setSelectedBands] = useState<string[]>([]);
  const [isLegendOpen, setIsLegendOpen] = useState(true);
  const [showPathway, setShowPathway] = useState(true);
  const [pathWay, setPathWay] = useState<any[]>([]);
  const [shouldOptionsOpen,setShouldOptionsOpen]=useState<string>("");
  const [searchValue,setSearchValue]=useState<string>("");
  const handleNodeClick = useCallback((nodeData: any) => {
    setPathWay((prev) => {
      const exists = prev.some((n) => n.id === nodeData.id);
      if (exists) return prev;
      return [...prev, { ...nodeData }];
    }); 
  }, []);

  const handleInfoClick = useCallback((nodeData: any) => {
    console.log(nodeData);
    setSelectedNodeForPopup(nodeData);
  }, []);

  const handleBandClick = (band: string) => {
    console.log(band);
    setSelectedBands((prev) =>
      prev.includes(band) ? prev.filter((b) => b !== band) : [...prev, band]
    );
  };

  const handleClearBands = () => {
    setSelectedBands([]);
  };
  const NODE_WIDTH = 110;
  const NODE_HEIGHT = 120;
  useEffect(() => {
    const initialNodes: any[] = [];
  
    const MAX_COL_LENGTH = Math.max(...data.map((d) => Number(d.col)));
    // console.log("MAX_COL_LENGTH", MAX_COL_LENGTH);
    for (let i = 0; i < data.length; i++) {
      let ypos =
        Number(data[i].row) * NODE_HEIGHT -
        (Number(data[i].row) > 1 ? 25 * (Number(data[i].row) - 1) : 0);
      const row_length = data.filter(
        (d) => Number(d.row) === Number(data[i].row)
      ).length;
      const totalRowWidth = row_length * NODE_WIDTH;
      const remainingSpace = MAX_COL_LENGTH * NODE_WIDTH - totalRowWidth;
      const offset = remainingSpace / 2; // shift to center

      const xpos =
        offset +
        Number(data[i].col) * NODE_WIDTH +
        ((Number(data[i].row) + row_length) % 2 === 1 ? 0 : NODE_WIDTH / 2);
      // const xpos = (Number(data[i].col) * NODE_WIDTH) + (Number(data[i].row) % 2 === 1 ? 0 : NODE_WIDTH / 2);
      // console.log("row_length", row_length);
     
      const node: any = {
        isSearchValueMatch: data[i].Title.toLowerCase().includes(searchValue.toLowerCase()),
        id: `${data[i].row},${data[i].col}`,
        type: "textUpdater",
        position: { x: xpos, y: ypos },
        data: {
          id: `${data[i].row},${data[i].col}`,
          // label: data[i].row + ", " + data[i].col + ", " + row_length + ", " + data[i].Title,
          label: data[i].Title,
          target: `${data[i].row},${data[i].col}`,
          group: data[i].Key,
          onClick: handleNodeClick,
          onInfoClick: handleInfoClick,
          "sub_family": data[i].contents?.sub_family || 'Empty',
          "band": data[i].contents?.band || 'Empty',
          "contributor_type": data[i].contents?.contributor_type || 'Empty',
          "purpose": data[i].contents?.purpose || 'Empty',
          "key_account": data[i].contents?.key_account || 'Empty',
          "finance_technical":data[i].contents?.finance_technical || 'Empty',
        },
        style: {
          opacity:
            selectedBands.length === 0 && searchValue.length===0 || selectedBands.includes(data[i].Key) || searchValue.length>0 && data[i].Title.toLowerCase().includes(searchValue.toLowerCase()) ? 1 : 0.3,
        },
        
      };    
     
      initialNodes.push(node);
    }
    console.log(selectedBands);    
    setNodes(initialNodes);

  }, [data, selectedBands, searchValue]);

  useEffect(()=>{
    console.log(nodes);
  })


  const shuffleHandler = useCallback(() => {
    setNodes((nodesSnapshot) => {
      const newNodes = nodesSnapshot.map((node) => ({ ...node }));

      newNodes.forEach((node) => {
        const [row, col] = node.data.target.split(",").map(Number);
        const x = isTransposed ? row * NODE_WIDTH : col * NODE_WIDTH;
        const y = isTransposed ? col * NODE_HEIGHT : row * NODE_HEIGHT;
        node.position = { x, y };
      });

      return newNodes;
    });

    setIsTransposed(!isTransposed);
  }, [isTransposed]);

console.log("Rendering, searchValue:", searchValue);

  const handlePathWayDelete=(requestedNode:any)=>{
    console.log('node to be deleted : ',requestedNode);
    console.log(pathWay);
    const newPathWay:any=pathWay.filter(node=>node.id!=requestedNode.id);
    setPathWay(newPathWay);
  }

  const handlePathWayMoveUp=(requestedNode:any,currentIndex:number)=>{
    console.log('node to be deleted : ',requestedNode);
    console.log(pathWay);
    const newPathWay:any=pathWay;
    newPathWay.splice(currentIndex,1);
    newPathWay.splice(currentIndex+1,0,requestedNode);
    setPathWay(newPathWay);
  }

  const handlePathWayMoveDown=(requestedNode:any,currentIndex:number)=>{
    console.log('node to be deleted : ',requestedNode);
    console.log(pathWay);
    const newPathWay:any=pathWay;
    newPathWay.splice(currentIndex,1);
    newPathWay.splice(currentIndex-1,0,requestedNode);
    setPathWay(newPathWay);
  }


  return (
    
    <MainLayout searchValue={searchValue} setSearchValue={setSearchValue}>
      
      <div className="flex gap-2 ">
        <div className="w-72 border rounded">
          <div className="bg-gray-900 text-white p-3 rounded-t flex justify-between items-center">
            <h2 className=  "text-xl font-bold">Legends</h2>
            {/* <Button variant="ghost" size="icon" onClick={() => setIsLegendOpen(!isLegendOpen)} className="text-white hover:bg-gray-700 hover:text-white">
              {isLegendOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </Button> */}
          </div>
          {isLegendOpen && (
            <div className="p-2 space-y-3">
              <Legend
                selectedBands={selectedBands}
                onBandClick={handleBandClick}
                onClear={handleClearBands}
              />
            </div>
          )}
        </div>

        <div
          className="bg-slate-50 rounded-lg flex-1"
          style={{ width: "100%", height: "90vh" }}
        >
          <CareerRoadmap nodes={nodes} nodeTypes={nodeTypes} fitView />
        </div>
        {pathWay.length > 0 && (
          <div className="w-80 border rounded space-y-3 overflow-y-auto h-[90vh] border-red-500">
            <div className="bg-gray-900 text-white p-3 rounded-t flex justify-between items-center">
            <h2 className="text-xl font-bold">My Pathway</h2>
            {/* <Button variant="ghost" size="icon" onClick={() => setIsLegendOpen(!isLegendOpen)} className="text-white hover:bg-gray-700 hover:text-white">
              {isLegendOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </Button> */} 
          </div>
            {pathWay.length > 0 && (
              <div className="flex flex-col-reverse items-center gap-3 p-3">
                {pathWay.map((node: any, index: number) => (
                  <div className="w-full" key={index}>
                    {index < pathWay.length - 1 && (
                      <div className="pb-2 flex justify-center items-center  w-full">
                        <MoveUp className="w-4 h-4 stroke-slate-400" />
                      </div>
                    )}
                    <div
                      className="transition-opacity flex items-start justify-center relative"
                      style={{ opacity: selectedBands.length === 0 || selectedBands.includes(node.band) ? 1 : 0.3 }}
                    >
                      <HexaNode data={node} />

                      <div className='flex flex-col absolute top-0 right-0  '>
                        <button onClick={()=>{
                        if(shouldOptionsOpen===node.label){
                          setShouldOptionsOpen('')
                        } 
                        else{ 
                          setShouldOptionsOpen(node.label);
                        }
                      }} className="flex items-center justify-center hover:opacity-0.3 duration-500">
                        <LucideEllipsis className="fill-gray-500 stroke-gray-[#334155] h-5"></LucideEllipsis>
                      </button>
                      {shouldOptionsOpen===node.label
                      &&
                      <div className="bg-white border-2 flex flex-col items-center h-20 w-full p-2">
                        <button onClick={()=>{
                          handlePathWayDelete(node);
                          setShouldOptionsOpen('');
                        }} className="text-xs font-medium">Delete</button>
                        {index!=pathWay.length-1 && <button onClick={()=>{
                          handlePathWayMoveUp(node,index);
                          setShouldOptionsOpen('');
                        }} className="text-xs font-medium">Move Up</button>}
                        {index!=0 && <button onClick={()=>{
                          handlePathWayMoveDown(node,index);
                          setShouldOptionsOpen('');
                        }}  className="text-xs font-medium">Move Down</button>}
                      </div>
                      }
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <NodeDetailPopup  
        nodeData={selectedNodeForPopup}
        onClose={() => setSelectedNodeForPopup(null)}
        nodes={nodes}
      />
      
      
    </MainLayout>
  );
}
