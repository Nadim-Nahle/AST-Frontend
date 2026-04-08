import LogoutButton from "../LogoutButton";

type Props = {
  total: number;
  onCreate: () => void;
};

export default function DashboardHeader({ total, onCreate }: Props) {
  return (
    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-900">
      <div>
        <h2 className="text-xl font-normal mb-1">
          <span className="text-gray-500">$</span> users
        </h2>
        <p className="text-xs text-gray-600">{total} records</p>
      </div>

      <div className="flex items-center gap-3">
        <LogoutButton />
        <button
          onClick={onCreate}
          className="bg-white text-black px-4 py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
        >
          + new
        </button>
      </div>
    </div>
  );
}
