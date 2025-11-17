'use client';

import { useState } from 'react';
import { ChevronLeft, Settings, Search, Home, Mic } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface WordList {
  id: number;
  title: string;
  phraseCount: number;
  icon: string;
}

const wordLists: WordList[] = [
  { id: 1, title: 'Word list: Diagnosis', phraseCount: 38, icon: '🩺' },
  { id: 2, title: 'Word list: Examinations and samples', phraseCount: 30, icon: '🔬' },
  { id: 3, title: 'Word list: Family', phraseCount: 26, icon: '👨‍👩‍👧‍👦' },
  { id: 4, title: 'Word list: Food and drink', phraseCount: 29, icon: '🍽️' },
  { id: 5, title: 'Word list: General terms', phraseCount: 47, icon: '📚' },
  { id: 6, title: 'Word list: Medications', phraseCount: 40, icon: '💊' },
  { id: 7, title: 'Word list: Numbers', phraseCount: 27, icon: '🔢' },
  { id: 8, title: 'Word list: Orientation', phraseCount: 22, icon: '🧭' },
  { id: 9, title: 'Word list: Professions', phraseCount: 50, icon: '👨‍⚕️' },
  { id: 10, title: 'Word list: Support aids', phraseCount: 16, icon: '🦽' },
  { id: 11, title: 'Word list: Symptoms', phraseCount: 27, icon: '🤒' },
  { id: 12, title: 'Word list: The body', phraseCount: 77, icon: '🧬' },
  { id: 13, title: 'Word list: Time', phraseCount: 70, icon: '⏰' },
];

export default function WordListsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const language = searchParams.get('language') || 'Select Language';

  const filteredLists = wordLists.filter((list) =>
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
        <h1 className="text-2xl font-bold text-foreground">Word lists</h1>
        <p className="text-sm text-muted-foreground">{filteredLists.length} areas</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto mt-28 px-4 py-4 mb-20">
        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-muted text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Word Lists */}
        <div className="space-y-3">
          {filteredLists.map((list) => (
            <button
              key={list.id}
              onClick={() => router.push(`/care-recipient/word-lists/${list.id}`)}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors group"
            >
              {/* Icon Circle - Teal instead of blue */}
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center text-2xl group-hover:bg-teal-700 transition-colors">
                {list.icon}
              </div>

              {/* Content */}
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground text-base">{list.title}</h3>
                <p className="text-sm text-muted-foreground">Area • {list.phraseCount} phrases</p>
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

      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border">
        <div className="flex items-center justify-around h-20 px-4">
          <button
            onClick={() => router.push('/care-recipient/dashboard')}
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <Home size={24} />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <Search size={24} />
            <span className="text-xs font-medium">Search</span>
          </button>

          <button
            className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <Mic size={24} />
            <span className="text-xs font-medium">Live Translate</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
