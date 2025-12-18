import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Trash2,
  Edit,
  Shield,
  Users,
  UserCheck,
  UserX,
  Mail,
  ChevronDown,
  X,
} from "lucide-react";

// Components
import GlassCard from "../../../components/common/GlassCard";
import StatCard from "../../../components/Dashboard/StatCard";
import UserModal from "./UserModal";
import GlassboardLoader from "../../common/LoadingScreen";

// Redux Actions
import {
  deleteUser,
  fetchUsers,
  fetchUserStats,
} from "../../../redux/slices/userSlice";
import { notify } from "../../../utils/notify";
import DeleteModel from "../../common/DeleteModel";
import DashboardLoader from "../../common/DashboardLoader";
import UpdateUserModal from "../../../pages/dashboard/UpdateModel";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModel, setUpdateModel] = useState(false);
  const [page, setPage] = useState(1);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers({ page, Role: role, status }));
    dispatch(fetchUserStats());
  }, [dispatch, page, role, status]);

  const {
    list: users = [],
    stats = { total: 0, active: 0, banned: 0, inactive: 0 },
    pagination = {
      page: 1,
      totalPage: 1,
      totalUsers: 0,
      limit: 10,
    },
    loading = false,
  } = useSelector((state) => state.users || {});

  const handleDelete = async () => {
    if (!selectedUserId) return;

    setShowConfirm(false);
    const result = await dispatch(deleteUser(selectedUserId));
    if (deleteUser.fulfilled.match(result)) {
      notify.success("User deactivated successfully!");
      dispatch(fetchUsers({ page, Role: role, status }));
      dispatch(fetchUserStats());
    } else {
      notify.error(result.payload || "Failed to delete user");
    }
    setSelectedUserId(null);
  };

  if (loading) return <DashboardLoader />;

  return (
    <>
      <DeleteModel
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
      />
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            User Management
          </h1>
          <p className="text-blue-200/60 mt-1">
            Manage permissions and view user details.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
        >
          <Plus size={18} /> Add User
        </motion.button>
      </motion.div>

      {/* 2. Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <StatCard
          icon={Users}
          label="Total Users"
          value={stats.total}
          trend={12}
          color="blue"
        />
        <StatCard
          icon={UserCheck}
          label="Active Users"
          value={stats.active}
          trend={5}
          color="green"
        />
        <StatCard
          icon={UserX}
          label="Banned / Inactive"
          value={stats.banned + stats.inactive}
          trend={-2}
          color="red"
        />
      </motion.div>

      {/* 3. Search & Filter Section (UPDATED DESIGN) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <GlassCard className="p-4 flex flex-col xl:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full xl:w-96 group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* New Filters Design */}
          <div className="flex flex-wrap gap-3 items-center bg-white/5 p-1.5 rounded-2xl border border-white/5 backdrop-blur-sm w-full xl:w-auto">
            {/* Filter Label */}
            <div className="px-3 text-blue-200/50 hidden md:flex items-center gap-2">
              <Filter size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">
                Filters
              </span>
            </div>

            <div className="h-6 w-px bg-white/10 hidden md:block"></div>

            {/* ROLE FILTER */}
            <div className="relative group flex-1 md:flex-none">
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setPage(1);
                }}
                className="w-full md:w-32 appearance-none pl-4 pr-10 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all hover:bg-white/10 cursor-pointer"
              >
                <option value="" className="bg-[#0f172a] text-gray-400">
                  All Roles
                </option>
                <option value="admin" className="bg-[#0f172a]">
                  Admin
                </option>
                <option value="Member" className="bg-[#0f172a]">
                  Member
                </option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none group-hover:text-white transition-colors"
              />
            </div>

            {/* STATUS FILTER */}
            <div className="relative group flex-1 md:flex-none">
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full md:w-32 appearance-none pl-4 pr-10 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all hover:bg-white/10 cursor-pointer "
              >
                <option value="" className="bg-[#0f172a] text-gray-400">
                  All Status
                </option>
                <option value="active" className="bg-[#0f172a]">
                  Active
                </option>
                <option value="banned" className="bg-[#0f172a]">
                  Banned
                </option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none group-hover:text-white transition-colors"
              />
            </div>

            {/* CLEAR BUTTON */}
            {(role || status) && (
              <button
                onClick={() => {
                  setRole("");
                  setStatus("");
                  setPage(1);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-300 hover:text-white bg-red-500/10 hover:bg-red-500 rounded-xl border border-red-500/20 transition-all"
              >
                <X size={14} />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </GlassCard>
      </motion.div>

      {/* 4. Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-xs uppercase text-white/40 font-bold tracking-wider">
                  <th className="p-6">User Profile</th>
                  <th className="p-6">Role</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users
                  .filter((u) =>
                    u.fullName.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((user, index) => (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      key={user._id || user.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-white font-bold text-sm shadow-inner">
                            {user.fullName ? user.fullName.charAt(0) : "U"}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">
                              {user.fullName}
                            </p>
                            <p className="text-xs text-white/40">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                            user.role === "admin"
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          }`}
                        >
                          {user.role === "admin" && <Shield size={10} />}
                          {/* Safe Capitalization */}
                          {user.role
                            ? user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)
                            : "Member"}
                        </span>
                      </td>

                      <td className="p-6">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${
                            user.status === "active"
                              ? "bg-green-500/10 border-green-500/20 text-green-400"
                              : user.status === "banned"
                              ? "bg-red-500/10 border-red-500/20 text-red-400"
                              : "bg-zinc-500/10 border-zinc-500/20 text-zinc-400"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              user.status === "active"
                                ? "bg-green-400 animate-pulse"
                                : user.status === "banned"
                                ? "bg-red-400"
                                : "bg-zinc-400"
                            }`}
                          />
                          <span className="capitalize">{user.status}</span>
                        </div>
                      </td>

                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/5">
                            <Edit
                              onClick={() => {
                                setUpdateModel(true);
                                setSelectedUser(user);
                              }}
                              size={16}
                            />
                          </button>
                          <button
                            onClick={() => {
                              setShowConfirm(true);
                              setSelectedUserId(user._id);
                            }}
                            className="p-2 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/10"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500">
            <span>
              Showing {(pagination.page - 1) * pagination.limit + 1}–
              {Math.min(
                pagination.page * pagination.limit,
                pagination.totalUsers
              )}{" "}
              of {pagination.totalUsers} users
            </span>
            <div className="flex gap-2">
              <button
                disabled={pagination.page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-50 transition-colors"
              >
                Prev
              </button>

              <button
                disabled={pagination.page === pagination.totalPage}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </GlassCard>
      </motion.div>
      <UpdateUserModal
        isOpen={updateModel}
        user={selectedUser}
        onClose={() => {
          setUpdateModel(false);
          setSelectedUser(null);
        }}
        onUpdateSuccess={() =>
          dispatch(fetchUsers({ page, Role: role, status }))
        }
      />
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default UserList;
