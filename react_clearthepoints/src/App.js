import React, { useState, useEffect } from 'react';
import './App.css';

const getRandomPoint = (width, height) => ({
  x: Math.random() * width,
  y: Math.random() * height,
});

function App() {
  const [n, setN] = useState(0);
  const [points, setPoints] = useState([]);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted && currentPointIndex === 0) {
      setStartTime(Date.now());
    }
  }, [currentPointIndex, gameStarted]);

  const handleGeneratePoints = () => {
    const newPoints = Array.from({ length: n }, () => getRandomPoint(800, 600));
    setPoints(newPoints);
    setCurrentPointIndex(0);
    setTimeTaken(null);
    setGameStarted(true);
  };

  const handlePointClick = (index) => {
    if (index === currentPointIndex) {
      setCurrentPointIndex(currentPointIndex + 1);
      if (currentPointIndex + 1 === n) {
        const endTime = Date.now();
        setTimeTaken((endTime - startTime) / 1000);
        setGameStarted(false);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Clear the points game</h1>
      <input
        type="number"
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
        placeholder="Enter number"
      />
      <button onClick={handleGeneratePoints}>Start</button>
      <div style={{ position: 'relative', width: '800px', height: '600px', border: '1px solid black', margin: '20px auto' }}>
        {points.map((point, index) => (
          <div
            key={index}
            onClick={() => handlePointClick(index)}
            style={{
              position: 'absolute',
              left: point.x,
              top: point.y,
              width: '10px',
              height: '10px',
              backgroundColor: currentPointIndex === index ? 'red' : 'blue',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
      {timeTaken !== null && (
        <h2>Clear all in {timeTaken}s!</h2>
      )}
    </div>
  );
}

export default App;
