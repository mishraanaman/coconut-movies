
const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#001E2B]">About Mongo Mflix</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            Mongo Mflix is a movie and TV show discovery platform that leverages the power of 
            MongoDB Atlas for its backend database. Our platform allows users to search, explore, 
            and find detailed information about a vast collection of movies and TV shows.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-[#00684A]">Our Mission</h2>
              <p className="text-gray-600">
                To provide movie enthusiasts with a comprehensive platform to discover, 
                search, and explore movies and TV shows from around the world.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-[#00684A]">Technology</h2>
              <p className="text-gray-600">
                Built with cutting-edge technology including MongoDB Atlas, React, and Express.js 
                to deliver a seamless user experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;