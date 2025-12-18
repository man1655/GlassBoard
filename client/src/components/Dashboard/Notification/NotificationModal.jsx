import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

const NotificationModal = ({ isOpen, onClose, notification, onSave, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info",
    audience: "all",
    status: "sent" 
  });

  // Populate form when editing
  useEffect(() => {
    if (notification) {
      setFormData({
        title: notification.title || "",
        message: notification.message || "",
        type: notification.type || "info",
        audience: notification.audience || "all",
        status: notification.status || "sent"
      });
    } else {
      setFormData({ title: "", message: "", type: "info", audience: "all", status: "sent" });
    }
  }, [notification, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header Gradient */}
          <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {notification ? "Edit Message" : "Broadcast Message"}
                </h2>
                <p className="text-xs text-zinc-400 mt-1">Send alerts to your user base.</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase mb-2 block">Subject Line</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-zinc-600"
                  placeholder="e.g. Critical System Update"
                />
              </div>

              {/* Grid: Type & Audience */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-xs font-semibold text-zinc-400 uppercase mb-2 block">Type</label>
                   <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 cursor-pointer appearance-none"
                  >
                    <option value="info" className="bg-zinc-900">🔵 Info</option>
                    <option value="success" className="bg-zinc-900">🟢 Success</option>
                    <option value="warning" className="bg-zinc-900">🟡 Warning</option>
                    
                  </select>
                </div>
                <div>
                   <label className="text-xs font-semibold text-zinc-400 uppercase mb-2 block">Audience</label>
                   <select
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 cursor-pointer appearance-none"
                  >
                    <option value="all" className="bg-zinc-900">Everyone</option>
                    
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-semibold text-zinc-400 uppercase mb-2 block">Message Body</label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-zinc-600 resize-none"
                  placeholder="Type your message details here..."
                />
              </div>
              <div className="pt-4 flex gap-3">
                 <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-zinc-300 font-medium rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={18} />
                      {notification ? "Update" : "Send Broadcast"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NotificationModal;