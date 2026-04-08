export default function Modal({ isOpen, onClose, children }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
