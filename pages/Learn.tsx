import React, { useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { Article, Checklist, ChecklistItem } from '../types';
import { CheckCircle, Circle, Folder } from 'lucide-react';

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Como escalar seus anúncios no Facebook Ads',
    category: 'Ads',
    readTime: '5 min',
    imageUrl: 'https://picsum.photos/400/200?random=1',
    excerpt: 'Descubra as estratégias de bid e orçamento para levar sua campanha ao próximo nível.'
  },
  {
    id: '2',
    title: 'Checklist de Lançamento Semente',
    category: 'Estratégia',
    readTime: '3 min',
    imageUrl: 'https://picsum.photos/400/200?random=2',
    excerpt: 'O passo a passo completo para validar sua oferta sem gastar rios de dinheiro.'
  },
  {
    id: '3',
    title: 'SEO para E-commerce em 2024',
    category: 'SEO',
    readTime: '8 min',
    imageUrl: 'https://picsum.photos/400/200?random=3',
    excerpt: 'As principais mudanças no algoritmo do Google e como adaptar sua loja.'
  }
];

const mockChecklist: Checklist = {
  id: 'c1',
  title: 'Setup de Campanha Google Ads',
  items: [
    { id: '1', text: 'Definir objetivo da campanha', isCompleted: true },
    { id: '2', text: 'Configurar pixel de conversão', isCompleted: true },
    { id: '3', text: 'Pesquisa de palavras-chave negativas', isCompleted: false },
    { id: '4', text: 'Criar pelo menos 3 variações de anúncio', isCompleted: false },
    { id: '5', text: 'Revisar extensões de anúncio', isCompleted: false },
  ]
};

const Learn: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'checklists'>('articles');
  const [checklist, setChecklist] = useState<Checklist>(mockChecklist);

  const toggleItem = (itemId: string) => {
    setChecklist(prev => ({
        ...prev,
        items: prev.items.map(item => 
            item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
        )
    }));
  };

  return (
    <div className="p-5 pb-20">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">Base de Conhecimento</h1>

      {/* Toggle Tabs */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
        <button
          onClick={() => setActiveTab('articles')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'articles'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500'
          }`}
        >
          Artigos e Dicas
        </button>
        <button
          onClick={() => setActiveTab('checklists')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'checklists'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500'
          }`}
        >
          Checklists
        </button>
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {activeTab === 'articles' ? (
          <div className="space-y-4">
            {mockArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-indigo-50/50 flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                    <Folder size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">{checklist.title}</h3>
                    <p className="text-xs text-slate-500">
                        {checklist.items.filter(i => i.isCompleted).length} de {checklist.items.length} concluídos
                    </p>
                </div>
            </div>
            <div className="p-2">
                {checklist.items.map(item => (
                    <div 
                        key={item.id} 
                        onClick={() => toggleItem(item.id)}
                        className="flex items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                    >
                        <button className={`mr-3 ${item.isCompleted ? 'text-green-500' : 'text-slate-300'}`}>
                            {item.isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
                        </button>
                        <span className={`text-sm ${item.isCompleted ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-700'}`}>
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;