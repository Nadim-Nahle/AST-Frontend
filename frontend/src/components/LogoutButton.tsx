import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear local storage
    localStorage.clear();

    // 2. Optional: If you want to clear React Query cache or cookies, do it here.

    // 3. Redirect to login
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-xs border border-gray-800 text-gray-500 rounded hover:border-red-900 hover:text-red-400 transition-colors font-mono cursor-pointer"
    >
      <span className="opacity-50">exit --</span>logout
    </button>
  );
}
