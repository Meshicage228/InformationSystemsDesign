import React, { useState, useEffect } from 'react';
import './style.css';

const Poetry = () => {
  const [currentPoem, setCurrentPoem] = useState(null);
  const [showAuthorOnly, setShowAuthorOnly] = useState(true);

  useEffect(() => {
    fetch('/api/poems')
      .then(res => res.json())
      .then(data => setPoems(data))
      .catch(err => console.error(err));
  }, []);

  const showNextPoem = () => {
    fetch('/api/poems/next')
      .then(res => res.json())
      .then(data => {
        setCurrentPoem(data);
        setShowAuthorOnly(false);
      });
  };

  return (
    <div className="poetry-container">
      {currentPoem ? (
        <>
          <h2 className="poet-name">{currentPoem.author}</h2>
          {!showAuthorOnly && (
            <div className="poem-text">
              {currentPoem.text.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </>
      ) : (
        <p>Загрузка стихов...</p>
      )}
      
      <button 
        className="next-poem-btn"
        onClick={showNextPoem}
      >
        Показать следующее стихотворение
      </button>
    </div>
  );
};

export default Poetry;