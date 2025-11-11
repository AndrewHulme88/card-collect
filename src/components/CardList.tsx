import React, { useEffect, useState } from "react";
import axios from "axios";
import type { PokemonCard } from "../types/types";

interface CardListProps {
  setId: string;
}

const CardList: React.FC<CardListProps> = ({ setId }) => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await axios.get(`https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`);
        setCards(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [setId]);

  if (loading) return <p>Loading cards...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {cards.map((card) => (
        <div key={card.id} className="shadow rounded p-2 bg-white">
          <img src={card.images.small} alt={card.name} className="w-full rounded" />
          <p className="text-center mt-2">{card.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CardList;
