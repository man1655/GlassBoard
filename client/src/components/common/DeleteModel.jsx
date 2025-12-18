import React from 'react';

const DeleteModel = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm transition-all">

      <div className="relative w-full max-w-sm bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50" />

        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
          Delete
        </h3>

        <p className="text-sm text-zinc-300/80 mb-8 leading-relaxed">
          Are you sure you want to Delete User? 
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl shadow-lg shadow-red-600/20 transition-all"
          >
            Yes, Delete 
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteModel;