import { RequestService } from '../../services';
import get from 'lodash/fp/get';

export const required = (value: string) =>
  value || typeof value === 'number' ? undefined : ('Required' as string);

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

export const matchOtherField = (otherField: string) => (value: string, allValues: object) =>
  get([otherField], allValues) === value ? undefined : 'Not Matching';

export const alphaNumeric = (value: string) =>
  value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined;

export const alphabetic = (value: string) =>
  value && /[^a-zA-Z-]/i.test(value) ? 'Only alphabets are allowed' : undefined;

export const isEmail = (value: string) =>
  value && value.match(/\S+@\S+\.\S+/) ? undefined : `Invalid Email`;

// TODO break up
export const isValidPassword = (value: string) =>
  value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(value)
    ? 'Must contain 1 Uppercase, 1 Lowercase, 1 number, 1 special character and 8 characters or longer'
    : undefined;

export const phoneNumber = (value: string) =>
  value && !/^([0-9]{10})$/i.test(value) ? 'Invalid phone number, must be 10 digits' : undefined;

export const minLength2 = minLength(2);

export const uniqueValidation = (entity: string, field: string, skipId?: number) => async (
  value: string,
) => {
  if (!value) {
    return undefined;
  }
  const { status: alreadyUsed } = await RequestService.post('validations', {
    entity,
    field,
    value,
    skipId,
  });
  if (alreadyUsed) {
    return 'Already Taken' as string;
  }
  return undefined;
};

type ValidatorsTypes = (value: string) => string | undefined | Promise<string | undefined>;

export const composeValidators = (...validators: ValidatorsTypes[]) => (value: string) =>
  validators.reduce((error: any, validator: ValidatorsTypes) => {
    if (error) {
      return error;
    }
    return validator(value);
  });
