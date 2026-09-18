import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  ExternalLink, 
  Bookmark, 
  Star, 
  BookOpen, 
  Sparkles, 
  Filter, 
  Clock,
  Check
} from 'lucide-react';

export const ExploreResources = () => {
  const { EXPLORE_RESOURCES, showToast, searchQuery, setSearchQuery } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const categories = ['All', 'Web Development', 'React', 'System Design', 'AI / ML'];

  const filtered = EXPLORE_RESOURCES.filter(r => {
    const matchesCat = activeCategory === 'All' || r.category === activeCategory;
    const matchesSearch = !searchQuery || 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    showToast(bookmarkedIds.includes(id) ? 'Bookmark removed' : 'Resource saved to your library!', 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-bold mb-2 border border-cyan-100">
          <Search className="w-3.5 h-3.5" /> Curated Knowledge Library
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Explore Learning Resources
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Hand-picked cheatsheets, interactive deep dives, official documentations, and top-rated engineering references curated by AI.
        </p>
      </div>

      {/* Category Pills & Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((res) => {
          const isBookmarked = bookmarkedIds.includes(res.id);
          return (
            <div 
              key={res.id}
              className="white-card-interactive p-6 rounded-3xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {res.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {res.rating} ({res.reviews})
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900">{res.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{res.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{res.duration}</span>
                  <span>•</span>
                  <span>{res.source}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(res.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      isBookmarked 
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-600' 
                        : 'border-slate-200 text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    Open Resource <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
