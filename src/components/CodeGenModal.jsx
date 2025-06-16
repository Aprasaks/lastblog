// 파일: components/CodeGenModal.jsx
import MapCodeGenerator from "./MapCodeGenerator";

export default function CodeGenModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-full max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl hover:text-red-500"
        >
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">코드 자동생성기</h2>
        <MapCodeGenerator />
      </div>
    </div>
  );
}