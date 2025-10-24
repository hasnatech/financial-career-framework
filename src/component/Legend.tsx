import { legendData } from "./legendData";

export function Legend() {
      const getImage = (band: string) => {
    const fileName = `${band
      .replace(/\//g, "_")
      .replace(/\s+/g, "_")
      .toLowerCase()}.svg`;

    return `/${fileName}`;
  };
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {legendData.map(({ band, fill }) => (
        <div key={band} className="flex items-center gap-2">
          {/* <div
            className="h-6 w-6 rounded-sm border border-slate-300"
            style={{ backgroundColor: fill }}
          /> */}
          <img src={getImage(band)} alt={band} className="h-8 w-8" />
          <span className="font-medium text-sm ">{band}</span>
        </div>
      ))}
    </div>
  );
}