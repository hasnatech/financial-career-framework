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
