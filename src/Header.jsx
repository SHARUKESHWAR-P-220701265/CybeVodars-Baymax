import { useState } from "react";
import { Menu, MessageSquare, Users, Gamepad2, Calendar } from "lucide-react";

export default function Header({ onOpenChat, onBack, showBackButton = false }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 py-4 gap-3">
          {showBackButton ? (
            <button
              aria-label="back"
              onClick={onBack}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <button
              aria-label="menu"
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-blue-700" />
            </button>
          )}

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">BAYMAX</div>
              <div className="text-xs text-gray-500 font-medium">care.listen.support</div>
            </div>
          </div>

          <button
            aria-label="profile"
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold text-sm hover:from-blue-600 hover:to-blue-800 transition-all"
          >
            AK
          </button>
        </div>
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="text-xl font-bold text-blue-700">Menu</div>
              <button 
                className="text-gray-500 hover:text-gray-700 p-1" 
                onClick={() => setSidebarOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => { onOpenChat(); setSidebarOpen(false); }} 
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors group"
              >
                <MessageSquare className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                <span className="font-medium text-gray-700 group-hover:text-blue-700">Chatbot</span>
              </button>
              <button className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors group">
                <Users className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                <span className="font-medium text-gray-700 group-hover:text-blue-700">Community</span>
              </button>
              <button className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors group">
                <Gamepad2 className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                <span className="font-medium text-gray-700 group-hover:text-blue-700">Games</span>
              </button>
              <button className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors group">
                <Calendar className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                <span className="font-medium text-gray-700 group-hover:text-blue-700">Book Counseling</span>
              </button>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
