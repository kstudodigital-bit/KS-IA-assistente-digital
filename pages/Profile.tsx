import React from 'react';
import { User, Settings, HelpCircle, Phone, LogOut, ChevronRight, Star } from 'lucide-react';

const Profile: React.FC = () => {
  const whatsappNumber = "62999482529";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá, vim pelo app KS IA Assistente e gostaria de falar com um especialista.`;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Perfil</h1>

      {/* User Info Card */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
            <User size={32} className="text-slate-400" />
        </div>
        <div>
            <h2 className="font-bold text-slate-900">Cliente VIP</h2>
            <p className="text-sm text-slate-500">Plano Business</p>
        </div>
      </div>

      {/* Agency Services CTA */}
      <div className="bg-slate-900 rounded-xl p-6 text-white mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
        <div className="relative z-10">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
                KS-Tudo Digital
            </h3>
            <p className="text-slate-300 text-sm mb-4">Precisa de uma gestão de tráfego profissional ou um novo site?</p>
            <a 
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-green-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
                <Phone size={18} />
                Falar no WhatsApp
            </a>
        </div>
      </div>

      {/* Settings List */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Configurações</h3>
        
        <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group active:bg-slate-50">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Settings size={18} />
                </div>
                <span className="text-sm font-medium text-slate-700">Preferências do App</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
        </button>

        <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group active:bg-slate-50">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <HelpCircle size={18} />
                </div>
                <span className="text-sm font-medium text-slate-700">FAQ - Perguntas Frequentes</span>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
        </button>

         <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group active:bg-slate-50 text-red-500">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-red-50 rounded-lg">
                    <LogOut size={18} />
                </div>
                <span className="text-sm font-medium">Sair da conta</span>
            </div>
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-slate-400">Versão 1.0.0</p>
        <p className="text-[10px] text-slate-300 mt-1">Desenvolvido por KS-Tudo Digital</p>
      </div>
    </div>
  );
};

export default Profile;