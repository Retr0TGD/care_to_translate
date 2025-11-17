'use client';

import { useState } from 'react';
import { ChevronLeft, Settings, Search, Volume2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ContentList {
  id: number;
  title: string;
  description: string;
  phraseCount: number;
  icon: string;
}

const contentLists: ContentList[] = [
  { id: 1, title: 'About me', description: 'Personal information', phraseCount: 40, icon: '👤' },
  { id: 2, title: 'General information', description: 'Common information', phraseCount: 22, icon: '📋' },
  { id: 3, title: 'Ask for help', description: 'Request assistance', phraseCount: 25, icon: '🆘' },
  { id: 4, title: 'Situation', description: 'Current situation', phraseCount: 27, icon: 'ℹ️' },
  { id: 5, title: 'Orientation', description: 'Navigation & directions', phraseCount: 24, icon: '🧭' },
  { id: 6, title: 'Cause', description: 'Reasons and causes', phraseCount: 19, icon: '💭' },
  { id: 7, title: 'Problems and symptoms', description: 'Medical symptoms', phraseCount: 58, icon: '⚠️' },
  { id: 8, title: 'Disease progression', description: 'Health changes', phraseCount: 18, icon: '📈' },
  { id: 9, title: 'During the medical appointment', description: 'At appointments', phraseCount: 17, icon: '🏥' },
  { id: 10, title: 'Provide information about medication', description: 'Medication info', phraseCount: 30, icon: '💊' },
  { id: 11, title: 'Receive information about medication', description: 'Medication guidance', phraseCount: 16, icon: '📝' },
  { id: 12, title: 'After the medical appointment', description: 'Post-appointment', phraseCount: 8, icon: '✅' },
  { id: 13, title: 'Personal needs', description: 'Daily needs', phraseCount: 58, icon: '🛒' },
  { id: 14, title: 'Feces and urine', description: 'Bodily functions', phraseCount: 9, icon: '🚽' },
  { id: 15, title: 'Feelings', description: 'Emotions', phraseCount: 21, icon: '😊' },
  { id: 16, title: 'Pregnancy', description: 'Pregnancy-related', phraseCount: 26, icon: '🤰' },
];

export default function ReadyMadeContentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const language = searchParams.get('language') || 'Select Language';

  const filteredLists = contentLists.filter((list) =>
    list.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Settings size={24} className="text-foreground" />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Ready-made content for you</h1>
        <p className="text-sm text-muted-foreground">{filteredLists.length} lists</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto mt-28 px-4 py-4">
        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search for language..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-muted text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Content Lists */}
        <div className="space-y-3">
          {filteredLists.map((list) => (
            <button
              key={list.id}
              onClick={() => router.push(`/care-recipient/ready-made-content/${list.id}`)}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors group"
            >
              {/* Icon Circle */}
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-2xl group-hover:bg-blue-600 transition-colors">
                {list.icon}
              </div>

              {/* Content */}
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground text-base">{list.title}</h3>
                <p className="text-sm text-muted-foreground">List • {list.phraseCount} phrases</p>
              </div>

              {/* Chevron */}
              <ChevronLeft size={20} className="text-muted-foreground rotate-180" />
            </button>
          ))}
        </div>

        {filteredLists.length === 0 && (
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">No lists found</p>
          </div>
        )}
      </main>
    </div>
  );
}
