export const OfferValidationMessage = {
  name: {
    minLength: 'Minimum name length must be 10',
    maxLength: 'Maximum name length must be 100'
  },
  offerDescription : {
    minLength: 'Minimum offerDescription length must be 20',
    maxLength: 'Maximum offerDescription length must be 1024'
  },
  publicationDate : {
    invalidFormat: 'publicationDate must be a valid ISO date',
  },
  city: {
    invalidId: 'city must be Paris/Cologne/Brussels/Amsterdam/Hamburg/Dusseldorf',
  },
  previewUrl: {
    invalidUrl: 'url must be valid'
  },
  housingImages: {
    invalidFormat: 'housingImages must be an array',
    invalidId: 'housingImages field must be an array of valid id'
  },
  isPremium: {
    invalidId: 'isPremium must be true/false'
  },
  isFavorite: {
    invalidId: 'isFavorite must be true/false'
  },
  rating: {
    invalidFormat: 'rating must be an integer',
    minValue: 'Minimum rating is 0',
    maxValue: 'Maximum rating is 5'
  },
  housingType: {
    invalidId: 'housingType must be apartment/house/room/hotel',
  },
  roomsCount: {
    invalidFormat: 'roomsCount must be an integer',
    minValue: 'Minimum roomsCount is 1',
    maxValue: 'Maximum roomsCount is 8'
  },
  guestsCount: {
    invalidFormat: 'guestsCount must be an integer',
    minValue: 'Minimum guestsCount is 1',
    maxValue: 'Maximum guestsCount is 10'
  },
  rentalCost: {
    invalidFormat: 'rentalCost must be an integer',
    minValue: 'Minimum rentalCost is 100',
    maxValue: 'Maximum rentalCost is 100_000'
  },
  convenienceList: {
    invalidFormat: 'convenienceList must be an array',
    invalidId: 'convenienceList field must be an array of valid id'
  },
  author: {
    invalidId: 'id must be valid',
  },
  commentsCount: {
    invalidFormat: 'guestsCount must be an integer',
    minValue: 'Minimum guestsCount is 0',
  },
  averageRating: {
    invalidFormat: 'averageRating must be an integer',
    minValue: 'Minimum averageRating is 0',
    maxValue: 'Maximum averageRating is 5'
  },
  offerCoordinates: {
    invalid: 'offerCoordinates must be {latitude: number, longitude: number}'
  }
} as const;
