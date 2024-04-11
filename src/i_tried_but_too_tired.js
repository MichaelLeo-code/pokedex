import React, { useState } from 'react';

const Card = ({ id, onClick }) => {
  return <div className="gpt-card" onClick={() => onClick(id)}>Card {id}</div>;
};

const App = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClick = (id) => {
    setSelectedCard(id);
  };

  const calculatePosition = (cardIndex) => {
    const screenWidth = window.innerWidth;
    const cardWidth = 150; // Adjust according to your card width
    const padding = 20; // Adjust according to your layout padding
    const totalCards = 5; // Adjust according to the number of cards

    const offset = padding * (cardIndex*2 + 1) + cardWidth * cardIndex;

    return offset;
  };

  return (
    <div className="container">
      {[...Array(5)].map((_, index) => (
        <Card key={index} id={index} onClick={handleClick} />
      ))}
      {selectedCard !== null && (
        <div
          className="selected-card"
          style={{
            left: `${calculatePosition(selectedCard)}px`,
          }}
        >
          Selected Card {selectedCard}
        </div>
      )}
    </div>
  );
};

export default App;
