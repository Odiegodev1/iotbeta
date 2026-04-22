"use client";

import { useState, useEffect } from "react";
import { Power, Activity, Zap, ZapOff, Settings2, Radio, Cpu, Smartphone } from "lucide-react";

export default function RelayDashboard() {
  const [data, setData] = useState({
    status: "desligado",
    modo: "manual",
    distancia: 10,
  });
  const [loading, setLoading] = useState(false);
  const [isMounting, setIsMounting] = useState(true);

  // Busca dados iniciais do Prisma
  useEffect(() => {
    fetch("/api/rele")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setIsMounting(false);
      });
  }, []);

  const updateHardware = async (newData: Partial<typeof data>) => {
    setLoading(true);
    const updated = { ...data, ...newData };
    
    try {
      const res = await fetch("/api/rele", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Falha na sincronização:", error);
    } finally {
      setLoading(false);
    }
  };

  const isOn = data.status === "ligado";
  const isAuto = data.modo === "automatico";

  if (isMounting) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500 font-mono">CONNECTING TO CORE...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-8 font-sans overflow-hidden">
      {/* Background Glow dinâmico */}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-1000 -z-10 ${isOn ? 'bg-amber-500/10' : 'bg-blue-500/5'}`} />

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LADO ESQUERDO: Controle Principal */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl relative">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Cpu className="text-amber-500 w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight">Relay Controller</h1>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Node ID: Saquarema-01</p>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black ${isOn ? 'border-amber-500/50 text-amber-500 bg-amber-500/5' : 'border-slate-700 text-slate-500'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isOn ? 'bg-amber-500 animate-pulse' : 'bg-slate-600'}`} />
                {isOn ? 'SYSTEM LIVE' : 'SYSTEM IDLE'}
              </div>
            </div>

            <div className="flex flex-col items-center py-10">
              <button 
                onClick={() => updateHardware({ status: isOn ? "desligado" : "ligado" })}
                disabled={loading || isAuto}
                className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl active:scale-95 ${
                  isAuto ? 'opacity-30 cursor-not-allowed' : ''
                } ${isOn ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}
              >
                {isOn && <div className="absolute inset-0 rounded-full bg-amber-500 blur-2xl opacity-40 animate-pulse" />}
                <Power size={64} strokeWidth={2.5} className="relative z-10" />
              </button>
              <p className={`mt-8 font-mono text-sm tracking-[0.3em] uppercase ${isOn ? 'text-amber-500 font-bold' : 'text-slate-600'}`}>
                {isOn ? 'Energizado' : 'Desconectado'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-800/50">
              <div className="text-center">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Voltagem</p>
                <p className="font-mono text-lg text-white">220V AC</p>
              </div>
              <div className="text-center border-l border-slate-800/50">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Latência</p>
                <p className="font-mono text-lg text-white">{loading ? '--' : '14ms'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* LADO DIREITO: Automação e Sensor */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <Settings2 className="text-slate-400 w-5 h-5" />
                <h2 className="font-bold text-sm tracking-widest uppercase text-slate-300">Automação</h2>
              </div>
              <button 
                onClick={() => updateHardware({ modo: isAuto ? "manual" : "automatico" })}
                className={`w-14 h-7 rounded-full transition-all relative ${isAuto ? 'bg-blue-600' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${isAuto ? 'left-8' : 'left-1'}`} />
              </button>
            </div>

            <div className="space-y-10">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-800" />
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="6" fill="transparent" 
                      strokeDasharray={377} strokeDashoffset={377 - (data.distancia / 100) * 377}
                      className="text-blue-500 transition-all duration-700" 
                    />
                  </svg>
                  <Radio className={`w-8 h-8 ${isAuto ? 'text-blue-400 animate-pulse' : 'text-slate-600'}`} />
                </div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Sensor HC-SR04</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Distância Limite</label>
                  <span className="text-blue-400 font-mono text-xl font-bold">{data.distancia}cm</span>
                </div>
                <input 
                  type="range" min="2" max="100" value={data.distancia}
                  onChange={(e) => setData({ ...data, distancia: Number(e.target.value) })}
                  onMouseUp={() => updateHardware({ distancia: data.distancia })}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 text-[11px] text-slate-500 leading-relaxed italic text-center">
                  {isAuto 
                    ? `O relé ligará automaticamente quando o sensor detectar algo a menos de ${data.distancia}cm.` 
                    : "Modo manual ativado. O sensor está apenas monitorando a distância."}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-amber-600/20 border border-white/5 rounded-3xl p-6 flex items-center gap-4">
             <Smartphone className="text-white/50" />
             <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
               Interface otimizada para controle via Mobile em <span className="text-white">Saquarema, RJ</span>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}