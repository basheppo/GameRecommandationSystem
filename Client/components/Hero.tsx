"use client";

import React, { useState } from "react";
import apiRoutes from "@/utils/apiRoutes";
import Link from "next/link";
import { Game } from "@/utils/schemas";
import Image from "next/image";

export default function Hero() {
  const [results, setResults] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;


    if (!query) {
      setResults([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(apiRoutes.searchGames(query));

      //console.log("API response status:", response.status); 

      if (!response.ok) {
        throw new Error(`Error fetching games: ${response.statusText}`);
      }

      const data: Game[] = await response.json();

      // console.log("Fetched data:", data);
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch games:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative w-full mb-[10rem] container mx-auto px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mt-20">
          Discover Your Next Adventure!
        </h1>
        <h2 className="text-2xl mt-4">
          Personalized game recommendations tailored to your style.
        </h2>
        <div className="pt-8 max-w-2xl mx-auto">
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Search for games..."
            className="w-full p-4 rounded-lg border text-black"
          />
        </div>

        {isLoading && <div className="mt-4">Loading...</div>}

        {error && <div className="mt-4 text-red-500">{error}</div>}

        {results.length === 0 && !isLoading && !error && (
          <div className="mt-4 text-gray-500">No games found.</div>
        )}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((game) => (
            <div
              key={game.appid}
              className="border-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <h3 className="p-2 text-lg font-semibold">{game.name}</h3>
              <Link href={`/games/${game.appid}`}>
                <div className="relative aspect-video">
                  <Image
                    fill
                    src={game.header_image}
                    alt={game.name}
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="p-4 text-center">
                <span className="text-2xl text-white border-2 px-4 py-2 rounded-md inline-block">
                  {game.price === 0 ? "Free" : `$${game.price}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
