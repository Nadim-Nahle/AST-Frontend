type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  return (
    <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-900">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1.5 text-xs border border-gray-800 rounded disabled:opacity-30 cursor-pointer"
      >
        ← prev
      </button>

      <span className="text-xs text-gray-600">
        page <span className="text-gray-400">{page}</span> of{" "}
        <span className="text-gray-400">{totalPages}</span>
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1.5 text-xs border border-gray-800 rounded disabled:opacity-30 cursor-pointer"
      >
        next →
      </button>
    </div>
  );
}
