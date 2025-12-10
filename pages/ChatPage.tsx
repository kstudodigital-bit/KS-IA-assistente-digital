import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Mic, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Sou o KS IA Assistente. Como posso ajudar sua estratégia de marketing hoje? \n\nPosso ajudar com:\n* Ideias de conteúdo\n* Análise de métricas\n* Estrutura de campanhas\n* Copywriting',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!inputText.trim() && !selectedImage) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      image: selectedImage || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMessage.text || "Analise esta imagem", userMessage.image);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Chat Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            KS
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-sm">KS IA Assistente</h2>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wide">Online 24h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
              }`}
            >
              {msg.image && (
                <img 
                  src={msg.image} 
                  alt="User upload" 
                  className="w-full h-auto rounded-lg mb-2 border border-white/20"
                />
              )}
              <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-headings:text-inherit text-inherit prose-li:text-inherit prose-strong:text-inherit">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
              <div className={`text-[10px] mt-1 opacity-70 text-right ${msg.role === 'user' ? 'text-indigo-100' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 p-3 z-20">
        {selectedImage && (
            <div className="flex items-center gap-2 mb-2 p-2 bg-slate-50 rounded-lg border border-slate-200 inline-flex">
                <span className="text-xs text-slate-500 truncate max-w-[150px]">Imagem selecionada</span>
                <button onClick={() => setSelectedImage(null)} className="text-slate-400 hover:text-red-500">
                    <X size={14} />
                </button>
            </div>
        )}
        <div className="flex items-end gap-2">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition-colors mb-1"
          >
            <ImageIcon size={22} />
          </button>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageSelect}
          />
          
          <div className="flex-1 bg-slate-100 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-200 transition-shadow">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Digite sua dúvida..."
              className="w-full bg-transparent border-none focus:ring-0 outline-none text-sm text-slate-800 resize-none max-h-24 py-1"
              rows={1}
              style={{ minHeight: '24px' }}
            />
          </div>

          {inputText || selectedImage ? (
             <button
                onClick={handleSend}
                disabled={isLoading}
                className="p-3 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 transition-all mb-0.5"
           >
             <Send size={18} />
           </button>
          ) : (
            <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition-colors mb-0.5">
                <Mic size={22} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;