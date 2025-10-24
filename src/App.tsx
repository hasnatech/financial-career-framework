import { MoveUp } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CareerRoadmap } from "./component/CareerRoadmap";
import { TextUpdaterNode } from "./component/TextUpdaterNode";
import { NodeDetailPopup } from "./component/NodeDetailPopup";
import { Button } from "./components/ui/button";
import MainLayout from "./Layout/MainLayout";
import data from "./data.json";

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

export default function App() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [isTransposed, setIsTransposed] = useState(false);
  const [selectedNodeForPopup, setSelectedNodeForPopup] = useState<any | null>(null);

  const handleNodeClick = useCallback((nodeData: any) => {
    console.log(nodeData);
    setPathWay((prev) => {
      const exists = prev.some((n) => n.id === nodeData.id);
      if (exists) return prev;
      return [...prev, { ...nodeData }];
    });
  }, []);

  const handleInfoClick = useCallback((nodeData: any) => {
    setSelectedNodeForPopup(nodeData);
  }, []);

  useEffect(() => {
    const initialNodes: any[] = [];
    const nodeWidth = 220;
    const nodeHeight = 120;

    // for (let i = 0; i < data.length; i++) {
    //   let ypos = i * nodeHeight;
    //   for (let j = 0; j < data[i].cells.length; j++) {
    //     let xpos = j * nodeWidth;

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

    for (let i = 0; i < data.length; i++) {
      let ypos =  Number(data[i].row) * nodeHeight;
      const xpos = Number(data[i].col) * nodeWidth;
      const node: any = {
        id: `${data[i].row},${data[i].col}`,
        type: "textUpdater",
        position: { x: xpos, y: ypos },
        data: {
          id: `${data[i].row},${data[i].col}`,
          label: data[i].Title,
          target: `${data[i].row},${data[i].col}`,
          group: data[i].Band,
          band: data[i].Band,
          onClick: handleNodeClick,
          onInfoClick: handleInfoClick,
          "Job purpose": data[i]["Job purpose"],
          "Key Accountabilities": data[i]["Key Accountabilities"],
          "Finance Technical Competencies": data[i]["Finance Technical Competencies"],
        },
      };

      initialNodes.push(node);
    }
    setNodes(initialNodes);
  }, [data]);

  const NODE_WIDTH = 220;
  const NODE_HEIGHT = 120;

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

  const [showPathway, setShowPathway] = useState(true);
  const [pathWay, setPathWay] = useState<any[]>([]);

  return (
    <MainLayout>
      <div className="flex gap-3">
        <div
          className="bg-slate-50 rounded-lg"
          style={{ width: "100%", height: "90vh" }}
        >
          <CareerRoadmap nodes={nodes} nodeTypes={nodeTypes} />
        </div>
        {showPathway && (
          <div className="w-[250px] border rounded p-3 space-y-3 overflow-y-auto h-[90vh]">
            {pathWay.length > 0 && (
              <div className="flex flex-col-reverse gap-3">
                {pathWay.map((node: any, index: number) => (
                  <div key={index}>
                    {index < pathWay.length - 1 && (
                      <div className="pb-2 flex justify-center items-center">
                        <MoveUp className="w-4 h-4 stroke-slate-400" />
                      </div>
                    )}
                    <TextUpdaterNode data={node} />
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
      />
    </MainLayout>
  );
}
