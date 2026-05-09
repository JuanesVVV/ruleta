import React, { useState, useRef, useEffect } from 'react';

interface Option {
  id: string;
  text: string;
}

const App: React.FC = () => {
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
  const [currentWinner, setCurrentWinner] = useState<string | null>(null);
  const [showResultBanner, setShowResultBanner] = useState(false);

  const colorPalette = ["#33DDFB", "#FFA502", "#2ED573", "#FF4757", "#FFD32A", "#FF6B81", "#FF9F43", "#54E1B3", "#1E90FF", "#3742FA"];
  const totalOptions = options.length;
  const segmentAngle = 360 / totalOptions;

  const spinRoulette = () => {
    if (isSpinning || totalOptions < 2) return;
    setIsSpinning(true);
    setShowResultBanner(false);
    setCurrentWinner(null);

    const extraDegrees = Math.floor(Math.random() * 360);
    const totalRotation = rotation + (360 * 8) + extraDegrees;
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const actualDegrees = totalRotation % 360;
      const winnerIndex = Math.floor(((360 - actualDegrees) % 360) / segmentAngle);
      setCurrentWinner(options[winnerIndex].text);
      setShowResultBanner(true);
    }, 4000);
  };

  const handleAddOption = () => {
    if (totalOptions >= 12) return;
    const newId = Date.now().toString();
    setOptions([...options, { id: newId, text: `NUEVA OPCIÓN` }]);
  };

  const handleRemoveOption = (idToRemove: string) => {
    if (totalOptions <= 2) return;
    setOptions(options.filter(opt => opt.id !== idToRemove));
  };

  const handleTextChange = (idToUpdate: string, newText: string) => {
    setOptions(options.map(opt => opt.id === idToUpdate ? { ...opt, text: newText.toUpperCase() } : opt));
  };

  return (
    <div style={styles.appContainer}>
      <header style={styles.mainTitle}>RULETA DE OPCIONES</header>
      
      <main style={styles.mainLayout}>
        {/* PANEL IZQUIERDO: CONFIGURACIÓN */}
        <div style={styles.configCard}>
          <div style={styles.configTitle}>CONFIGURACIÓN</div>
          <div style={styles.optionsList}>
            {options.map((opt, index) => (
              <div key={opt.id} style={styles.inputGroup}>
                <div style={{...styles.optionNumber, backgroundColor: colorPalette[index % colorPalette.length]}}>
                  {index + 1}
                </div>
                <input 
                  type="text"
                  value={opt.text}
                  onChange={(e) => handleTextChange(opt.id, e.target.value)}
                  style={styles.textInput}
                />
                <button onClick={() => handleRemoveOption(opt.id)} style={styles.deleteButton}>✕</button>
              </div>
            ))}
          </div>
          <div style={styles.actionButtons}>
            <button onClick={handleAddOption} style={styles.addButton}>+ AÑADIR</button>
          </div>
        </div>

        {/* PANEL DERECHO: RULETA SIN TEXTO */}
        <div style={styles.wheelSection}>
          <div style={styles.wheelWrapper}>
            <div style={styles.pointer}></div>
            <div style={{ ...styles.wheel, transform: `rotate(${rotation}deg)` }}>
              {options.map((_, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.segment,
                    backgroundColor: colorPalette[i % colorPalette.length],
                    transform: `rotate(${i * segmentAngle}deg)`,
                    clipPath: `polygon(0 0, 100% 0, 0 100%)`,
                  }}
                />
              ))}
              <div style={styles.wheelCenter}></div>
            </div>
          </div>

          <button onClick={spinRoulette} disabled={isSpinning} style={styles.spinButton}>
            {isSpinning ? 'GIRANDO...' : '¡GIRAR RULETA!'}
          </button>
        </div>
      </main>

      {/* BANNER DE RESULTADO */}
      {showResultBanner && (
        <div style={styles.resultBanner}>
          <div style={styles.resultContent}>¡EL GANADOR ES: {currentWinner}!</div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  appContainer: { minHeight: '100vh', backgroundColor: '#F8F9FA', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', fontFamily: 'sans-serif' },
  mainTitle: { fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', color: '#2D3436' },
  mainLayout: { display: 'flex', justifyContent: 'center', gap: '60px', width: '100%', maxWidth: '1100px' },
  configCard: { backgroundColor: '#fff', width: '350px', borderRadius: '15px', padding: '25px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' },
  configTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' },
  optionsList: { maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' },
  inputGroup: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' },
  optionNumber: { width: '30px', height: '30px', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' },
  textInput: { flex: 1, height: '35px', border: '1px solid #E0E0E0', borderRadius: '6px', padding: '0 10px' },
  deleteButton: { background: 'none', border: 'none', color: '#FF4757', cursor: 'pointer', fontSize: '18px' },
  addButton: { width: '100%', padding: '12px', backgroundColor: '#2D3436', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  wheelSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' },
  wheelWrapper: { position: 'relative', width: '400px', height: '400px' },
  pointer: { position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderTop: '40px solid #2D3436', zIndex: 10 },
  wheel: { width: '100%', height: '100%', borderRadius: '50%', position: 'relative', overflow: 'hidden', border: '8px solid #FFF', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', transition: 'transform 4s cubic-bezier(0.1, 0, 0.1, 1)' },
  segment: { position: 'absolute', width: '50%', height: '50%', left: '50%', top: '0', transformOrigin: '0% 100%' },
  wheelCenter: { position: 'absolute', width: '40px', height: '40px', backgroundColor: '#FFF', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 5 },
  spinButton: { padding: '15px 50px', fontSize: '20px', fontWeight: 'bold', color: '#FFF', backgroundColor: '#FF4757', border: 'none', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255, 71, 87, 0.3)' },
  resultBanner: { position: 'fixed', bottom: '50px', backgroundColor: '#2D3436', padding: '20px 60px', borderRadius: '12px', color: '#FFF', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' },
  resultContent: { fontSize: '24px', fontWeight: 'bold' }
};

export default App;