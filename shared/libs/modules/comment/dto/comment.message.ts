export const CommentValidationMessage = {
  text: {
    minLength: 'Minimum name length must be 5',
    maxLength: 'Maximum name length must be 1024'
  },
  publicationDate : {
    invalidFormat: 'publicationDate must be a valid ISO date',
  },
  rating: {
    invalidFormat: 'rating must be an integer',
    minValue: 'Minimum rating is 0',
    maxValue: 'Maximum rating is 5'
  },
  authorId: {
    invalidId: 'authorId must be a valid mongoId',
  },
} as const;
