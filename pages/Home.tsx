import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, MessageSquare, TrendingUp, ShieldCheck } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5 space-y-6">
      {/* Header Section */}
      <header className="flex justify-between items-center mt-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Olá, Parceiro KS</h1>
          <p className="text-sm text-slate-500">Vamos escalar seus resultados hoje?</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
          KS
        </div>
      </header>

      {/* Main CTA - AI Assistant */}
      <div 
        onClick={() => navigate('/chat')}
        className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 cursor-pointer relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                <MessageSquare size={18} className="text-white" />
            </div>
            <span className="text-xs font-medium uppercase tracking-wider opacity-90">KS IA Assistente</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Tire suas dúvidas agora</h2>
          <p className="text-indigo-100 text-sm mb-4">Pergunte sobre Tráfego, Copy, Funis ou envie um print do seu anúncio.</p>
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
            Iniciar Conversa
          </button>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-slate-800 font-bold mb-3 text-base">Acesso Rápido</h3>
        <div className="grid grid-cols-2 gap-3">
          <div onClick={() => navigate('/learn')} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center gap-2 active:scale-95 transition-transform cursor-pointer">
            <div className="bg-green-50 text-green-600 p-3 rounded-full">
                <TrendingUp size={24} />
            </div>
            <span className="font-medium text-slate-700 text-sm">Estratégias</span>
          </div>
          <div onClick={() => navigate('/learn')} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center gap-2 active:scale-95 transition-transform cursor-pointer">
            <div className="bg-blue-50 text-blue-600 p-3 rounded-full">
                <ShieldCheck size={24} />
            </div>
            <span className="font-medium text-slate-700 text-sm">Checklists</span>
          </div>
          <div onClick={() => navigate('/chat')} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center gap-2 active:scale-95 transition-transform cursor-pointer col-span-2">
            <div className="flex items-center gap-3">
                <div className="bg-amber-50 text-amber-600 p-2 rounded-full">
                    <Zap size={20} />
                </div>
                <div className="text-left">
                    <span className="font-medium text-slate-700 text-sm block">Análise de Anúncios</span>
                    <span className="text-xs text-slate-400">Envie um print para a IA analisar</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Updates / News */}
      <div>
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-slate-800 font-bold text-base">Destaque KS-Tudo Digital</h3>
            <span className="text-xs text-indigo-600 font-medium">Ver tudo</span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex gap-4 items-center">
            <img src="https://picsum.photos/100/100?random=8" alt="Update" className="w-16 h-16 rounded-lg object-cover" />
            <div>
                <h4 className="font-bold text-slate-800 text-sm">Atualização do Algoritmo</h4>
                <p className="text-xs text-slate-500 mt-1">O que mudou no Instagram e como isso afeta seu engajamento esta semana.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;