// 파일: components/CodeGenToggleButton.jsx
import { useState } from "react";
import CodeGenModal from "./CodeGenModal";

export default function CodeGenToggleButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-8 bottom-8 z-50 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 transition"
      >
        💡
      </button>
      {open && <CodeGenModal onClose={() => setOpen(false)} />}
    </>
  );
}