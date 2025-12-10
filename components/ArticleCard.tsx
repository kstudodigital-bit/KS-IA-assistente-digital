import React from 'react';
import { Article } from '../types';
import { Clock, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-4 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="h-32 w-full overflow-hidden relative">
        <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            {article.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2">{article.title}</h3>
        <p className="text-slate-500 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-slate-400 text-xs">
            <Clock size={12} className="mr-1" />
            {article.readTime}
          </div>
          <span className="text-indigo-600 text-xs font-semibold flex items-center">
            Ler mais <ArrowRight size={12} className="ml-1" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;