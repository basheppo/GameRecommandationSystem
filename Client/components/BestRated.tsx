import React from "react";
import apiRoutes from "@/utils/apiRoutes";
import Link from "next/link";
import { Game } from "@/utils/schemas";
import Image from "next/image";

async function getTopRatedGames() {
  try {
    const response = await fetch(apiRoutes.topRatedGames, {
      next: { revalidate: 3600 }, 
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch top rated games: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching top rated games:", error);
    return [];
  }
}

export default async function BestRated() {
  const data: Game[] = await getTopRatedGames();

  if (!data.length) {
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-5xl mt-20">Top Rated</h1>
        <p className="mt-4">No games available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-5xl mt-20">Top Rated</h1>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((game) => (
          <div
            key={game.appid}
            className="border-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <h3 className="text-center p-2 text-lg font-semibold">
              {game.name}
            </h3>
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
  );
}

