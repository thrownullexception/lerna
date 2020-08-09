import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { RenderInput, SubmitButton } from '../../../components/RenderInput';
import { ISignUpForm } from './SignUp.types';
import { FormProps } from '../../../shared/types';
import {
  required,
  alphabetic,
  isEmail,
  composeValidators,
  uniqueValidation,
  isValidPassword,
} from '../../../shared/validations';

export const SignUpForm: React.SFC<FormProps<ISignUpForm>> = ({ onSubmit, isMakingRequest }) => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <React.Fragment>
            <Field
              name="email"
              validate={composeValidators(required, isEmail, uniqueValidation('users', 'email'))}
              validateFields={[]}
            >
              {({ input, meta }) => (
                <RenderInput label="Email" icon="user" meta={meta} input={input} />
              )}
            </Field>
            <Field
              name="lastName"
              validate={composeValidators(required, alphabetic)}
              validateFields={[]}
            >
              {({ input, meta }) => (
                <RenderInput label="Email" icon="user" meta={meta} input={input} />
              )}
            </Field>
            <Field
              name="firstName"
              validate={composeValidators(required, alphabetic)}
              validateFields={[]}
            >
              {({ input, meta }) => (
                <RenderInput label="Email" icon="user" meta={meta} input={input} />
              )}
            </Field>
            <Field
              name="password"
              validate={composeValidators(required, isValidPassword)}
              validateFields={[]}
            >
              {({ input, meta }) => (
                <RenderInput
                  type="password"
                  label="Password"
                  icon="lock"
                  meta={meta}
                  input={input}
                />
              )}
            </Field>
            <SubmitButton onClick={handleSubmit} isMakingRequest={isMakingRequest} text="Sign Up" />
          </React.Fragment>
        );
      }}
    />
  );
};
