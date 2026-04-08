export default function Modal({ isOpen, onClose, children }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center font-mono z-50">
      <div className="bg-black border border-gray-800 rounded w-[440px] relative">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b border-gray-900">
          <span className="text-xs text-gray-500">
            <span className="text-gray-700">$</span> user.form
          </span>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-400 text-sm transition-colors"
          >
            [esc]
          </button>
        </div>

        {/* Content */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
