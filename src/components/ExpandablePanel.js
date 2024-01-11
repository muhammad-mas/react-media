import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
function ExpandablePanel({ header, children }) {
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={"mb-2 border rounded"}>
      <div className="flex p-2 justify-between items-center ">
        <div className="flex flex-row gap-2 items-center justify-start">
          {header}
        </div>
        <div onClick={handleClick} className="cursor-pointer">
          {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {isExpanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
}
export default ExpandablePanel;
