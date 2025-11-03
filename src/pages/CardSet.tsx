import { useParams } from 'react-router-dom';
import React from 'react';

const CardSet: React.FC = () => {
  const { setId } = useParams(); 

  return (
    <div>
      <h1>Cards from Set: {setId}</h1>
      {/* Render cards here */}
    </div>
  );
};

export default CardSet;
