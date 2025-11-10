export const bandClass = (props: any) => {
  const pastelDark: { [key: string]: string } = {
    "Accounts Payable / Accounts Receivable": "border-[#E0B622]",
    "Corporate Audit": "border-[#ABAC1C]",
    "Enterprise Finance": "border-[#86A84B]",
    "Financial Accounting": "border-[#5CB2A5]",
    "Insurance": "border-[#057A85]",
    "Internal Control": "border-[#056389]",
    "Managerial Accounting": "border-[#C10505]",
    "Tax": "border-[#C00000]",
    "Trade Compliance": "border-[#7132A0]",
    "Treasury": "border-[#D4D444]",
  };
  return pastelDark[props.data.band] || "border-gray-500";
};

// {fill:"FFF1C5", stroke:"E0B622"},
// {fill:"F6F7C8", stroke:"ABAC1C"},
// {fill:"E3F4C5", stroke:"86A84B"},
// {fill:"CCF1EC", stroke:"5CB2A5"},
// {fill:"B3F8FF", stroke:"057A85"},
// {fill:"B4E9FF", stroke:"056389"},
// {fill:"EFC1C1", stroke:"C10505"},
// {fill:"E49393", stroke:"C00000"},
// {fill:"C8B0DA", stroke:"7132A0"},
// {fill:"FFFF9E", stroke:"D4D444"}

export const getBandBackgroundColor=(band:any)=>{
  const backgroundColor:{[key:string]:string}={
    "Accounts Payable / Accounts Receivable": "bg-[#FFF1C5] border-[#E0B622]",
    "Corporate Audit": "bg-[#F6F7C8] border-[#ABAC1C]",
    "Enterprise Finance": "bg-[#E3F4C5] border-[#86A84B]",
    "Financial Accounting": "bg-[#CCF1EC] border-[#5CB2A5]",
    "Insurance": "bg-[#FFFF9E] border-[#D4D444]",
    "Internal Control": "bg-[#b3f8ff] border-[#057a85]",
    "Managerial Accounting": "bg-[#b4e9ff] border-[#056389]",
    "Tax": "bg-[#efc1c1] border-[#c10505]",
    "Trade Compliance": "bg-[#e49393] border-[#c00000]",
    "Treasury": "bg-[#c8b0da] border-[#7132a0]"
  }

  return backgroundColor[band] || 'bg-white'
}
