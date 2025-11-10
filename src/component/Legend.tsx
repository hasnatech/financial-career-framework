import { Button } from "../components/ui/button";
import { legendData } from "./legendData";

interface LegendProps {
  selectedBands: string[];
  onBandClick: (band: string) => void;
  onClear: () => void;  
}

export function Legend({ selectedBands, onBandClick, onClear }: LegendProps) {
  const getImage = (band: string) => {
    const fileName = `${band
      .replace(/\//g, "_")
      .replace(/\s+/g, "_")
      .toLowerCase()}.svg`;
    return `${import.meta.env.BASE_URL}images/${fileName}`;
  };

  return (
    <div className="flex flex-col gap-y-4 ">
      <div className="flex flex-col flex-wrap gap-x-4 gap-y-4 ">
        {legendData.map(({ band }) => {
          const isSelected = selectedBands.includes(band);
          const hasSelection = selectedBands.length > 0;
          return (
            <div
              key={band}
              className="flex items-center gap-2 cursor-pointer transition-opacity"
              style={{ opacity: hasSelection && !isSelected ? 0.3 : 1 }}
              onClick={() => onBandClick(band)}
            >
              <img src  ={getImage(band)} alt={band} className="h-8 w-8" />
              <span className="font-medium text-sm ">{band}</span>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
