// src/pages/CardSetPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Card {
  id: string;
  name: string;
  imageUrl: string;
}

const CardSet: React.FC = () => {
  const { setId } = useParams<{ setId: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`);
        const data = await res.json();
        setCards(data.data);
      } catch (err) {
        console.error('Failed to fetch cards:', err);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [setId]);

  return (
    <div>
      <h1>Cards from Set: {setId}</h1>
      {loading ? (
        <p>Loading cards...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {cards.map((card) => (
            <div key={card.id} style={{ width: '150px' }}>
              <img src={card.imageUrl} alt={card.name} style={{ width: '100%' }} />
              <p>{card.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardSet;
