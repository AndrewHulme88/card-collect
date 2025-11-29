import React, { useEffect, useState } from "react";
import axios from "axios";
import type { PokemonCard } from "../types/types";

interface CardListProps {
  setId: string;
}

const CardList: React.FC<CardListProps> = ({ setId }) => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;

  const fetchCards = async (pageNumber: number) => {
    setLoading(true);
    try {
        const res = await axios.get(
            `https://api.pokemontcg.io/v2/cards?q=set.id:${setId}&page=${pageNumber}&pageSize=${pageSize}`
        );
        setCards((prevCards) => [...prevCards, ...res.data.data]);
        setTotalCount(res.data.totalCount);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards(page);
  }, [setId, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !loading &&
        page < Math.ceil(totalCount / pageSize)
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, totalCount]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="shadow rounded p-2 bg-white">
            <img
              src={card.images.small}
              alt={card.name}
              loading="lazy"
              className="w-full rounded"
            />
            <p className="text-center mt-2">{card.name}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};


export default CardList;
