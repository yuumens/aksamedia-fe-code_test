import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Hello World</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              User Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Kelola pengguna dengan operasi CRUD penuh
            </p>
            <button
              onClick={() => navigate("/users")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Buka Pengguna
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Pengaturan Profil
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Edit informasi profil Anda
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Edit Profil
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export { Dashboard };
