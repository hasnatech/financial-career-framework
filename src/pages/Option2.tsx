import { MoveUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import data from "../data.json";
import { CareerRoadmap } from "../component/CareerRoadmap";
import { HexaNode } from "../component/HexaNode";
import { NodeDetailPopup } from "../component/NodeDetailPopup";
import MainLayout from "../Layout/MainLayout";
import { Legend } from "../component/Legend";

const nodeTypes = {
  textUpdater: HexaNode,
};

export default function Option2() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [isTransposed, setIsTransposed] = useState(false);
  const [selectedNodeForPopup, setSelectedNodeForPopup] = useState<any | null>(
    null
  );
  const [showPathway, setShowPathway] = useState(true);
  const [pathWay, setPathWay] = useState<any[]>([]);
  const handleNodeClick = useCallback((nodeData: any) => {
    
    setPathWay((prev) => {
      const exists = prev.some((n) => n.id === nodeData.id);
      if (exists) return prev;
      return [...prev, { ...nodeData }];
    });
  }, []);

  const handleInfoClick = useCallback((nodeData: any) => {
    setSelectedNodeForPopup(nodeData);
  }, []);
  const NODE_WIDTH = 110;
  const NODE_HEIGHT = 120;
  useEffect(() => {
    const initialNodes: any[] = [];

    // let ypos = 0;
    // for (let i = 0; i < data.length; i++) {
    //   ypos += NODE_HEIGHT - (i === 0 ? 0 : NODE_HEIGHT / 4);
    //   for (let j = 0; j < data[i].cells.length; j++) {
    //     let xpos = j * NODE_WIDTH + (i % 2 === 0 ? 0 : NODE_WIDTH / 2);
    //     const node: any = {
    //       id: `${i},${j}`,
    //       type: "textUpdater",
    //       position: { x: xpos, y: ypos },
    //       data: {
    //         id: `${i},${j}`,
    //         label: data[i].cells[j].Title,
    //         target: `${i},${j}`,
    //         group: data[i].cells[j].Band,
    //         band: data[i].cells[j].BandLevel,
    //         onClick: handleNodeClick,
    //       },
    //     };

    //     initialNodes.push(node);
    //   }
    // }
    const MAX_COL_LENGTH = Math.max(...data.map((d) => Number(d.col)));
    console.log("MAX_COL_LENGTH", MAX_COL_LENGTH);
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
      console.log("row_length", row_length);
      const node: any = {
        id: `${data[i].row},${data[i].col}`,
        type: "textUpdater",
        position: { x: xpos, y: ypos },
        data: {
          id: `${data[i].row},${data[i].col}`,
          // label: data[i].row + ", " + data[i].col + ", " + row_length + ", " + data[i].Title,
          label: data[i].Title,
          target: `${data[i].row},${data[i].col}`,
          group: data[i].Band,
          band: data[i].Band,
          onClick: handleNodeClick,
          onInfoClick: handleInfoClick,
          "Job purpose": data[i]["Job purpose"],
          "Key Accountabilities": data[i]["Key Accountabilities"],
          "Finance Technical Competencies":
            data[i]["Finance Technical Competencies"],
        },
      };
      initialNodes.push(node);
    }

    setNodes(initialNodes);
  }, [data]);

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



  return (
    <MainLayout>
      <div className="flex gap-3">
        {/* <div className="w-72 border rounded p-3 space-y-3">
          <div>
            <h2 className="text-xl font-bold mb-3">Filter</h2>
            <Button
              variant={"default"}
              className="bg-black text-gray-200"
              onClick={shuffleHandler}
            >
              Suffle
            </Button>
          </div>
          <div className="flex gap-2">
            <input
              checked={showPathway}
              type="checkbox"
              onChange={(e) => setShowPathway(e.target.checked)}
            />
            <label>Select My Pathway</label>
          </div>
        </div> */}

        <div
          className="bg-slate-50 rounded-lg flex-1"
          style={{ width: "100%", height: "84vh" }}
        >
          <CareerRoadmap nodes={nodes} nodeTypes={nodeTypes} fitView />
        </div>
        {pathWay.length > 0  && (
          <div className="w-80 border rounded p-3 space-y-3 overflow-y-auto h-[84vh]">
            {pathWay.length > 0 && (
              <div className="flex flex-col-reverse gap-3">
                {pathWay.map((node: any, index: number) => (
                  <div key={index}>
                    {index < pathWay.length - 1 && (
                      <div className="pb-2 flex justify-center items-center">
                        <MoveUp className="w-4 h-4 stroke-slate-400" />
                      </div>
                    )}
                    <HexaNode data={node} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
         <div className="p-2 bg-gray-900 text-white rounded-b">
              <Legend />
            </div>
      <NodeDetailPopup
        nodeData={selectedNodeForPopup}
        onClose={() => setSelectedNodeForPopup(null)}
      />
    </MainLayout>
  );
}
