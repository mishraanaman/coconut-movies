import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/v1/movies/movie/${id}`);
        
        if (!response.ok) {
          throw new Error('Movie not found');
        }
        
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-xl text-gray-600">Loading movie details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="text-xl text-red-600 mb-4">Error: {error}</div>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-xl text-gray-600">Movie not found</div>
      </div>
    );
  }

  const formatRuntime = (runtime) => {
    if (!runtime) return "N/A";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatReleaseDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          ← Back
        </button>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Movie Poster */}
            <div className="md:w-1/3 lg:w-1/4">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
                style={{ minHeight: '600px' }}
              />
            </div>

            {/* Movie Details */}
            <div className="md:w-2/3 lg:w-3/4 p-8">
              {/* Title and Year */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {movie.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span className="text-lg">{movie.year}</span>
                  <span>•</span>
                  <span>{movie.rated || "Not Rated"}</span>
                  <span>•</span>
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              </div>

              {/* Ratings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {movie.imdb && movie.imdb.rating && (
                  <div className="bg-yellow-100 px-4 py-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">IMDb Rating</div>
                    <div className="text-xl font-bold text-yellow-600">
                      {movie.imdb.rating}/10
                    </div>
                    {movie.imdb.votes && (
                      <div className="text-xs text-gray-500">
                        {movie.imdb.votes.toLocaleString()} votes
                      </div>
                    )}
                  </div>
                )}
                
                {movie.tomatoes && movie.tomatoes.viewer && movie.tomatoes.viewer.rating && (
                  <div className="bg-red-100 px-4 py-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">RT Critics</div>
                    <div className="text-xl font-bold text-red-600">
                      {movie.tomatoes.viewer.rating}/10
                    </div>
                    {movie.tomatoes.viewer?.numReviews && (
                      <div className="text-xs text-gray-500">
                        {movie.tomatoes.critic?.numReviews} reviews
                      </div>
                    )}
                  </div>
                )}

                {movie.tomatoes && movie.tomatoes.viewer && movie.tomatoes.viewer.rating && (
                  <div className="bg-orange-100 px-4 py-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">RT Audience</div>
                    <div className="text-xl font-bold text-orange-600">
                      {movie.tomatoes.viewer.rating}/5
                    </div>
                    {movie.tomatoes.viewer?.numReviews && (
                      <div className="text-xs text-gray-500">
                        {movie.tomatoes.viewer?.numReviews.toLocaleString()} reviews
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Plot */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Plot</h3>
                <p className="text-gray-700 leading-relaxed">
                  {movie.fullplot || movie.plot || "No plot available."}
                </p>
              </div>

              {/* Detailed Rotten Tomatoes Section */}
              {movie.tomatoes && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="text-red-600 mr-2">🍅</span>
                    Rotten Tomatoes Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {movie.tomatoes.critic && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Critics Consensus</h4>
                        {movie.tomatoes.critic.rating && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Rating:</span> {movie.tomatoes.critic.rating}/10
                          </p>
                        )}
                        {movie.tomatoes.critic?.numReviews && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Reviews:</span> {movie.tomatoes.critic?.numReviews}
                          </p>
                        )}
                        {movie.tomatoes.critic.meter && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Tomatometer:</span> {movie.tomatoes.critic.meter}%
                          </p>
                        )}
                      </div>
                    )}
                    
                    {movie.tomatoes.viewer && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Audience Score</h4>
                        {movie.tomatoes.viewer.rating && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Rating:</span> {movie.tomatoes.viewer.rating}/5
                          </p>
                        )}
                        {movie.tomatoes.viewer?.numReviews && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Reviews:</span> {movie.tomatoes.viewer?.numReviews.toLocaleString()}
                          </p>
                        )}
                        {movie.tomatoes.viewer.meter && (
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Audience Score:</span> {movie.tomatoes.viewer.meter}%
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {movie.tomatoes.consensus && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Critics Consensus</h4>
                      <p className="text-sm text-gray-600 italic">"{movie.tomatoes.consensus}"</p>
                    </div>
                  )}
                  
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                    {movie.tomatoes.fresh && (
                      <span><span className="font-medium">Fresh:</span> {movie.tomatoes.fresh}</span>
                    )}
                    {movie.tomatoes.rotten && (
                      <span><span className="font-medium">Rotten:</span> {movie.tomatoes.rotten}</span>
                    )}
                    {movie.tomatoes.lastUpdated && (
                      <span><span className="font-medium">Last Updated:</span> {new Date(movie.tomatoes.lastUpdated).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Directors */}
              {movie.directors && movie.directors.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Directors</h3>
                  <p className="text-gray-700">{movie.directors.join(", ")}</p>
                </div>
              )}

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Cast</h3>
                  <p className="text-gray-700">{movie.cast.slice(0, 8).join(", ")}</p>
                  {movie.cast.length > 8 && (
                    <span className="text-gray-500"> and {movie.cast.length - 8} more...</span>
                  )}
                </div>
              )}

              {/* Awards */}
              {movie.awards && movie.awards.text && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Awards</h3>
                  <p className="text-gray-700">{movie.awards.text}</p>
                </div>
              )}

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <h4 className="font-semibold text-gray-800">Release Date</h4>
                  <p className="text-gray-600">{formatReleaseDate(movie.released)}</p>
                </div>
                {movie.countries && movie.countries.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800">Countries</h4>
                    <p className="text-gray-600">{movie.countries.join(", ")}</p>
                  </div>
                )}
                {movie.languages && movie.languages.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800">Languages</h4>
                    <p className="text-gray-600">{movie.languages.join(", ")}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-800">Type</h4>
                  <p className="text-gray-600 capitalize">{movie.type || "Movie"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;