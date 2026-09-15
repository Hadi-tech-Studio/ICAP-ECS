import React, { useState, useEffect } from 'react';
import { 
  Book, 
  BookChapter, 
  BookBookmark, 
  UserReadingProgress, 
  BookLevel, 
  BookSubject, 
  BookType 
} from '../types';
import { BOOKS_DATA } from '../data/booksData';
import { BookReaderView } from './BookReaderView';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Download, 
  GraduationCap, 
  Layers, 
  Star, 
  ChevronRight, 
  Home, 
  ArrowLeft, 
  RotateCcw, 
  Trash2, 
  FileText, 
  Languages, 
  BookMarked, 
  Award, 
  BarChart3, 
  Lightbulb, 
  Send, 
  Loader2,
  ListFilter,
  Check,
  X
} from 'lucide-react';
import { callGeminiAPI } from '../lib/api-handler';
import ReactMarkdown from 'react-markdown';

interface BooksHubProps {
  onBackToMain: () => void;
  onOpenApiKeyModal: () => void;
}

export const BooksHub: React.FC<BooksHubProps> = ({
  onBackToMain,
  onOpenApiKeyModal
}) => {
  // Navigation / Tab state inside Books Hub
  const [activeSubTab, setActiveSubTab] = useState<'library' | 'bookmarks' | 'progress' | 'ai-tutor'>('library');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Active Reader View State
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [targetChapterId, setTargetChapterId] = useState<string | undefined>(undefined);

  // Quick Table of Contents Preview Modal
  const [previewBook, setPreviewBook] = useState<Book | null>(null);

  // Bookmarks State (persisted in localStorage)
  const [bookmarks, setBookmarks] = useState<BookBookmark[]>(() => {
    try {
      const saved = localStorage.getItem('ICAP_BOOKMARKS');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reading Progress State (persisted in localStorage)
  const [readingProgressMap, setReadingProgressMap] = useState<Record<string, UserReadingProgress>>(() => {
    try {
      const saved = localStorage.getItem('ICAP_READING_PROGRESS');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save Bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ICAP_BOOKMARKS', JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }, [bookmarks]);

  // Save Reading Progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ICAP_READING_PROGRESS', JSON.stringify(readingProgressMap));
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  }, [readingProgressMap]);

  // Handle Bookmark Toggle
  const handleToggleBookmark = (item: Omit<BookBookmark, 'id' | 'createdAt'>) => {
    setBookmarks(prev => {
      const existsIdx = prev.findIndex(
        b => b.bookId === item.bookId && b.chapterId === item.chapterId
      );
      if (existsIdx !== -1) {
        // Remove
        return prev.filter((_, idx) => idx !== existsIdx);
      } else {
        // Add
        const newBookmark: BookBookmark = {
          ...item,
          id: `bm-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        return [newBookmark, ...prev];
      }
    });
  };

  // Remove single bookmark by ID
  const handleRemoveBookmarkById = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  // Handle Reading Progress Update
  const handleUpdateProgress = (bookId: string, chapterId: string, isCompleted: boolean) => {
    const book = BOOKS_DATA.find(b => b.id === bookId);
    if (!book) return;

    setReadingProgressMap(prev => {
      const current = prev[bookId] || {
        bookId,
        lastReadChapterId: chapterId,
        completedChapterIds: [],
        percentCompleted: 0,
        lastReadAt: new Date().toISOString()
      };

      let newCompleted = [...current.completedChapterIds];
      if (isCompleted && !newCompleted.includes(chapterId)) {
        newCompleted.push(chapterId);
      } else if (!isCompleted && newCompleted.includes(chapterId)) {
        newCompleted = newCompleted.filter(id => id !== chapterId);
      }

      const percent = Math.round((newCompleted.length / book.chapters.length) * 100);

      return {
        ...prev,
        [bookId]: {
          bookId,
          lastReadChapterId: chapterId,
          completedChapterIds: newCompleted,
          percentCompleted: percent,
          lastReadAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }
      };
    });
  };

  // Reset Progress for a book or all
  const handleResetProgress = (bookId?: string) => {
    if (bookId) {
      setReadingProgressMap(prev => {
        const next = { ...prev };
        delete next[bookId];
        return next;
      });
    } else {
      if (window.confirm('Are you sure you want to reset all reading progress?')) {
        setReadingProgressMap({});
      }
    }
  };

  // Filter Logic
  const filteredBooks = BOOKS_DATA.filter(book => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = book.title.toLowerCase().includes(q);
      const matchSubtitle = book.subtitle.toLowerCase().includes(q);
      const matchDesc = book.description.toLowerCase().includes(q);
      const matchTags = book.tags.some(t => t.toLowerCase().includes(q));
      const matchChapters = book.chapters.some(ch => 
        ch.title.toLowerCase().includes(q) || 
        (ch.subtitle && ch.subtitle.toLowerCase().includes(q)) ||
        ch.keyTakeaways.some(kt => kt.toLowerCase().includes(q))
      );
      if (!matchTitle && !matchSubtitle && !matchDesc && !matchTags && !matchChapters) {
        return false;
      }
    }

    // Level filter
    if (selectedLevel !== 'all' && book.level !== selectedLevel) {
      return false;
    }

    // Subject filter
    if (selectedSubject !== 'all' && book.subject !== selectedSubject) {
      return false;
    }

    // Type filter
    if (selectedType !== 'all' && book.type !== selectedType) {
      return false;
    }

    return true;
  });

  // Calculate Overall Aggregate Progress
  const totalChaptersAllBooks = BOOKS_DATA.reduce((acc, b) => acc + b.chapters.length, 0);
  const totalCompletedChaptersCount = Object.values(readingProgressMap).reduce(
    (acc, prog) => acc + prog.completedChapterIds.length, 
    0
  );
  const overallProgressPercentage = totalChaptersAllBooks > 0 
    ? Math.round((totalCompletedChaptersCount / totalChaptersAllBooks) * 100)
    : 0;

  // AI Tutor State (Tab 4)
  const [aiTutorPrompt, setAiTutorPrompt] = useState<string>('');
  const [aiTutorResponse, setAiTutorResponse] = useState<string>('');
  const [isAiTutorLoading, setIsAiTutorLoading] = useState<boolean>(false);

  const handleRunAiTutor = async (customQuestion?: string) => {
    const query = customQuestion || aiTutorPrompt;
    if (!query.trim()) return;

    setIsAiTutorLoading(true);
    setAiTutorResponse('');

    const prompt = `You are the Lead ICAP English Communication Skills (ECS) & Aptis Academic Director for CA Candidates in Pakistan.
The candidate is consulting the Books & Notes Knowledge Base and has this question or request:

"${query}"

Please provide an authoritative, high-yield explanation with:
1. Core rule / concept breakdown.
2. Real-world Chartered Accountancy examples (Audit, Tax, Management, Board reports).
3. Common examiner trap / why students lose marks on this.
4. Bilingual Roman Urdu / Urdu key summary for fast retention.`;

    try {
      const response = await callGeminiAPI({
        prompt,
        systemInstruction: "You are an expert Cambridge/Aptis language instructor and ICAP ECS examiner. Give clear, professional, well-formatted responses."
      });
      setAiTutorResponse(response);
    } catch (err: any) {
      setAiTutorResponse(`Error: ${err.message || 'Please ensure your Gemini API key is configured'}`);
    } finally {
      setIsAiTutorLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      
      {/* Top Banner & Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                ICAP ECS Digital Library & Reader
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                2026 Edition
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-display">
              Books & Master Notes <span className="text-emerald-400">Library</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Official ICAP English Communication Skills (ECS) study text, complete with 4 comprehensive chapters covering Grammar Foundation, Vocabulary Mastery, Reading Skills & Text Cohesion, and Writing Models with built-in digital reader.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onBackToMain}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition cursor-pointer"
            >
              <Home className="w-4 h-4 text-emerald-400" />
              <span>Back to Practice Test</span>
            </button>
          </div>
        </div>

        {/* Global Stats Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50">
            <div className="text-[11px] text-slate-400 font-medium">Available Books</div>
            <div className="text-lg sm:text-xl font-bold text-white mt-0.5 flex items-center gap-1.5">
              <BookMarked className="w-4 h-4 text-emerald-400" />
              <span>{BOOKS_DATA.length} {BOOKS_DATA.length === 1 ? 'Official Book' : 'Editions'}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50">
            <div className="text-[11px] text-slate-400 font-medium">Total Chapters</div>
            <div className="text-lg sm:text-xl font-bold text-white mt-0.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>{totalChaptersAllBooks} Master Chs</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50">
            <div className="text-[11px] text-slate-400 font-medium">Your Reading Progress</div>
            <div className="text-lg sm:text-xl font-bold text-emerald-300 mt-0.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>{overallProgressPercentage}% Complete</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50">
            <div className="text-[11px] text-slate-400 font-medium">Saved Bookmarks</div>
            <div className="text-lg sm:text-xl font-bold text-amber-300 mt-0.5 flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span>{bookmarks.length} Notes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation Sub-Tabs */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          <button
            onClick={() => setActiveSubTab('library')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeSubTab === 'library'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Official Study Text ({BOOKS_DATA.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('bookmarks')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeSubTab === 'bookmarks'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>My Bookmarks ({bookmarks.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('progress')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeSubTab === 'progress'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Reading Progress</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ai-tutor')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeSubTab === 'ai-tutor'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>AI Concept Explainer</span>
          </button>

        </div>
      </div>

      {/* ================= TAB 1: LIBRARY & HANDBOOKS ================= */}
      {activeSubTab === 'library' && (
        <div className="space-y-6">
          
          {/* Search & Multi-Filters Toolbar */}
          <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            
            {/* Top Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all books, chapters, grammar rules, vocabulary, takeaways, or Urdu notes..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Dropdowns & Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/60 text-xs">
              
              {/* Level Filter */}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" /> Module:
                </span>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                >
                  <option value="all">All ECS Modules</option>
                  <option value="ICAP ECS">ICAP ECS Core</option>
                </select>
              </div>

              {/* Subject Filter */}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" /> Topic Area:
                </span>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-400 max-w-[200px]"
                >
                  <option value="all">All Syllabus Areas</option>
                  <option value="Comprehensive Master Notes">Comprehensive Master Notes</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-amber-400" /> Format:
                </span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                >
                  <option value="all">All Formats</option>
                  <option value="Study Text">Study Text</option>
                </select>
              </div>

              {/* Reset Filters */}
              {(selectedLevel !== 'all' || selectedSubject !== 'all' || selectedType !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedLevel('all');
                    setSelectedSubject('all');
                    setSelectedType('all');
                    setSearchQuery('');
                  }}
                  className="ml-auto text-xs text-rose-400 hover:text-rose-300 font-semibold underline cursor-pointer"
                >
                  Reset Filters
                </button>
              )}

            </div>
          </div>

          {/* Books Cards Grid */}
          {filteredBooks.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Books or Notes Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No resources matched your search query "{searchQuery}" or chosen filters. Try clearing filters to see all available textbooks.
              </p>
              <button
                onClick={() => {
                  setSelectedLevel('all');
                  setSelectedSubject('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition"
              >
                Show All Books
              </button>
            </div>
          ) : (
            <div className={filteredBooks.length === 1 ? "max-w-2xl" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
              {filteredBooks.map((book) => {
                const progress = readingProgressMap[book.id];
                const percent = progress?.percentCompleted || 0;
                const completedCount = progress?.completedChapterIds.length || 0;

                return (
                  <div
                    key={book.id}
                    className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col group"
                  >
                    {/* Book Card Cover Banner */}
                    <div className={`p-6 bg-gradient-to-br ${book.coverGradient} relative text-white space-y-3 min-h-[140px] flex flex-col justify-between`}>
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/40 text-white border border-white/20 backdrop-blur-xs uppercase">
                          {book.type}
                        </span>

                        <div className="flex items-center gap-1.5 text-xs font-bold bg-black/40 px-2.5 py-0.5 rounded-full border border-white/20 backdrop-blur-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{book.rating}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block">
                          {book.subject}
                        </span>
                        <h3 className="text-lg font-bold leading-snug text-white font-display group-hover:text-emerald-200 transition-colors">
                          {book.title}
                        </h3>
                      </div>
                    </div>

                    {/* Book Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {book.description}
                        </p>

                        {/* Metadata Pills */}
                        <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-800/80">
                          <div className="text-slate-400">
                            <span className="block text-[10px] text-slate-500 uppercase">Level</span>
                            <span className="font-semibold text-slate-200">{book.level}</span>
                          </div>
                          <div className="text-slate-400">
                            <span className="block text-[10px] text-slate-500 uppercase">Chapters</span>
                            <span className="font-semibold text-slate-200">{book.totalChapters} Chs</span>
                          </div>
                          <div className="text-slate-400">
                            <span className="block text-[10px] text-slate-500 uppercase">Est. Time</span>
                            <span className="font-semibold text-slate-200">~{book.estimatedReadHours} hrs</span>
                          </div>
                        </div>

                        {/* Progress Bar (if reading started) */}
                        <div className="space-y-1 pt-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400 font-medium">
                              {percent > 0 ? `${completedCount}/${book.chapters.length} Chs read` : 'Not started'}
                            </span>
                            <span className="font-mono font-bold text-emerald-400">{percent}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setReadingBook(book);
                            setTargetChapterId(progress?.lastReadChapterId);
                          }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 shadow-md shadow-emerald-500/20 transition cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>{percent > 0 ? 'Resume Reading' : 'Open Reader'}</span>
                        </button>

                        <button
                          onClick={() => setPreviewBook(book)}
                          className="p-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-300 transition cursor-pointer"
                          title="View Chapters & Table of Contents"
                        >
                          <ListFilter className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* ================= TAB 2: MY BOOKMARKS ================= */}
      {activeSubTab === 'bookmarks' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-amber-400" />
                  Saved Bookmarks & Personal Notes ({bookmarks.length})
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Access marked chapters and key revision takeaways across all ICAP ECS study texts.
                </p>
              </div>

              {bookmarks.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Clear all saved bookmarks?')) {
                      setBookmarks([]);
                    }
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {bookmarks.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-white">No Bookmarks Saved Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  While reading any chapter in the digital reader, click the <strong>Bookmark</strong> button in the top toolbar to save it here for fast revision.
                </p>
                <button
                  onClick={() => setActiveSubTab('library')}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400"
                >
                  Browse Books Library
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarks.map((bm) => {
                  const book = BOOKS_DATA.find(b => b.id === bm.bookId);

                  return (
                    <div
                      key={bm.id}
                      className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span className="font-semibold text-emerald-400 truncate max-w-[200px]">{bm.bookTitle}</span>
                          <span>{bm.createdAt}</span>
                        </div>

                        <h4 className="text-sm font-bold text-white">
                          Chapter {bm.chapterNumber}: {bm.chapterTitle}
                        </h4>

                        <p className="text-xs text-slate-300 line-clamp-2 italic">
                          "{bm.snippet}"
                        </p>

                        {bm.note && (
                          <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs">
                            <span className="text-[10px] text-amber-400 font-bold uppercase block">Note:</span>
                            {bm.note}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-700/40 flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            if (book) {
                              setReadingBook(book);
                              setTargetChapterId(bm.chapterId);
                            }
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500 hover:text-slate-950 text-xs font-bold transition cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Jump to Chapter</span>
                        </button>

                        <button
                          onClick={() => handleRemoveBookmarkById(bm.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition cursor-pointer"
                          title="Delete Bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 3: READING PROGRESS TRACKER ================= */}
      {activeSubTab === 'progress' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  Reading Progress & Chapter Completion Matrix
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Track completed chapters, estimated hours invested, and CA syllabus coverage.
                </p>
              </div>

              <button
                onClick={() => handleResetProgress()}
                className="text-xs text-slate-400 hover:text-rose-400 font-medium flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Progress</span>
              </button>
            </div>

            {/* Book by Book Matrix */}
            <div className="space-y-4">
              {BOOKS_DATA.map((book) => {
                const prog = readingProgressMap[book.id];
                const completedIds = prog?.completedChapterIds || [];
                const percent = prog?.percentCompleted || 0;

                return (
                  <div
                    key={book.id}
                    className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                            {book.level}
                          </span>
                          <span className="text-xs text-slate-400">{book.type}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                          {book.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {completedIds.length} / {book.chapters.length} Chs ({percent}%)
                        </span>
                        <button
                          onClick={() => {
                            setReadingBook(book);
                            setTargetChapterId(prog?.lastReadChapterId);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 cursor-pointer"
                        >
                          Read
                        </button>
                      </div>
                    </div>

                    {/* Chapter Completion Toggles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2 border-t border-slate-700/40">
                      {book.chapters.map((ch) => {
                        const isDone = completedIds.includes(ch.id);

                        return (
                          <div
                            key={ch.id}
                            onClick={() => handleUpdateProgress(book.id, ch.id, !isDone)}
                            className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition cursor-pointer ${
                              isDone
                                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200 font-semibold'
                                : 'bg-slate-900 border-slate-750 text-slate-300 hover:border-slate-600'
                            }`}
                          >
                            <span className="truncate">
                              Ch {ch.number}: {ch.title}
                            </span>
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border ${
                              isDone ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'border-slate-600 text-slate-400'
                            }`}>
                              {isDone ? '✓' : ''}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* ================= TAB 4: AI CONCEPT EXPLAINER ================= */}
      {activeSubTab === 'ai-tutor' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">AI Concept Explainer & Study Tutor</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Instant Academic Clarity for ICAP ECS Candidates
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl">
                Have a tricky grammar rule, audit vocabulary question, or writing rubric inquiry? Ask your dedicated AI tutor powered by Gemini 2.5 Flash.
              </p>
            </div>

            {/* Quick Inspiration Prompts */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-semibold">Try High-Yield Syllabus Inquiries:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {[
                  "Explain the 7 Cs of communication with 3 CA audit examples",
                  "Difference between 'Fiduciary' vs 'Stewardship' in audit reporting",
                  "How to properly invert conditionals in formal emails (Had I known...)",
                  "Top 5 grammar mistakes Pakistani CA candidates make in Writing Task 4B",
                  "How to structure an Audit Management Letter finding (5 C's Framework)",
                  "Write a model CEFR C1 response for a formal complaint email"
                ].map((promptText, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setAiTutorPrompt(promptText);
                      handleRunAiTutor(promptText);
                    }}
                    className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 text-left text-xs text-slate-200 transition space-y-1 cursor-pointer"
                  >
                    <div className="font-semibold text-emerald-300">💡 Inquiry #{i + 1}</div>
                    <div className="line-clamp-2 text-slate-300">{promptText}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRunAiTutor();
              }}
              className="space-y-3"
            >
              <div className="relative">
                <textarea
                  value={aiTutorPrompt}
                  onChange={(e) => setAiTutorPrompt(e.target.value)}
                  placeholder="Ask any English communication, grammar, vocabulary, or ICAP exam question..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={onOpenApiKeyModal}
                  className="text-xs text-slate-400 hover:text-emerald-400 underline"
                >
                  Configure Gemini Key
                </button>

                <button
                  type="submit"
                  disabled={isAiTutorLoading || !aiTutorPrompt.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 shadow-md shadow-emerald-500/20 disabled:opacity-50 transition cursor-pointer"
                >
                  {isAiTutorLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating Answer...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Ask AI Tutor</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* AI Output Box */}
            {aiTutorResponse && (
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Official AI Tutor Response
                  </span>
                  <button
                    onClick={() => {
                      if (navigator?.clipboard?.writeText) {
                        navigator.clipboard.writeText(aiTutorResponse).catch((err) => {
                          console.warn('Clipboard write failed:', err);
                        });
                      }
                    }}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Copy Explanation
                  </button>
                </div>

                <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed">
                  <ReactMarkdown>{aiTutorResponse}</ReactMarkdown>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Quick Table of Contents Preview Modal */}
      {previewBook && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full shadow-2xl text-white space-y-4 max-h-[85vh] flex flex-col">
            
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400">{previewBook.level} • {previewBook.type}</span>
                <h3 className="text-lg font-bold">{previewBook.title}</h3>
                <p className="text-xs text-slate-400">{previewBook.subtitle}</p>
              </div>
              <button 
                onClick={() => setPreviewBook(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chapters List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Table of Contents ({previewBook.chapters.length} Chapters)
              </span>

              {previewBook.chapters.map((ch) => (
                <div
                  key={ch.id}
                  className="p-3 rounded-2xl bg-slate-800/50 border border-slate-750 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-200">
                      Chapter {ch.number}: {ch.title}
                    </div>
                    {ch.subtitle && (
                      <div className="text-[11px] text-slate-400 italic">{ch.subtitle}</div>
                    )}
                    <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-2 pt-0.5">
                      <span>{ch.readingTimeMinutes} mins read</span>
                      <span>•</span>
                      <span>{ch.wordCount} words</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setReadingBook(previewBook);
                      setTargetChapterId(ch.id);
                      setPreviewBook(null);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500 hover:text-slate-950 text-xs font-bold shrink-0 transition cursor-pointer"
                  >
                    Read
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end">
              <button
                onClick={() => {
                  setReadingBook(previewBook);
                  setTargetChapterId(undefined);
                  setPreviewBook(null);
                }}
                className="w-full py-2.5 rounded-2xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 shadow-md cursor-pointer"
              >
                Open Full Book
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Digital Book / PDF Reader Modal */}
      {readingBook && (
        <BookReaderView
          book={readingBook}
          initialChapterId={targetChapterId}
          onClose={() => {
            setReadingBook(null);
            setTargetChapterId(undefined);
          }}
          bookmarks={bookmarks}
          onToggleBookmark={handleToggleBookmark}
          readingProgress={readingProgressMap[readingBook.id]}
          onUpdateProgress={handleUpdateProgress}
          onOpenApiKeyModal={onOpenApiKeyModal}
        />
      )}

    </div>
  );
};
