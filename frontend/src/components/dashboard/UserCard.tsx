type Props = {
  user: any;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
};

export default function UserCard({
  user,
  index,
  onEdit,
  onDelete,
  isDeleting,
}: Props) {
  return (
    <div className="border border-gray-900 rounded p-4 hover:border-gray-800 transition-colors group">
      <div className="flex justify-between items-start">
        {/* LEFT */}
        <div className="flex gap-4 items-start flex-1">
          <div className="relative">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-10 h-10 rounded border border-gray-800 object-cover bg-gray-900"
            />
            <span className="absolute -top-1 -left-1 text-[10px] text-gray-700">
              [{index}]
            </span>
          </div>

          <div className="flex-1">
            <p className="font-medium text-sm mb-0.5">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-600 mb-1">{user.email}</p>
            <p className="text-xs text-gray-500">
              <span className="text-gray-700">role:</span> {user.jobTitle}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="px-3 py-1 text-xs border border-gray-800 rounded hover:border-gray-600"
          >
            edit
          </button>

          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="px-3 py-1 text-xs border border-gray-800 rounded hover:border-red-900 hover:text-red-400 cursor-pointer"
          >
            {isDeleting ? "..." : "delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
