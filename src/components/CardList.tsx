import React, { useEffect, useState } from "react";
import axios from "axios";
import type { PokemonCard } from "../types/types";
import '../styles/CardList.css';

interface CardListProps {
  setId: string;
}

const CardList: React.FC<CardListProps> = ({ setId }) => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 100;

  const fetchCards = async (pageNumber: number) => {
  const cacheKey = `cards-${setId}-page-${pageNumber}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    console.log("Cached Data:", parsedData); // Log cached data
    setCards((prevCards) => {
      const uniqueCards = [...prevCards, ...parsedData].filter(
        (card, index, self) =>
          index === self.findIndex((c) => c.id === card.id)
      );
      return uniqueCards;
    });
    setLoading(false);
    return;
  }

  setLoading(true);
  try {
    const res = await axios.get(
      `https://api.pokemontcg.io/v2/cards?q=set.id:${setId}&page=${pageNumber}&pageSize=${pageSize}&fields=id,name,images`
    );
    console.log("Fetched Data:", res.data.data); // Log fetched data
    const fetchedData = res.data.data;
    localStorage.setItem(cacheKey, JSON.stringify(fetchedData));
    setCards((prevCards) => {
      const uniqueCards = [...prevCards, ...fetchedData].filter(
        (card, index, self) =>
          index === self.findIndex((c) => c.id === card.id)
      );
      return uniqueCards;
    });
    setTotalCount(res.data.totalCount);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  // Fetch cards when setId or page changes
  useEffect(() => {
    fetchCards(page);
  }, [setId, page]);

  // Clear cache when setId changes
  useEffect(() => {
    try {
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith("cards-") && !key.includes(setId)) {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error("Error cleaning cache:", error);
    }
  }, [setId]);

  // Infinite scrolling logic
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
      <div className="card-grid">
        {cards.map((card, index) => (
          <div key={`${card.id}-${index}`} className="card-item">
            <img
              src={card.images.small}
              alt={card.name}
              loading="lazy"
              className="card-image"
            />
            <p className="card-name">{card.name}</p>
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
