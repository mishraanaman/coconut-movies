const getNearestTheaters = async (req, res) => {
  try {
    const { longitude, latitude, limit } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({ 
        error: 'Longitude and latitude are required' 
      });
    }

    // Validate coordinates
    const lng = parseFloat(longitude);
    const lat = parseFloat(latitude);

    if (isNaN(lng) || isNaN(lat)) {
      return res.status(400).json({ 
        error: 'Invalid longitude or latitude values' 
      });
    }

    if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
      return res.status(400).json({ 
        error: 'Longitude must be between -180 and 180, latitude must be between -90 and 90' 
      });
    }

    // Get theaters collection and perform geospatial query
    const collection = req.app.locals.moviesDB.collection('theaters');
    
    const theaters = await collection.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          distanceField: 'distance',
          spherical: true
        }
      },
      {
        $limit: limit ? parseInt(limit) : 20 // Default 20 theaters, increased from 10
      },
      {
        $project: {
          theaterId: 1,
          'location.address': 1,
          'location.geo.coordinates': 1,
          distance: 1
        }
      }
    ]).toArray();

    // Convert distance from meters to kilometers and round to 2 decimal places
    const theatersWithDistanceInKm = theaters.map(theater => ({
      ...theater,
      distance: Math.round((theater.distance / 1000) * 100) / 100
    }));

    res.json({
      success: true,
      data: theatersWithDistanceInKm,
      userLocation: { longitude: lng, latitude: lat }
    });

  } catch (error) {
    console.error('Error finding nearest theaters:', error);
    res.status(500).json({ 
      error: 'Failed to find nearest theaters',
      message: error.message 
    });
  }
};

const getTheaters = async (req, res) => {
  try {
    const collection = req.app.locals.moviesDB.collection('theaters');
    
    const theaters = await collection.find({})
      .project({ 
        theaterId: 1, 
        'location.address': 1, 
        'location.geo.coordinates': 1 
      })
      .limit(50) // Limit to prevent overwhelming response
      .toArray();
    
    res.json({
      success: true,
      data: theaters
    });

  } catch (error) {
    console.error('Error getting theaters:', error);
    res.status(500).json({ 
      error: 'Failed to get theaters',
      message: error.message 
    });
  }
};

module.exports = {
  getNearestTheaters,
  getTheaters
};