import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../../components/ui/Dropdown";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const themeOptions = [
    { value: "light", label: "☀️ Light" },
    { value: "dark", label: "🌙 Dark" },
    { value: "system", label: "🖥️ System" },
  ];

  return (
    <nav className="bg-white dark:bg-chinese-black border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Simple CRUD App
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Dropdown
              trigger={
                <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                  {theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "🖥️"}
                </button>
              }
            >
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`block w-full text-left px-4 py-2 text-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    theme === option.value
                      ? "bg-gray-200 text-gray-900 dark:bg-gray-400 font-semibold"
                      : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </Dropdown>

            <Dropdown
              trigger={
                <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  <span className="font-medium">{user?.fullName}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              }
            >
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
