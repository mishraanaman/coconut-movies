import { useState, useEffect } from "react";

const Theaters = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle"); // idle, requesting, granted, denied

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setLocationStatus("requesting");
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setLocationStatus("granted");
        fetchNearestTheaters(longitude, latitude);
      },
      (error) => {
        setLocationStatus("denied");
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Location access denied by user.");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setError("Location request timed out.");
            break;
          default:
            setError("An unknown error occurred while retrieving location.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const fetchNearestTheaters = async (longitude, latitude) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3000/v1/theaters/nearest?longitude=${longitude}&latitude=${latitude}&maxDistance=10000&limit=20`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setTheaters(data.data);
      } else {
        setError(data.error || "Failed to fetch theaters");
      }
    } catch (err) {
      console.error("Error fetching theaters:", err);
      setError("Failed to fetch nearby theaters. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const TheaterCard = ({ theater }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          Theater #{theater.theaterId}
        </h3>
        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {theater.distance} km away
        </span>
      </div>
      
      {theater.location?.address && (
        <div className="text-gray-600 text-sm mb-2">
          <p>{theater.location.address.street1}</p>
          <p>
            {theater.location.address.city}
            {theater.location.address.state && `, ${theater.location.address.state}`}
            {theater.location.address.zipcode && ` ${theater.location.address.zipcode}`}
          </p>
        </div>
      )}
      
      {theater.location?.geo?.coordinates && (
        <div className="text-xs text-gray-500">
          Coordinates: {theater.location.geo.coordinates[1].toFixed(4)}, {theater.location.geo.coordinates[0].toFixed(4)}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Nearby Theaters</h1>
          <p className="text-gray-600 mb-6">
            Discover movie theaters near your location
          </p>
          
          {locationStatus === "idle" && (
            <button
              onClick={requestLocation}
              className="bg-[#00684A] hover:bg-[#005a3f] text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              📍 Find Theaters Near Me
            </button>
          )}
          
          {locationStatus === "requesting" && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00684A]"></div>
              <span className="ml-2 text-gray-600">Getting your location...</span>
            </div>
          )}
          
          {locationStatus === "granted" && userLocation && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
              ✅ Location found: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            ❌ {error}
            {locationStatus === "denied" && (
              <div className="mt-2 text-sm">
                <p>To use this feature, please:</p>
                <ul className="list-disc list-inside mt-1">
                  <li>Allow location access in your browser</li>
                  <li>Make sure location services are enabled</li>
                  <li>Try refreshing the page and clicking the button again</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00684A]"></div>
            <span className="ml-3 text-gray-600 text-lg">Loading nearby theaters...</span>
          </div>
        )}

        {theaters.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Nearby Theaters ({theaters.length} found)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {theaters.map((theater) => (
                <TheaterCard key={theater._id || theater.theaterId} theater={theater} />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && theaters.length === 0 && locationStatus === "granted" && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              🎭 No theaters found in your area
            </div>
            <p className="text-gray-400 mt-2">
              Try increasing the search radius or check back later.
            </p>
          </div>
        )}

        {locationStatus === "idle" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">How it works:</h3>
            <ul className="text-blue-800 space-y-1">
              <li>• Click "Find Theaters Near Me" to share your location</li>
              <li>• We'll search for theaters within 10km of your location</li>
              <li>• Results are sorted by distance from nearest to farthest</li>
              <li>• Your location data is only used for this search and not stored</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Theaters;