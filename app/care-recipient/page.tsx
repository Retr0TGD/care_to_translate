'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

const LANGUAGES = [
  { name: 'Albanian', native: 'Shqip' },
  { name: 'Amharic', native: 'አማርኛ' },
  { name: 'Arabic', native: 'العربية' },
  { name: 'Bengali (Bangladesh)', native: 'বাংলা (বাংলাদেশ)' },
  { name: 'Bosnian', native: 'Bosanski jezik' },
  { name: 'Bulgarian', native: 'Български' },
  { name: 'Chinese (Mandarin)', native: '中文 (普通话)' },
  { name: 'Croatian', native: 'Hrvatski jezik' },
  { name: 'Czech', native: 'Čeština' },
  { name: 'Danish', native: 'Dansk' },
  { name: 'Dutch', native: 'Nederlands' },
  { name: 'English', native: 'English' },
  { name: 'Estonian', native: 'Eesti' },
  { name: 'Finnish', native: 'Suomi' },
  { name: 'French', native: 'Français' },
  { name: 'German', native: 'Deutsch' },
  { name: 'Greek', native: 'Ελληνικά' },
  { name: 'Hebrew', native: 'עברית' },
  { name: 'Hindi', native: 'हिन्दी' },
  { name: 'Hungarian', native: 'Magyar' },
  { name: 'Indonesian', native: 'Bahasa Indonesia' },
  { name: 'Irish', native: 'Gaeilge' },
  { name: 'Italian', native: 'Italiano' },
  { name: 'Japanese', native: '日本語' },
  { name: 'Korean', native: '한국어' },
  { name: 'Latvian', native: 'Latvian' },
  { name: 'Lithuanian', native: 'Lietuvių' },
  { name: 'Macedonian', native: 'Македонски' },
  { name: 'Malay', native: 'Bahasa Melayu' },
  { name: 'Maltese', native: 'Malti' },
  { name: 'Nepali', native: 'नेपाली' },
  { name: 'Norwegian', native: 'Norsk' },
  { name: 'Persian/Dari', native: 'دری' },
  { name: 'Persian/Farsi', native: 'فارسی' },
  { name: 'Polish', native: 'Polski' },
  { name: 'Portuguese (Brazil)', native: 'Português (Brasil)' },
  { name: 'Portuguese (Portugal)', native: 'Português (Portugal)' },
  { name: 'Romanian', native: 'Română' },
  { name: 'Russian', native: 'Русский' },
  { name: 'Serbian', native: 'Српски' },
  { name: 'Slovak', native: 'Slovenčina' },
  { name: 'Slovenian', native: 'Slovenščina' },
  { name: 'Somali', native: 'Soomaali' },
  { name: 'Spanish', native: 'Español' },
  { name: 'Swedish', native: 'Svenska' },
  { name: 'Tagalog', native: 'Tagalog' },
  { name: 'Thai', native: 'ไทย' },
  { name: 'Turkish', native: 'Türkçe' },
  { name: 'Ukrainian', native: 'Українська' },
  { name: 'Urdu', native: 'اردو' },
  { name: 'Vietnamese', native: 'Tiếng Việt' },
  { name: 'Welsh', native: 'Cymraeg' },
];

export default function CareRecipientPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [showGenderSidebar, setShowGenderSidebar] = useState(false);

  const filteredLanguages = LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.native.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setSelectedGender(null);
    setShowGenderSidebar(true);
  };

  const handleSelectGender = (gender: string) => {
    setSelectedGender(gender);
    // TODO: Navigate to next step or handle translation flow
  };

  const handleCloseSidebar = () => {
    setShowGenderSidebar(false);
    setSelectedLanguage(null);
    setSelectedGender(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-4">
      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Translate to</h1>
      </div>
      <div className="bg-emerald-100 rounded-lg p-4 mb-6">
        <p className="text-slate-700 text-base">
          Please select the language you want to translate to
        </p>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for language..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-4 pr-12 py-3 bg-slate-100 rounded-full text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredLanguages.length > 0 ? (
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              {searchQuery ? 'Search Results' : `All ${LANGUAGES.length} Languages`}
            </p>
            <div className="space-y-0">
              {filteredLanguages.map((language) => (
                <button
                  key={language.name}
                  onClick={() => handleSelectLanguage(language.name)}
                  className="w-full text-left py-3 transition-colors hover:bg-slate-50"
                >
                  <p className="font-semibold text-slate-900">{language.name}</p>
                  <p className="text-sm text-slate-500">{language.native}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-500">No languages found</p>
          </div>
        )}
      </div>

      {showGenderSidebar && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity"
            onClick={handleCloseSidebar}
          />
          
          {/* Sidebar */}
          <div
            className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 flex flex-col p-6 shadow-lg transition-transform duration-300 ease-in-out ${
              showGenderSidebar ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <button
              onClick={handleCloseSidebar}
              className="absolute top-6 left-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={24} className="text-slate-900" />
            </button>

            {/* Sidebar Content */}
            <div className="mt-12 flex flex-col h-full">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{selectedLanguage}</h2>
                <p className="text-slate-700">
                  The person I want to talk to is addressed as:
                </p>
              </div>

              {/* Gender Selection Options */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => handleSelectGender('male')}
                  className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
                    selectedGender === 'male'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-4xl mb-3">♂</div>
                  <p className="font-semibold text-slate-900">Male</p>
                </button>

                <button
                  onClick={() => handleSelectGender('female')}
                  className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
                    selectedGender === 'female'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-4xl mb-3">♀</div>
                  <p className="font-semibold text-slate-900">Female</p>
                </button>
              </div>
              {selectedGender && (
                <button
                  onClick={() => {
                    // TODO: Navigate to translation screen with selected language and gender
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-full transition-colors mt-auto"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
