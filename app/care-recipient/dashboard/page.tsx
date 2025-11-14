'use client';

import { useState } from 'react';
import { Settings, Headphones, MessageCircle, Home, Search, Mic, ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeNav, setActiveNav] = useState('home');
  
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
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <Headphones size={24} className="text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <MessageCircle size={24} className="text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>

          {/* Language dropdown */}
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors">
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
    </div>
  );
}
