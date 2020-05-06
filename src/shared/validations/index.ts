export const required = (value: string) =>
  value || typeof value === 'number' ? undefined : 'Required';

export const maxLength = (max: number) => (value: string) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = (min: number) => (value: string) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const searchMinLength = (value: string) =>
  !value || value.length < 4 ? `Search must be with 4 characters or more` : undefined;

export const isNumber = (value: string) =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const minValue = (min: number) => (value: number) =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const alphaNumeric = (value: string) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined;

export const phoneNumber = (value: string) =>
  value && !/^([0-9]{10})$/i.test(value) ? 'Invalid phone number, must be 10 digits' : undefined;

export const minLength2 = minLength(2);

type ValidatorsTypes = (value: string) => string;

export const composeValidators = (...validators: ValidatorsTypes[]) => (value: string) =>
  validators.reduce((error, validator) => {
    if (error) {
      return error;
    }
    return validator(value);
  }, '');
