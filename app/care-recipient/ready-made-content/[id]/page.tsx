'use client';

import { useState } from 'react';
import { ChevronLeft, Volume2, Copy, Share2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Phrase {
  id: number;
  text: string;
  translation?: string;
}

const phraseData: Record<number, { title: string; icon: string; phrases: Phrase[] }> = {
  1: {
    title: 'About me',
    icon: '👤',
    phrases: [
      { id: 1, text: 'My name is' },
      { id: 2, text: 'I am years old' },
      { id: 3, text: 'I am allergic to' },
      { id: 4, text: 'I have a medical condition' },
    ],
  },
  2: {
    title: 'General information',
    icon: '📋',
    phrases: [
      { id: 1, text: 'Hello' },
      { id: 2, text: 'How are you?' },
      { id: 3, text: 'Thank you' },
    ],
  },
  // Add more data for other IDs as needed
};

export default function PhraseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  
  const listId = parseInt(params.id);
  const data = phraseData[listId] || { title: 'Phrases', icon: '📝', phrases: [] };
  const language = searchParams.get('language') || 'Select Language';

  const handleSpeak = (id: number, text: string) => {
    setSpeakingId(id);
    // Text-to-speech will be implemented later
    setTimeout(() => setSpeakingId(null), 1000);
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border px-4 py-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ChevronLeft size={24} className="text-foreground" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{data.icon}</span>
              <h1 className="text-2xl font-bold text-foreground">{data.title}</h1>
            </div>
            <p className="text-sm text-muted-foreground">{data.phrases.length} phrases</p>
          </div>
        </div>
      </header>

      {/* Phrases List */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {data.phrases.map((phrase) => (
            <div key={phrase.id} className="p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="font-medium text-foreground text-base">{phrase.text}</p>
                  {phrase.translation && (
                    <p className="text-sm text-muted-foreground mt-1">{phrase.translation}</p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleSpeak(phrase.id, phrase.text)}
                    className={`p-2 rounded-lg transition-colors ${
                      speakingId === phrase.id
                        ? 'bg-emerald-500 text-white'
                        : 'hover:bg-muted-foreground/20 text-muted-foreground'
                    }`}
                  >
                    <Volume2 size={18} />
                  </button>
                  <button className="p-2 hover:bg-muted-foreground/20 rounded-lg transition-colors text-muted-foreground">
                    <Copy size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
