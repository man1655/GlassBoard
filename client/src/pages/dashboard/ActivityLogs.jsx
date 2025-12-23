import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Search,
  Filter,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import GlassCard from "../../components/common/GlassCard";
import { useDispatch, useSelector } from "react-redux";
import DashboardLoader from "../../components/common/DashboardLoader";
import { fetchLogs } from "../../redux/slices/dashboardSlice";

const ActivityLogs = () => {
  const dispatch = useDispatch();
  const { logs, isLoading } = useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  if (isLoading) return <DashboardLoader />;

  return (
    <div className="relative min-h-screen pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FileText className="text-blue-400" /> Activity Logs
          </h1>
          <p className="text-blue-200/60 mt-1">
            Audit trail of system events and user actions.
          </p>
        </div>
      </div>

      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-xs uppercase text-white/40 font-bold tracking-wider">
                <th className="p-5">User / Actor</th>
                <th className="p-5">Activity</th>
                <th className="p-5">module</th>
                <th className="p-5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs
                .filter((log) => log.action.toLowerCase())
                .map((log, index) => (
                  <motion.tr
                    key={log._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                          {log.userName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-white">
                          {log.userName}
                        </span>
                      </div>
                    </td>

                    <td className="p-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border border-white/5 bg-white/5}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className="text-sm text-blue-100/70">
                        {log.module}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <div className="inline-flex items-center gap-2 tracking-wider px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                        <Clock size={13} className="text-cyan-400" />
                        <span className="text-xs font-semibold text-white/90">
                          {formatTimestamp(log.timestamp)}
                        </span>
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
