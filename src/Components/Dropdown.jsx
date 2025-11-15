import { useState } from "react";

function Dropdown({ title, subtitle, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-700 rounded-md overflow-hidden">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer bg-gray-800 px-4 py-3"
      >
        <div className="text-white font-semibold">{title}</div>
        <div className="text-gray-400">{subtitle}</div>
      </div>

      {/* Content */}
      {open && (
        <div className="bg-gray-900 px-6 py-3 space-y-2 text-gray-300">
          {children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
