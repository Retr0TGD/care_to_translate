'use client';

import { useState } from 'react';
import { Settings, User, Stethoscope, MessageCircle, Home, Search, Mic, ChevronDown, X, Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeNav, setActiveNav] = useState('home');
  const [showRoleSidebar, setShowRoleSidebar] = useState(false);
  const [selectedRole, setSelectedRole] = useState('care-recipient');
  
  const language = searchParams.get('language') || 'Select Language';
  const gender = searchParams.get('gender') || 'not selected';

  const contentCards = [
    {
      id: 1,
      title: 'Ready-made content for you',
      bgGradient: 'from-blue-500 to-blue-600',
    },
    {
      id: 2,
      title: 'Word lists',
      bgGradient: 'from-blue-700 to-blue-800',
    },
    {
      id: 3,
      title: 'All content',
      bgGradient: 'from-emerald-100 to-emerald-200',
      textColor: 'text-emerald-900',
    },
  ];

  const handleLanguageClick = () => {
    router.push('/care-recipient');
  };

  const handleHeadphoneClick = () => {
    setShowRoleSidebar(true);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleRegister = () => {
    router.push('/auth/sign-in');
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Settings size={24} className="text-foreground" />
            </button>
            <button 
              onClick={handleHeadphoneClick}
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <User size={24} className="text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <MessageCircle size={24} className="text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>

          {/* Language dropdown */}
          <button 
            onClick={handleLanguageClick}
            className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
          >
            <span className="text-foreground font-medium">{language}</span>
            <ChevronDown size={20} className="text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto mt-16 mb-20 px-4 py-6">
        <div className="max-w-full">
          <h1 className="text-2xl font-bold text-foreground mb-6">Discover content</h1>

          {/* Content Cards */}
          <div className="space-y-4">
            {contentCards.map((card) => (
              <button
                key={card.id}
                className={`w-full p-6 rounded-2xl text-white font-semibold text-xl transition-transform hover:scale-105 active:scale-95 ${
                  card.bgGradient.includes('emerald')
                    ? `bg-gradient-to-r ${card.bgGradient} ${card.textColor || ''}`
                    : `bg-gradient-to-r ${card.bgGradient}`
                }`}
              >
                {card.title}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border">
        <div className="flex items-center justify-around h-20 px-4">
          <button
            onClick={() => setActiveNav('home')}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
              activeNav === 'home'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Home size={24} />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => setActiveNav('search')}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
              activeNav === 'search'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Search size={24} />
            <span className="text-xs font-medium">Search</span>
          </button>

          <button
            onClick={() => setActiveNav('live-translate')}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
              activeNav === 'live-translate'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Mic size={24} />
            <span className="text-xs font-medium">Live Translate</span>
          </button>
        </div>
      </nav>

      {/* Role Selection Sidebar */}
      {showRoleSidebar && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowRoleSidebar(false)}
          />

          {/* Sidebar */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background z-50 shadow-lg transform transition-transform duration-300 ease-out">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <button
                onClick={() => setShowRoleSidebar(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X size={24} className="text-foreground" />
              </button>
              <h2 className="text-lg font-semibold text-foreground flex-1 text-center">Phrase library</h2>
              <div className="w-10" /> {/* Spacer for alignment */}
            </div>

            {/* Content */}
            <div className="flex flex-col items-center justify-between h-full p-6">
              <div className="w-full">
                <p className="text-center text-foreground font-semibold mb-6">I want to use this app as:</p>

                {/* Role Selection Cards */}
                <div className="flex flex-col gap-4 mb-8">
                  {/* Staff Card */}
                  <button
                    onClick={() => handleRoleSelect('staff')}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      selectedRole === 'staff'
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-border bg-muted hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Stethoscope className="w-12 h-12 text-slate-700" strokeWidth={1.5} />
                      <span className={`font-semibold ${selectedRole === 'staff' ? 'text-emerald-700' : 'text-muted-foreground'}`}>
                        Staff
                      </span>
                    </div>
                  </button>

                  {/* Care Recipient Card */}
                  <div className="relative">
                    <button
                      onClick={() => handleRoleSelect('care-recipient')}
                      className={`p-6 rounded-2xl border-2 transition-all w-full ${
                        selectedRole === 'care-recipient'
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-border bg-muted hover:border-emerald-400'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <User className="w-12 h-12 text-slate-700" strokeWidth={1.5} />
                        <span className={`font-semibold ${selectedRole === 'care-recipient' ? 'text-emerald-700' : 'text-muted-foreground'}`}>
                          Care recipient
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Info Message */}
                <p className="text-center text-sm text-muted-foreground mb-6">
                  A free account is required to use the app as staff.
                </p>
              </div>

              {/* Register Button */}
              <button
                onClick={handleRegister}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-full transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
