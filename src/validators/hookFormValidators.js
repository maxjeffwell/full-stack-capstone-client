// React Hook Form compatible validators

export const validationRules = {
  required: {
    required: 'This field is required',
  },

  nonEmpty: {
    required: 'This field is required',
    validate: value => value.trim() !== '' || 'This field cannot be empty',
  },

  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
    validate: value => value.trim() !== '' || 'Email cannot be empty',
  },

  isTrimmed: {
    validate: value =>
      value.trim() === value || 'Cannot start or end with whitespace',
  },

  password: (minLength = 8, maxLength = 72) => ({
    required: 'Password is required',
    minLength: {
      value: minLength,
      message: `Your password must be at least ${minLength} characters long`,
    },
    maxLength: {
      value: maxLength,
      message: `Your password can be at most ${maxLength} characters long`,
    },
    validate: value =>
      value.trim() === value || 'Password cannot start or end with whitespace',
  }),

  passwordConfirmation: {
    required: 'Please confirm your password',
    validate: (value, formValues) => {
      if (!value) return 'Please confirm your password';
      if (value.trim() === '') return 'This field cannot be empty';
      return value === formValues.password || 'The passwords do not match';
    },
  },
};

// Helper function to combine multiple validation rules
export const combineRules = (...rules) => {
  const combined = {};

  rules.forEach(rule => {
    Object.keys(rule).forEach(key => {
      if (key === 'validate' && combined.validate) {
        // If validate already exists, combine them
        const existingValidate = combined.validate;
        const newValidate = rule.validate;

        combined.validate = async (value, formValues) => {
          const existingResult = await existingValidate(value, formValues);
          if (existingResult !== true) return existingResult;
          return newValidate(value, formValues);
        };
      } else {
        combined[key] = rule[key];
      }
    });
  });

  return combined;
};
