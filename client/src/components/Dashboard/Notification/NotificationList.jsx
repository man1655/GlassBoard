import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  Clock,
  Trash2,
  Edit,
  Megaphone
} from "lucide-react";

// Actions
import {
  getNotifications,
  deleteNotification,
  createNotification,
  updateNotification,
  reset
} from "../../../redux/slices/notificationSlice";

// Components
import GlassCard from "../../../components/common/GlassCard";
import DeleteModel from "../../common/DeleteModel";
import NotificationModal from "./NotificationModal";
import DashboardLoader from "../../common/DashboardLoader";
import { notify } from "../../../utils/notify";

const NotificationList = () => {

  const dispatch = useDispatch();

  // Redux State
  const { 
    notifications, 
    isLoading, 
    isError, 
    message 
  } = useSelector((state) => state.notification);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);


  useEffect(() => {
    dispatch(getNotifications());
    return () => { dispatch(reset()); };
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      notify.error(message);
    }
  }, [isError, message]);


  const handleDelete = async () => {
    if (selectedId) {
      const result = await dispatch(deleteNotification(selectedId));
      if (deleteNotification.fulfilled.match(result)) {
        notify.success("Notification deleted successfully");
      } else {
        notify.error("Failed to delete notification");
      }
      setShowConfirm(false);
    }
  };

  const handleSave = async (data) => {
  try {
    setIsSaving(true);

    let result;
    if (editingItem) {
      result = await dispatch(updateNotification({
        id: editingItem._id,
        notificationData: data
      }));
      if (updateNotification.fulfilled.match(result)) {
        notify.success("Notification updated");
      }
    } else {
      result = await dispatch(createNotification(data));
      if (createNotification.fulfilled.match(result)) {
        notify.success("Broadcast sent successfully");
      }
    }

    if (!result.error) {
      setIsModalOpen(false);
      setEditingItem(null);
    }
  } finally {
    setIsSaving(false); // 🔑 THIS fixes infinite loading
  }
};


  // --- Helpers ---

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getStyles = (type) => {
    switch (type) {
      case "success": return { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", glow: "shadow-green-500/20" };
      case "warning": return { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", glow: "shadow-amber-500/20" };
      case "alert": return { icon: Bell, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", glow: "shadow-red-500/20" };
      default: return { icon: Info, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", glow: "shadow-blue-500/20" };
    }
  };

  const filteredNotifications = notifications.filter(n => {
    return (n.title || "").toLowerCase().includes(searchTerm.toLowerCase()) || 
           (n.message || "").toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (isLoading && notifications.length === 0) return <DashboardLoader />;

  return (
    <div className="relative min-h-screen pb-20">
      <DeleteModel
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Message?"
        message="This action is permanent and will remove the alert from users' dashboards."
      />

      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
        notification={editingItem}
        onSave={handleSave}
        loading={isSaving}
      />

      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20">
              <Megaphone className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Broadcaster</h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-blue-200/60 ml-1"
          >
            Manage alerts, announcements, and system updates.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto"
        >
          {/* Search Bar */}
          <div className="relative group flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:bg-white/10 focus:border-blue-500/30 transition-all"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg shadow-white/5"
          >
            <Plus size={18} />
            <span>Compose</span>
          </button>
        </motion.div>
      </div>

      {/* --- GRID LIST --- */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredNotifications.map((item, index) => {
            const style = getStyles(item.type);
            const Icon = style.icon;

            return (
              <motion.div
                layout
                key={item._id} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <GlassCard className="relative h-full flex flex-col p-0 overflow-visible group hover:border-white/20 transition-all duration-300">
                  {/* Card Header */}
                  <div className="p-6 pb-4 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${style.bg} border ${style.border} flex items-center justify-center shadow-lg ${style.glow}`}>
                        <Icon size={22} className={style.color} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white line-clamp-1">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${style.border} ${style.color} bg-black/20`}>
                            {item.type}
                          </span>
                          <span className="text-xs text-zinc-500 flex items-center gap-1">
                            <Clock size={10} /> {formatDate(item.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="px-6 pb-6 flex-1">
                    <p className="text-sm text-blue-100/70 leading-relaxed line-clamp-3">
                      {item.message}
                    </p>
                  </div>

                  <div className=" py-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-center h-14">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button 
                        onClick={() => { setEditingItem(item); setIsModalOpen(true); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/20 transition-colors"
                      >
                        <Edit size={12} />
                        Update
                      </button>
                      <button 
                        onClick={() => { setSelectedId(item._id); setShowConfirm(true); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 transition-colors"
                      >
                        <Trash2 size={12} />
                        Delete
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {!isLoading && filteredNotifications.length === 0 && (
          <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
               <Bell className="text-white/20" size={40} />
             </div>
             <h3 className="text-lg font-bold text-white">No notifications found</h3>
             <p className="text-white/40 text-sm mt-2 max-w-xs mx-auto">
               We couldn't find any messages matching your current search.
             </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NotificationList;