//const BASE_URL = process.env.NEXT_PUBLIC_API_URL ;
const BASE_URL = "http://localhost:8000";
const apiRoutes = {
  topRatedGames: `${BASE_URL}/games/top-rated`,
  gameDetails: (id: number | string) => `${BASE_URL}/games/${id}`,
  searchGames: (query: string) =>
    `${BASE_URL}/games/search?${new URLSearchParams({ query })}`,
  gameRecommendations: (id: number | string) =>
    `${BASE_URL}/games/recommand/${id}`,
};



export default apiRoutes;
