import { Fullscreen, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TextUpdaterNode } from './TextUpdaterNode';

const Background = ({ color, gap }: { color: string; gap: number }) => {
  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `radial-gradient(${color} 1px, transparent 0)`,
    backgroundSize: `${gap}px ${gap}px`,
  };
  return <div style={backgroundStyle} />;
};

const Controls = ({ onZoomIn, onZoomOut, onFitView }: any) => {
  return (
    <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', flexDirection: 'column' }}
    className='space-y-1'
    >
      <button className='p-2 cursor bg-white rounded shadow' onClick={onZoomIn}>
        <Plus className="w-4 h-4 stroke-slate-700" />
      </button>
      <button className='p-2 cursor bg-white rounded shadow' onClick={onZoomOut}>
        <Minus className="w-4 h-4 stroke-slate-700" />
      </button>
      <button className='p-2 cursor bg-white rounded shadow' onClick={onFitView}>
        <Fullscreen className="w-4 h-4 stroke-slate-700" />
      </button>
    </div>
  );
};

export const CareerRoadmap = ({ nodes, nodeTypes, 
  onNodesChange, onEdgesChange, onConnect, fitView, nodesDraggable, nodesConnectable }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });

  const handleWheel = (event) => {
    const { deltaY, clientX, clientY } = event;
    const zoomFactor = 0.95;
    // const zoomFactor = 1.95;
    const newK = deltaY < 0 ? transform.k / zoomFactor : transform.k * zoomFactor;

    const mouseX = clientX - transform.x;
    const mouseY = clientY - transform.y;

    const newX = transform.x - (mouseX * (newK - transform.k)) / transform.k;
    const newY = transform.y - (mouseY * (newK - transform.k)) / transform.k;

    setTransform({ x: newX, y: newY, k: newK });
  };

  const handleMouseDown = (event) => {
    const startX = event.clientX - transform.x;
    const startY = event.clientY - transform.y;

    const handleMouseMove = (moveEvent) => {
      const newX = moveEvent.clientX - startX;
      const newY = moveEvent.clientY - startY;
      setTransform({ ...transform, x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleZoomIn = () => {
    const newK = transform.k / 0.95;
    setTransform({ ...transform, k: newK });
  };

  const handleZoomOut = () => {
    const newK = transform.k * 0.95;
    setTransform({ ...transform, k: newK });
  };

  const handleFitView = () => {
    if (nodes.length === 0) return;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    nodes.forEach(node => {
      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxX = Math.max(maxX, node.position.x + (node.width || 220));
      maxY = Math.max(maxY, node.position.y + (node.height || 120));
    });

    const boundsWidth = maxX - minX;
    const boundsHeight = maxY - minY;
    const container = document.querySelector('.career-roadmap-container');
    const { width, height } = container.getBoundingClientRect();

    const kx = width / boundsWidth;
    const ky = height / boundsHeight;
    const newK = Math.min(kx, ky) * 0.9;

    const newX = (width - (boundsWidth * newK)) / 2 - minX * newK;
    const newY = (height - (boundsHeight * newK)) / 2 - minY * newK;

    setTransform({ x: newX, y: newY, k: newK });
  };

  useEffect(() => {
    if (fitView && nodes.length > 0) {
      handleFitView();
    }
  }, [fitView, nodes.length]);

  return (
    <div
      className="career-roadmap-container"
      style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
    >
      <Background color="#e6e5e5ff" gap={16} />
      <div style={{ transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.k})`, transformOrigin: '0 0' }}>
        {nodes.map(node => {
          const NodeComponent = nodeTypes[node.type] || TextUpdaterNode;
          return (
            <div key={node.id} style={{ position: 'absolute', left: node.position.x, top: node.position.y }}>
              <NodeComponent {...node} zoom={transform.k}/>
            </div>
          );
        })}
      </div>
      <Controls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onFitView={handleFitView} />
    </div>
  );
};
