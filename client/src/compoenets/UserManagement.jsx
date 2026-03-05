import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  toggleBlockUser,
} from "../features/user/userSlice";
import { Trash2, ShieldBan } from "lucide-react";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.users);
  const { user: currentUser } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="md:p-10 text-white">
      <h1 className="text-3xl font-bold text-emerald-400 mb-8">
        User Management
      </h1>

      <div
        className="
        bg-gradient-to-br from-[#020617] to-[#064e3b]
        border border-emerald-900/40
        rounded-2xl shadow-xl overflow-x-auto
      "
      >
        {loading ? (
          <p className="p-6 text-center">Loading...</p>
        ) : (
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700 text-left ">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {list.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-800 hover:bg-white/5"
                >
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4">
                    {user.isBlocked ? (
                      <span className="text-red-400">Blocked</span>
                    ) : (
                      <span className="text-emerald-400">Active</span>
                    )}
                  </td>
                  <td className="p-4 flex gap-3">
                    <button
                      disabled={currentUser?._id === user._id}
                      onClick={() =>
                        dispatch(
                          toggleBlockUser({
                            id: user._id,
                            block: !user.isBlocked,
                          }),
                        )
                      }
                      className={`
                        p-2 rounded
                        ${
                          currentUser?._id === user._id
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/40"
                        }
                      `}
                      title={
                        currentUser?._id === user._id
                          ? "You cannot block yourself"
                          : user.isBlocked
                            ? "Unblock user"
                            : "Block user"
                      }
                    >
                      <ShieldBan size={16} />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm("Delete user?"))
                          dispatch(deleteUser(user._id));
                      }}
                      className="p-2 rounded bg-red-600/20 text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {list.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
