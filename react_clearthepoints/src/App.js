import React, { useState, useEffect } from 'react';
import './App.css';

const getRandomPoint = (width, height) => ({
  x: Math.random() * (width - 50),
  y: Math.random() * (height - 50),
});

function App() {
  const [n, setN] = useState(0);
  const [points, setPoints] = useState([]);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let timer;
    if (gameStarted) {
      setStartTime(Date.now());
      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [gameStarted, startTime]);

  const handleGeneratePoints = () => {
    const newPoints = Array.from({ length: n }, (_, index) => ({
      ...getRandomPoint(800, 600),
      index,
      visible: true,
      clicked: false,
    }));
    setPoints(newPoints);
    setCurrentPointIndex(0);
    setElapsedTime(0);
    setGameStarted(true);
    setGameOver(false);
  };

  const handlePointClick = (index) => {
    if (index === currentPointIndex) {
      setPoints((prevPoints) => {
        const updatedPoints = [...prevPoints];
        updatedPoints[index].clicked = true;
        return updatedPoints;
      });

      setTimeout(() => {
        setPoints((prevPoints) => {
          const updatedPoints = [...prevPoints];
          updatedPoints[index].visible = false;
          return updatedPoints;
        });
      }, 500);

      setCurrentPointIndex(currentPointIndex + 1);

      if (currentPointIndex + 1 === n) {
        setGameStarted(false);
      }
    } else {
      setGameOver(true);
      setGameStarted(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Clear the Points Game</h1>
      <input
        type="number"
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
        placeholder="Enter number"
      />
      <button onClick={handleGeneratePoints}>Start</button>
      {gameStarted && (
        <h2>Elapsed Time: {(elapsedTime / 1000).toFixed(2)} seconds</h2>
      )}
      {gameOver && <h2>Game Over!</h2>}
      <div style={{ position: 'relative', width: '800px', height: '600px', border: '1px solid black', margin: '20px auto' }}>
        {points.map((point, index) => (
          point.visible && (
            <div
              key={index}
              onClick={() => handlePointClick(index)}
              style={{
                position: 'absolute',
                left: point.x,
                top: point.y,
                width: '50px',
                height: '50px',
                backgroundColor: point.clicked ? 'red' : 'white',
                borderRadius: '50%',
                border: '2px solid black',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'background-color 0.3s',
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              {index + 1}
            </div>
          )
        ))}
      </div>
      {!gameStarted && !gameOver && currentPointIndex === n && (
        <h2>All cleared in {(elapsedTime / 1000).toFixed(2)} seconds!</h2>
      )}
    </div>
  );
}

export default App;
