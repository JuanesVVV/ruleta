'use client';

import React, { useState, useEffect } from 'react';

interface Option {
  id: string;
  text: string;
}

const COLOR_PALETTE = [
  "#33DDFB", "#FFA502", "#2ED573", "#FF4757", "#FFD32A", 
  "#FF6B81", "#FF9F43", "#54E1B3", "#1E90FF", "#3742FA"
];

export default function Roulette() {
  const [options, setOptions] = useState<Option[]>([
    { id: '1', text: "COMIDA" },
    { id: '2', text: "CINE" },
    { id: '3', text: "PLAYA" },
    { id: '4', text: "DEPORTE" },
    { id: '5', text: "MÚSICA" },
    { id: '6', text: "LECTURA" },
    { id: '7', text: "JUEGOS" },
    { id: '8', text: "VIAJE" },
    { id: '9', text: "DORMIR" },
    { id: '10', text: "MUSEO" },
  ]);

  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  const segmentAngle = 360 / options.length;

  const spin = () => {
    if (isSpinning || options.length < 2) return;
    
    setIsSpinning(true);
    setWinner(null);
    setShowBanner(false);

    const randomExtra = Math.floor(Math.random() * 360);
    const totalRotation = rotation + (360 * 8) + randomExtra;
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const actualDegrees = totalRotation % 360;
      const winnerIndex = Math.floor(((360 - actualDegrees) % 360) / segmentAngle);
      setWinner(options[winnerIndex].text);
      setShowBanner(true);
    }, 4000);
  };

  const handleUpdate = (id: string, val: string) => {
    setOptions(options.map(o => o.id === id ? { ...o, text: val.toUpperCase() } : o));
  };

  const handleAdd = () => {
    if (options.length < 12) {
      setOptions([...options, { id: Date.now().toString(), text: `NUEVA OPCIÓN` }]);
    }
  };

  const handleRemove = (id: string) => {
    if (options.length > 2) setOptions(options.filter(o => o.id !== id));
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-12 w-full max-w-6xl">
      
      {/* PANEL DE MODIFICACIÓN (IZQUIERDA) */}
      <div className="w-full lg:w-[400px] bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-1">MODIFICAR OPCIONES</h2>
        <p className="text-xs text-gray-400 mb-6 font-semibold uppercase tracking-wider">Editar tus opciones</p>
        
        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
          {options.map((opt, i) => (
            <div key={opt.id} className="flex items-center gap-2">
              <div className="w-8 h-9 flex items-center justify-center bg-gray-500 text-white font-bold rounded text-sm shrink-0">
                {i + 1}
              </div>
              <input
                className="flex-1 h-9 border border-gray-200 rounded px-3 text-sm focus:border-blue-400 outline-none transition-all font-medium"
                value={opt.text}
                onChange={(e) => handleUpdate(opt.id, e.target.value)}
              />
              <button 
                onClick={() => handleRemove(opt.id)}
                className="w-9 h-9 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >✕</button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-6">
          <button onClick={handleAdd} className="flex-1 py-3 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all">
            + AÑADIR OPCIÓN
          </button>
          <button className="flex-1 py-3 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-all">
            ✓ GUARDAR CAMBIOS
          </button>
        </div>
      </div>

      {/* RULETA (DERECHA) */}
      <div className="flex flex-col items-center flex-1">
        <div className="relative w-[350px] h-[350px] md:w-[480px] md:h-[480px]">
          {/* Puntero Blanco */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 drop-shadow-md">
            <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[50px] border-t-white" />
          </div>

          {/* El Disco */}
          <div 
            className="w-full h-full rounded-full border-[12px] border-white shadow-[0_15px_50px_rgba(0,0,0,0.15)] relative overflow-hidden transition-transform duration-[4000ms] ease-[cubic-bezier(0.1,0,0.1,1)]"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {options.map((_, i) => (
              <div
                key={i}
                className="absolute w-1/2 h-1/2 top-0 left-1/2 origin-[0%_100%]"
                style={{
                  backgroundColor: COLOR_PALETTE[i % COLOR_PALETTE.length],
                  transform: `rotate(${i * segmentAngle}deg)`,
                  clipPath: `polygon(0 0, 100% 0, 0 100%)`,
                }}
              />
            ))}
            {/* Eje Central */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full z-10 shadow-sm" />
          </div>
        </div>

        <button
          onClick={spin}
          disabled={isSpinning}
          className="mt-12 px-16 py-4 bg-[#D32F2F] text-white font-black text-xl rounded-full shadow-xl hover:bg-red-700 active:scale-95 transition-all disabled:bg-gray-300 disabled:scale-100"
        >
          {isSpinning ? 'GIRANDO...' : '¡GIRAR RULETA!'}
        </button>

        {/* BANNER GANADOR */}
        <div className={`mt-10 transition-all duration-500 transform ${showBanner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {winner && (
            <div className="bg-white px-12 py-5 rounded-lg shadow-2xl border border-gray-100 text-center">
              <h3 className="text-3xl font-black text-[#27AE60] tracking-tight">
                ¡GANÓ LA OPCIÓN: '{winner}'!
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}