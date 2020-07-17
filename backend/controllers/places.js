const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Museum of Contemporary Art Australia',
    description:
      'The Museum of Contemporary Art Australia (abbreviated MCA), located in George Street, Sydney, is an Australian museum solely dedicated to exhibiting, interpreting and collecting contemporary art, both from across Australia and around the world.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/MCA_Sydney.jpg/800px-MCA_Sydney.jpg',
    address: '140 George St, The Rocks NSW 2000, Australia',
    location: {
      lat: -33.8599358,
      lng: 151.2090295,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Maidan Nezalezhnosti',
    description:
      "Maidan Nezalezhnosti is the central square of Kyiv, the capital city of Ukraine. One of the city's main squares, it is located on Khreshchatyk Street in the Shevchenko Raion",
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/MaidanNezalezhnosti.jpg',
    address: 'Kyiv 02000',
    location: {
      lat: 50.450555,
      lng: 30.5210808,
    },
    creator: 'u2',
  },
];

const getPlaceById = (req, res, next) => {
  const { placeId } = req.params;

  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    return next(
      new HttpError('Could not find place for the provided id', 404),
    );
  }

  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const { userId } = req.params;

  const places = DUMMY_PLACES.filter((p) => p.creator === userId);

  if (!places[0]) {
    return next(
      new HttpError(
        'Could not find places for the provided user id',
        404,
      ),
    );
  }

  res.json({ [userId]: places });
};

const createPlace = (req, res, next) => {
  const {
    title,
    description,
    imageUrl,
    address,
    coordinates,
    creator,
  } = req.body;

  const createdPlace = {
    id: uuid(),
    title,
    description,
    imageUrl,
    address,
    location: coordinates,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
