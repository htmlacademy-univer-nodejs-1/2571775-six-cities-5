export const UserValidationMessage = {
  email: {
    invalidId: 'Email must be a valid'
  },
  avatar : {
    invalidUrl: 'url must be valid',
  },
  name : {
    invalidFormat: 'publicationDate must be a valid ISO date',
    lengthField: 'Minimum name length must be 1 and Maximum name length must be 15'
  },
  password: {
    invalidFormat: 'password must be a string',
    lengthField: 'Minimum password length must be 6 and Maximum password length must be 12'
  },
  type: {
    invalidId: 'type must be Basic/Pro',
  },
} as const;
