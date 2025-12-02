export const LoginValidationMessage = {
  email: {
    invalidId: 'Email must be a valid'
  },
  password: {
    invalidFormat: 'password must be a string',
    lengthField: 'Minimum password length must be 6 and Maximum password length must be 12'
  },
} as const;
