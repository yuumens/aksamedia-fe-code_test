import { useState, useEffect } from "react";
import { storage } from "../../utils/storage";
import { STORAGE_KEYS } from "../../utils/constants";
import Layout from "../../components/layout/Layout";
import { UserModal } from "../../components/ui/UserModal";
import { Navigate, useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Debug log untuk melihat state modal
  useEffect(() => {
    console.log("Modal state:", { showModal, editingUser });
  }, [showModal, editingUser]);

  useEffect(() => {
    const savedUsers = storage.get(STORAGE_KEYS.USERS_DATA) || [];
    setUsers(savedUsers);
  }, []);

  const saveUsers = (userList) => {
    storage.set(STORAGE_KEYS.USERS_DATA, userList);
    setUsers(userList);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((user) => user.id !== id);
      saveUsers(updatedUsers);
    }
  };

  const handleEdit = (user) => {
    console.log("Edit clicked for user:", user);
    setEditingUser(user);
    setShowModal(true);
  };

  const handleAddUser = () => {
    console.log("Add user clicked");
    setEditingUser(null);
    setShowModal(true);
  };

  const handleSave = (userData) => {
    if (editingUser) {
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, ...userData } : user
      );
      saveUsers(updatedUsers);
    } else {
      const newUser = {
        id: Date.now(),
        ...userData,
        createdAt: new Date().toISOString(),
      };
      saveUsers([...users, newUser]);
    }
    setShowModal(false);
    setEditingUser(null);
  };

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manajemen Pengguna
          </h1>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => navigate(-1)}
              className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600"
            >
              Kembali
            </button>

            <button
              onClick={handleAddUser}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Tambah User
            </button>
          </div>
        </div>

        <div className="max-w-md">
          <input
            type="text"
            placeholder="Cari Pengguna..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedUsers.map((user) => (
              <li key={user.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Nama: {user.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Email: {user.email}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Umur: {user.age}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Umur: {user.city}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 px-2 py-1 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {paginatedUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {searchTerm
                ? `Pengguna "${searchTerm} Tidak Tersedia"`
                : "Pengguna Tidak Tersedia, Silahkan Klik Tombol Tambah User untuk Menambahkan Pengguna."}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border text-chinese-black border-gray-300 dark:text-white dark:border-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "dark:text-white text-chinese-black hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border text-chinese-black border-gray-300 dark:text-white dark:border-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        )}

        {showModal && (
          <UserModal
            user={editingUser}
            onSave={handleSave}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </Layout>
  );
};

export { UserList };
