import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Search, Filter, Shield, AlertCircle, CheckCircle, Clock } from "lucide-react";
import GlassCard from "../../components/common/GlassCard"; // Ensure path is correct

const ActivityLogs = () => {
  // --- MOCK DATA (Replace with API fetch later) ---
  const [logs] = useState([
    { id: 1, user: "Admin User", action: "LOGIN", details: "Successful login", ip: "192.168.1.1", status: "success", date: "2024-12-18T10:30:00" },
    { id: 2, user: "Admin User", action: "CREATE_USER", details: "Created user 'John Doe'", ip: "192.168.1.1", status: "success", date: "2024-12-18T10:35:00" },
    { id: 3, user: "Manager", action: "DELETE_USER", details: "Deleted user 'Jane Smith'", ip: "192.168.1.45", status: "warning", date: "2024-12-18T11:00:00" },
    { id: 4, user: "Unknown", action: "LOGIN_FAILED", details: "Invalid password attempt", ip: "45.22.19.12", status: "error", date: "2024-12-18T11:15:00" },
    { id: 5, user: "Admin User", action: "BROADCAST_SENT", details: "Sent 'System Maintenance' alert", ip: "192.168.1.1", status: "success", date: "2024-12-18T12:00:00" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "success": return "text-green-400";
      case "warning": return "text-amber-400";
      case "error": return "text-red-400";
      default: return "text-blue-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "success": return <CheckCircle size={14} />;
      case "error": return <AlertCircle size={14} />;
      default: return <Shield size={14} />;
    }
  };

  return (
    <div className="relative min-h-screen pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FileText className="text-blue-400" /> Activity Logs
          </h1>
          <p className="text-blue-200/60 mt-1">Audit trail of system events and user actions.</p>
        </div>
        
        {/* Simple Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
          <input 
            type="text" 
            placeholder="Search logs..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:bg-white/10 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Logs Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-xs uppercase text-white/40 font-bold tracking-wider">
                <th className="p-5">User / Actor</th>
                <th className="p-5">Action</th>
                <th className="p-5">Details</th>
                <th className="p-5">IP Address</th>
                <th className="p-5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.filter(log => log.action.toLowerCase().includes(searchTerm.toLowerCase()) || log.user.toLowerCase().includes(searchTerm.toLowerCase())).map((log, index) => (
                <motion.tr 
                  key={log.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                        {log.user.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-white">{log.user}</span>
                    </div>
                  </td>
                  
                  <td className="p-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border border-white/5 bg-white/5 ${getStatusColor(log.status)}`}>
                      {getStatusIcon(log.status)}
                      {log.action}
                    </span>
                  </td>

                  <td className="p-5">
                    <span className="text-sm text-blue-100/70">{log.details}</span>
                  </td>

                  <td className="p-5">
                    <span className="text-xs font-mono text-white/50 bg-black/20 px-2 py-1 rounded">{log.ip}</span>
                  </td>

                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 text-xs text-white/40">
                      <Clock size={12} />
                      {new Date(log.date).toLocaleString()}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default ActivityLogs;