import { useState, useEffect } from "react";
import Movie from "./Movie";

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchShows();
  }, [page]);

  const fetchShows = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/v1/movies/shows?page=${page}&limit=20`);
      if (!response.ok) {
        throw new Error('Failed to fetch shows');
      }
      const data = await response.json();
      
      if (page === 1) {
        setShows(data);
      } else {
        setShows(prev => [...prev, ...data]);
      }
      setError("");
    } catch (err) {
      console.error("Error fetching shows:", err);
      setError("Failed to load shows. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl">Loading shows...</div>
      </div>
    );
  }

  if (error && shows.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#001E2B]">TV Shows & Series</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {shows.map((show) => (
          <Movie key={show._id} movie={show} />
        ))}
      </div>

      {shows.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-[#00684A] hover:bg-[#023430] text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More Shows"}
          </button>
        </div>
      )}

      {error && shows.length > 0 && (
        <div className="text-center mt-4 text-red-500">{error}</div>
      )}
    </div>
  );
};

export default Shows;