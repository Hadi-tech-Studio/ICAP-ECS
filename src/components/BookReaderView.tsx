import React, { useState, useEffect, useRef } from 'react';
import { 
  Book, 
  BookChapter, 
  BookBookmark, 
  UserReadingProgress 
} from '../types';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Bookmark, 
  BookmarkCheck, 
  Search, 
  Type, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Coffee, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  Download, 
  Printer, 
  Layers, 
  HelpCircle, 
  Clock, 
  FileText,
  List,
  Languages,
  Maximize2,
  Minimize2,
  Send,
  Loader2,
  FileCheck
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { callGeminiAPI } from '../lib/api-handler';
import { PDFDocumentView } from './PDFDocumentView';
import { useTheme } from '../context/ThemeContext';

interface BookReaderViewProps {
  book: Book;
  initialChapterId?: string;
  onClose: () => void;
  bookmarks: BookBookmark[];
  onToggleBookmark: (bookmark: Omit<BookBookmark, 'id' | 'createdAt'>) => void;
  readingProgress: UserReadingProgress | undefined;
  onUpdateProgress: (bookId: string, chapterId: string, isCompleted: boolean) => void;
  onOpenApiKeyModal: () => void;
}

type ReaderTheme = 'slate' | 'sepia' | 'light' | 'midnight';
type FontSize = 'sm' | 'md' | 'lg' | 'xl';

export const BookReaderView: React.FC<BookReaderViewProps> = ({
  book,
  initialChapterId,
  onClose,
  bookmarks,
  onToggleBookmark,
  readingProgress,
  onUpdateProgress,
  onOpenApiKeyModal
}) => {
  // Active Chapter Index
  const initialIndex = initialChapterId 
    ? Math.max(0, book.chapters.findIndex(c => c.id === initialChapterId))
    : (readingProgress?.lastReadChapterId 
        ? Math.max(0, book.chapters.findIndex(c => c.id === readingProgress.lastReadChapterId))
        : 0);

  const [currentChapterIdx, setCurrentChapterIdx] = useState<number>(initialIndex >= 0 ? initialIndex : 0);
  const currentChapter: BookChapter = book.chapters[currentChapterIdx] || book.chapters[0];

  // Reader Customization State (Synchronized with global ThemeContext)
  const { theme: globalTheme, setTheme: setGlobalTheme } = useTheme();
  const [theme, setThemeState] = useState<ReaderTheme>(globalTheme || 'slate');

  useEffect(() => {
    if (globalTheme && (globalTheme === 'slate' || globalTheme === 'light')) {
      setThemeState(globalTheme);
    }
  }, [globalTheme]);

  const setTheme = (newTheme: ReaderTheme) => {
    setThemeState(newTheme);
    if (newTheme === 'slate' || newTheme === 'light') {
      setGlobalTheme(newTheme);
    }
  };
  const [fontSize, setFontSize] = useState<FontSize>('md');
  const [viewMode, setViewMode] = useState<'replica' | 'standard'>('replica');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [showUrdu, setShowUrdu] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchInChapter, setSearchInChapter] = useState<string>('');
  
  // TTS State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Bookmark Custom Note Modal
  const [isBookmarkNoteOpen, setIsBookmarkNoteOpen] = useState<boolean>(false);
  const [bookmarkCustomNote, setBookmarkCustomNote] = useState<string>('');

  // AI Concept Explainer inside Reader
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Check if current chapter is bookmarked
  const isBookmarked = bookmarks.some(
    b => b.bookId === book.id && b.chapterId === currentChapter.id
  );

  // Check if current chapter is marked completed
  const isChapterCompleted = readingProgress?.completedChapterIds.includes(currentChapter.id) ?? false;

  // Track scroll reading progress
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const handleScroll = () => {
    if (!contentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    if (scrollHeight <= clientHeight) {
      setScrollProgress(100);
      return;
    }
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, scrolled)));
  };

  useEffect(() => {
    // When chapter changes, scroll to top
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
      setScrollProgress(0);
    }
    // Stop any speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    // Update last read chapter
    onUpdateProgress(book.id, currentChapter.id, false);
  }, [currentChapterIdx]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text to Speech
  const toggleTextToSpeech = () => {
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-speech is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Strip markdown formatting for cleaner speech
    const cleanText = `${currentChapter.title}. ${currentChapter.subtitle || ''}. Key takeaways: ${currentChapter.keyTakeaways.join('. ')}. ${currentChapter.contentMarkdown.replace(/#|\*|`|_|\[|\]|\(|\)/g, ' ')}`;
    
    const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 3000));
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Handle Bookmark Toggle
  const handleSaveBookmark = () => {
    onToggleBookmark({
      bookId: book.id,
      chapterId: currentChapter.id,
      chapterNumber: currentChapter.number,
      chapterTitle: currentChapter.title,
      bookTitle: book.title,
      snippet: currentChapter.subtitle || currentChapter.keyTakeaways[0] || 'Chapter Notes',
      note: bookmarkCustomNote.trim() || undefined
    });
    setIsBookmarkNoteOpen(false);
    setBookmarkCustomNote('');
  };

  // Ask Gemini AI for Chapter Explanation
  const handleAskAI = async (queryText?: string) => {
    const question = queryText || aiPrompt;
    if (!question.trim()) return;

    setIsAiLoading(true);
    setIsAiDrawerOpen(true);
    setAiResponse('');

    const prompt = `You are the Official ICAP ECS (English Communication Skills) & Aptis Master Academic Tutor.
The student is reading Chapter ${currentChapter.number}: "${currentChapter.title}" of the textbook "${book.title}".

Chapter Key Takeaways:
${currentChapter.keyTakeaways.join('\n')}

Student's Specific Question or Concept to Explain:
"${question}"

Please provide a clear, high-scoring, pedagogical explanation formatted with bullet points, practical Chartered Accountancy/Aptis examples, and a concise Urdu summary at the end.`;

    try {
      const response = await callGeminiAPI({
        prompt,
        systemInstruction: "You are an expert Cambridge/British Council Aptis trainer and ICAP ECS examiner for Chartered Accountancy candidates. Keep explanations direct, authoritative, and helpful."
      });
      setAiResponse(response);
    } catch (err: any) {
      setAiResponse(`Failed to generate explanation: ${err.message || 'Please check your Gemini API key'}`);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Theme Classes
  const getThemeClasses = () => {
    switch (theme) {
      case 'sepia':
        return {
          wrapper: 'bg-[#fbf0d9] text-[#433422]',
          sidebar: 'bg-[#f4e4c1] border-[#dec596] text-[#433422]',
          header: 'bg-[#f4e4c1] border-[#dec596] text-[#433422]',
          contentBg: 'bg-[#fbf0d9] text-[#342410]',
          cardBg: 'bg-[#f2e0ba] border-[#dec596]',
          proseClasses: 'text-[#342410] prose-stone',
          highlight: 'bg-amber-200 text-amber-900',
          accent: 'text-[#8b5a2b]'
        };
      case 'light':
        return {
          wrapper: 'bg-slate-50 text-slate-900',
          sidebar: 'bg-white border-slate-200 text-slate-800',
          header: 'bg-white border-slate-200 text-slate-900',
          contentBg: 'bg-white text-slate-800',
          cardBg: 'bg-slate-100/90 border-slate-200',
          proseClasses: 'text-slate-800 prose-slate',
          highlight: 'bg-emerald-100 text-emerald-900',
          accent: 'text-emerald-700'
        };
      case 'midnight':
        return {
          wrapper: 'bg-black text-slate-200',
          sidebar: 'bg-zinc-950 border-zinc-800 text-slate-300',
          header: 'bg-zinc-950 border-zinc-800 text-white',
          contentBg: 'bg-black text-slate-200',
          cardBg: 'bg-zinc-900/90 border-zinc-800',
          proseClasses: 'text-slate-200 prose-invert',
          highlight: 'bg-cyan-950 text-cyan-300',
          accent: 'text-cyan-400'
        };
      case 'slate':
      default:
        return {
          wrapper: 'bg-slate-950 text-slate-200',
          sidebar: 'bg-slate-900 border-slate-800 text-slate-300',
          header: 'bg-slate-900 border-slate-800 text-white',
          contentBg: 'bg-slate-950 text-slate-200',
          cardBg: 'bg-slate-900/90 border-slate-800',
          proseClasses: 'text-slate-200 prose-invert',
          highlight: 'bg-emerald-950/80 text-emerald-300',
          accent: 'text-emerald-400'
        };
    }
  };

  const themeStyles = getThemeClasses();

  // Font Size Classes
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-sm leading-relaxed';
      case 'lg': return 'text-lg leading-loose';
      case 'xl': return 'text-xl leading-loose';
      case 'md':
      default: return 'text-base leading-relaxed';
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${themeStyles.wrapper} select-text overflow-hidden transition-colors duration-200`}>
      
      {/* Top Reading Progress Bar */}
      <div className="w-full bg-slate-800/40 h-1 fixed top-0 left-0 z-50">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Master Toolbar */}
      <header className={`h-16 px-4 border-b flex items-center justify-between gap-2 sm:gap-4 shrink-0 shadow-md ${themeStyles.header}`}>
        {/* Left: Back / Sidebar Toggle / Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-all duration-75 text-xs font-semibold shrink-0 cursor-pointer touch-manipulation active:scale-[0.98]"
            title="Back to Books Library"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Library</span>
          </button>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-xl border transition-all duration-75 cursor-pointer touch-manipulation active:scale-[0.98] ${
              isSidebarOpen ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'border-slate-700/50 hover:bg-slate-800/60'
            }`}
            title="Toggle Table of Contents"
          >
            <List className="w-4 h-4" />
          </button>

          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-bold truncate max-w-[200px] sm:max-w-md">
              {book.title}
            </h3>
            <p className="text-[11px] opacity-70 truncate max-w-[200px] sm:max-w-md">
              Ch {currentChapter.number}: {currentChapter.title}
            </p>
          </div>
        </div>

        {/* Right: Customization Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Audio TTS Reader */}
          <button
            onClick={toggleTextToSpeech}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              isSpeaking
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                : 'border-slate-700/50 hover:bg-slate-800/60'
            }`}
            title={isSpeaking ? "Stop Audio Reader" : "Read Aloud (TTS)"}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden md:inline">{isSpeaking ? 'Stop' : 'Listen'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => {
              if (isBookmarked) {
                // Remove bookmark
                onToggleBookmark({
                  bookId: book.id,
                  chapterId: currentChapter.id,
                  chapterNumber: currentChapter.number,
                  chapterTitle: currentChapter.title,
                  bookTitle: book.title,
                  snippet: currentChapter.subtitle || currentChapter.keyTakeaways[0] || 'Chapter Notes'
                });
              } else {
                setIsBookmarkNoteOpen(true);
              }
            }}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 font-bold'
                : 'border-slate-700/50 hover:bg-slate-800/60'
            }`}
            title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
          </button>

          {/* Theme Selector */}
          <div className="flex items-center bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
            <button
              onClick={() => setTheme('slate')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${theme === 'slate' ? 'bg-slate-700 text-white' : 'opacity-60'}`}
              title="Slate Dark"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${theme === 'sepia' ? 'bg-[#dec596] text-[#433422]' : 'opacity-60'}`}
              title="Sepia Warmth"
            >
              <Coffee className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${theme === 'light' ? 'bg-white text-slate-900 shadow' : 'opacity-60'}`}
              title="Crisp Light"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Ask AI Button */}
          <button
            onClick={() => setIsAiDrawerOpen(!isAiDrawerOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
              isAiDrawerOpen
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-transparent shadow-lg shadow-emerald-500/20'
                : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>
        </div>
      </header>

      {/* Main Reading Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Mobile Backdrop for Sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Table of Contents Sidebar */}
        {isSidebarOpen && (
          <aside className={`fixed md:relative inset-y-0 left-0 w-72 sm:w-80 border-r flex flex-col shrink-0 overflow-y-auto ${themeStyles.sidebar} transition-all duration-200 z-40 md:z-20 shadow-2xl md:shadow-none`}>
            
            <div className="p-4 border-b border-inherit sticky top-0 bg-inherit z-10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider opacity-70">Table of Contents</span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                    {book.chapters.length} Chapters
                  </span>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="md:hidden p-1 rounded-lg hover:bg-black/10 text-inherit opacity-70 hover:opacity-100"
                    title="Close Sidebar"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Book Metadata Mini Pill */}
              <div className="p-2.5 rounded-xl bg-black/10 border border-inherit text-xs space-y-1">
                <div className="font-semibold truncate">{book.title}</div>
                <div className="flex items-center justify-between text-[10px] opacity-70">
                  <span>{book.level}</span>
                  <span>{book.totalChapters} Ch • ~{book.estimatedReadHours}h total</span>
                </div>
              </div>
            </div>

            {/* Chapter Items List */}
            <div className="p-2 space-y-1">
              {book.chapters.map((ch, idx) => {
                const isSelected = idx === currentChapterIdx;
                const isCompleted = readingProgress?.completedChapterIds.includes(ch.id);

                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setCurrentChapterIdx(idx);
                      if (typeof window !== 'undefined' && window.innerWidth < 768) {
                        setIsSidebarOpen(false);
                      }
                    }}
                    className={`w-full text-left p-3 rounded-xl transition text-xs flex items-start gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                        : 'hover:bg-black/10 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-mono font-bold ${
                      isSelected ? 'bg-slate-950 text-emerald-400' : 'bg-black/20 text-inherit'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : ch.number}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold">{ch.title}</div>
                      <div className={`text-[10px] flex items-center gap-2 mt-0.5 ${isSelected ? 'text-slate-900 font-medium' : 'opacity-60'}`}>
                        <span>{ch.readingTimeMinutes} mins</span>
                        <span>•</span>
                        <span>{ch.wordCount} words</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sidebar Bottom Bookmarks List */}
            {bookmarks.filter(b => b.bookId === book.id).length > 0 && (
              <div className="p-3 border-t border-inherit mt-auto">
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-70 mb-2 block flex items-center gap-1.5">
                  <Bookmark className="w-3 h-3 text-amber-400" /> Saved Bookmarks ({bookmarks.filter(b => b.bookId === book.id).length})
                </span>
                <div className="space-y-1">
                  {bookmarks.filter(b => b.bookId === book.id).map(b => (
                    <button
                      key={b.id}
                      onClick={() => {
                        const targetIdx = book.chapters.findIndex(c => c.id === b.chapterId);
                        if (targetIdx !== -1) {
                          setCurrentChapterIdx(targetIdx);
                          if (typeof window !== 'undefined' && window.innerWidth < 768) {
                            setIsSidebarOpen(false);
                          }
                        }
                      }}
                      className="w-full text-left p-2 rounded-lg bg-black/10 hover:bg-black/20 text-[11px] truncate flex items-center justify-between gap-2 transition cursor-pointer"
                    >
                      <span className="truncate font-medium">Ch {b.chapterNumber}: {b.chapterTitle}</span>
                      <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        )}

        {/* Main Chapter Content Reader */}
        <main 
          ref={contentRef}
          onScroll={handleScroll}
          className={`flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 ${themeStyles.contentBg}`}
        >
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Chapter Header Banner */}
            <div className={`p-6 rounded-3xl border shadow-lg ${themeStyles.cardBg} space-y-4`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Chapter {currentChapter.number} of {book.chapters.length}
                </span>

                <div className="flex items-center gap-3 text-xs opacity-70">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {currentChapter.readingTimeMinutes} min read
                  </span>
                  <span>•</span>
                  <span>{currentChapter.wordCount} words</span>
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
                  {currentChapter.title}
                </h1>
                {currentChapter.subtitle && (
                  <p className="text-sm sm:text-base opacity-80 mt-1 font-medium">
                    {currentChapter.subtitle}
                  </p>
                )}
              </div>

              {/* Key Takeaways */}
              {currentChapter.keyTakeaways && currentChapter.keyTakeaways.length > 0 && (
                <div className="pt-2 border-t border-inherit">
                  <span className="text-[11px] font-bold uppercase tracking-wider opacity-70 block mb-2">
                    Key Chapter Takeaways
                  </span>
                  <ul className="space-y-1.5 text-xs sm:text-sm">
                    {currentChapter.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Urdu Summary Box (Toggleable) */}
              {currentChapter.urduSummary && (
                <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs sm:text-sm space-y-1">
                  <div className="flex items-center justify-between font-bold text-amber-400">
                    <span className="flex items-center gap-1.5">
                      <Languages className="w-4 h-4" />
                      خلاصہ و رہنمائی (Urdu Overview)
                    </span>
                    <button 
                      onClick={() => setShowUrdu(!showUrdu)}
                      className="text-[10px] underline hover:text-amber-300 cursor-pointer"
                    >
                      {showUrdu ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {showUrdu && (
                    <p className="leading-relaxed font-medium pt-1">
                      {currentChapter.urduSummary}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Content Body: PDF Replica vs Standard Markdown */}
            {viewMode === 'replica' ? (
              <PDFDocumentView chapter={currentChapter} theme={theme} />
            ) : (
              <div className={`prose max-w-none ${getFontSizeClass()} ${themeStyles.proseClasses}`}>
                <ReactMarkdown>{currentChapter.contentMarkdown}</ReactMarkdown>
              </div>
            )}

            {/* Exam Tips Callout (if present) */}
            {currentChapter.examTips && currentChapter.examTips.length > 0 && (
              <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Official Examiner Tips & High-Band Advice
                </span>
                <ul className="space-y-1 text-xs sm:text-sm">
                  {currentChapter.examTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Practice Check / Questions (if present) */}
            {currentChapter.practiceQuestions && currentChapter.practiceQuestions.length > 0 && (
              <div className={`p-5 rounded-2xl border ${themeStyles.cardBg} space-y-3`}>
                <span className="text-xs font-bold uppercase tracking-wider opacity-70 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-cyan-400" /> Concept Self-Check
                </span>
                {currentChapter.practiceQuestions.map((pq, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-black/15 border border-inherit text-xs sm:text-sm space-y-1.5">
                    <p className="font-semibold">{pq.question}</p>
                    <p className="text-emerald-400 font-mono font-bold text-xs">{pq.answer}</p>
                    <p className="text-[11px] opacity-75">{pq.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Mark as Completed Action Bar */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${themeStyles.cardBg}`}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateProgress(book.id, currentChapter.id, !isChapterCompleted)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isChapterCompleted
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'border border-slate-700/60 hover:bg-slate-800/60'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isChapterCompleted ? 'Chapter Completed ✓' : 'Mark as Completed'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAskAI(`Explain the key concepts of Chapter ${currentChapter.number}: ${currentChapter.title}`)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/40 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explain Chapter with AI</span>
                </button>
              </div>
            </div>

            {/* Bottom Next / Previous Navigation */}
            <div className="pt-6 pb-12 border-t border-inherit flex items-center justify-between gap-4">
              <button
                onClick={() => setCurrentChapterIdx(Math.max(0, currentChapterIdx - 1))}
                disabled={currentChapterIdx === 0}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition cursor-pointer ${
                  currentChapterIdx === 0
                    ? 'opacity-40 cursor-not-allowed border-transparent'
                    : 'border-slate-700/60 hover:bg-slate-800/60'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous Chapter</span>
                <span className="sm:hidden">Prev</span>
              </button>

              <span className="text-xs font-mono opacity-60">
                {currentChapterIdx + 1} of {book.chapters.length}
              </span>

              <button
                onClick={() => {
                  // Mark current as read when progressing
                  onUpdateProgress(book.id, currentChapter.id, true);
                  setCurrentChapterIdx(Math.min(book.chapters.length - 1, currentChapterIdx + 1));
                }}
                disabled={currentChapterIdx === book.chapters.length - 1}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition cursor-pointer ${
                  currentChapterIdx === book.chapters.length - 1
                    ? 'opacity-40 cursor-not-allowed border-transparent'
                    : 'bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 shadow-md'
                }`}
              >
                <span className="hidden sm:inline">Next Chapter</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </main>

        {/* AI Concept Explainer Drawer */}
        {isAiDrawerOpen && (
          <aside className={`w-80 sm:w-96 border-l flex flex-col shrink-0 ${themeStyles.sidebar} shadow-2xl z-40 transition-all duration-200`}>
            
            {/* Header */}
            <div className="p-4 border-b border-inherit flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">AI Study Assistant</span>
              </div>
              <button
                onClick={() => setIsAiDrawerOpen(false)}
                className="p-1 rounded-lg hover:bg-black/10 opacity-70 hover:opacity-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Pane */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-black/10 border border-inherit leading-relaxed opacity-90">
                👋 Hello! I am your ICAP ECS & Aptis study assistant. Ask me to explain any sentence, grammatical rule, or vocabulary word from <strong>Chapter {currentChapter.number}</strong>.
              </div>

              {/* Quick Prompt Chips */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase opacity-60">Quick Inquiries:</span>
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => handleAskAI('Give 3 real ICAP audit examples for the concepts in this chapter')}
                    className="px-2 py-1 rounded-lg bg-black/15 hover:bg-black/25 text-[11px] text-left transition cursor-pointer"
                  >
                    💡 3 ICAP Audit Examples
                  </button>
                  <button
                    onClick={() => handleAskAI('Explain the top exam pitfalls candidates make on this topic')}
                    className="px-2 py-1 rounded-lg bg-black/15 hover:bg-black/25 text-[11px] text-left transition cursor-pointer"
                  >
                    ⚠️ Top Exam Traps
                  </button>
                  <button
                    onClick={() => handleAskAI('Provide a Roman Urdu summary of this chapter for quick memorization')}
                    className="px-2 py-1 rounded-lg bg-black/15 hover:bg-black/25 text-[11px] text-left transition cursor-pointer"
                  >
                    🇵🇰 Roman Urdu Summary
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {isAiLoading && (
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="font-semibold">Consulting ICAP Syllabus...</span>
                </div>
              )}

              {/* AI Response Output */}
              {aiResponse && !isAiLoading && (
                <div className="p-4 rounded-2xl bg-black/20 border border-inherit space-y-2">
                  <div className="flex items-center justify-between text-[10px] opacity-70 font-mono">
                    <span>Gemini 2.5 Flash</span>
                    <button 
                      onClick={() => {
                        if (navigator?.clipboard?.writeText) {
                          navigator.clipboard.writeText(aiResponse).catch((err) => {
                            console.warn('Clipboard write failed:', err);
                          });
                        }
                      }}
                      className="underline hover:opacity-100 cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="prose prose-sm prose-invert max-w-none text-xs leading-relaxed">
                    <ReactMarkdown>{aiResponse}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-3 border-t border-inherit bg-inherit">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAskAI();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Ask about this chapter..."
                  className="flex-1 bg-black/20 border border-inherit rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
                <button
                  type="submit"
                  disabled={isAiLoading || !aiPrompt.trim()}
                  className="p-2 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 disabled:opacity-50 transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </aside>
        )}

      </div>

      {/* Bookmark Custom Note Modal */}
      {isBookmarkNoteOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400">
                <Bookmark className="w-5 h-5" />
                <h3 className="font-bold text-sm sm:text-base">Bookmark Chapter {currentChapter.number}</h3>
              </div>
              <button 
                onClick={() => setIsBookmarkNoteOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Saving: <span className="font-semibold text-white">{currentChapter.title}</span>
            </p>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 block">Personal Study Note (Optional):</label>
              <textarea
                value={bookmarkCustomNote}
                onChange={(e) => setBookmarkCustomNote(e.target.value)}
                placeholder="e.g., Revise these 5 golden rules before tomorrow's practice test..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsBookmarkNoteOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBookmark}
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 shadow-md cursor-pointer"
              >
                Save Bookmark
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
