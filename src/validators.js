export const required = value => (value ? undefined : 'This field is required');
export const nonEmpty = value =>
  value.trim() !== '' ? undefined : 'This field cannot be empty';
export const isTrimmed = value =>
  value.trim() === value ? undefined : 'Cannot start or end with whitespace';
export const length = length => value => {
  if (length.min && value.length < length.min) {
    return `Your password must be at least ${length.min} characters long`;
  }
  if (length.max && value.length > length.max) {
    return `Your password can be at most ${length.max} characters long`;
  }
};
export const matches = field => (value, allValues) =>
  field in allValues && value.trim() === allValues[field].trim()
    ? undefined
    : 'The passwords do not match';
