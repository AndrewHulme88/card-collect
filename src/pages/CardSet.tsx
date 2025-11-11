import React, { useEffect, useState } from 'react';
import CardList from '../components/CardList';

const CardSet: React.FC = () => {


  return (
    <div>
      <h1>Pokémon Card Viewer</h1>
      <CardList setId="swsh12" />
    </div>
  );
};

export default CardSet;
