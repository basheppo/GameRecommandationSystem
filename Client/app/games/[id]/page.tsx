"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import apiRoutes from "@/utils/apiRoutes";
import { Game } from "@/utils/schemas";
import Image from "next/image";

export default function GamePage() {
  const { id } = useParams(); 

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Game[]>([]);

  useEffect(() => {
    if (!id || Array.isArray(id)) {
      setError("Invalid game ID");
      return; 
    }

    const gameId = Number(id);

    if (isNaN(gameId)) {
      setError("Invalid game ID");
      return;
    }

    async function fetchGameData() {
      try {
        setLoading(true);

        const [gameResponse, recResponse] = await Promise.all([
          fetch(apiRoutes.gameDetails(gameId)), 
          fetch(apiRoutes.gameRecommendations(gameId)), 
        ]);

        if (!gameResponse.ok) {
          throw new Error(
            `Failed to fetch game details: ${gameResponse.statusText}`
          );
        }
        const gameData: Game = await gameResponse.json();
        setGame(gameData);

        if (!recResponse.ok) {
          throw new Error(
            `Failed to fetch game recommendations: ${recResponse.statusText}`
          );
        }
        const recommendationsData: Game[] = await recResponse.json();
        setRecommendations(recommendationsData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchGameData();
  }, [id]); // Re-fetch when id changes

  if (loading) {
    return <div>Loading game details and recommendations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!game) {
    return <div>No game details available.</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold">{game.name}</h1>
      <Image
        width={500}
        height={300}
        src={game.header_image}
        alt={game.name}
        className="w-full max-h-96 object-cover mt-5"
      />
      <p className="mt-5 text-lg">{game.short_description}</p>
      <p className="mt-3 text-lg">Genres: {game.genres}</p>
      <p className="mt-3 text-lg">
        Ratings: {game.positive_ratings} Positive / {game.negative_ratings}{" "}
        Negative
      </p>
      <p className="mt-3 text-lg">
        Price: {game.price === 0 ? "Free" : `${game.price}$`}
      </p>

      <div>
        <h2 className="text-2xl mt-6">Best Recommendations</h2>

        {recommendations.length === 0 ? (
          <p>No recommendations available.</p>
        ) : (
          <ul>
            {recommendations.map((rec) => (
              <li key={rec.appid} className="mt-4">
                <div className="border p-4 rounded-md">
                  <div className="flex">
                    {rec.header_image && (
                      <Image
                        src={rec.header_image}
                        alt={rec.name}
                        width={150}
                        height={100}
                        className="object-cover rounded-md"
                      />
                    )}

                    <div className="ml-4">
                      <h3 className="font-semibold text-xl">{rec.name}</h3>
                      <p className="text-lg">{rec.short_description}</p>
                      <p className="mt-2">Genres: {rec.genres}</p>
                      <p className="mt-2">
                        Price: {rec.price === 0 ? "Free" : `${rec.price}$`}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
