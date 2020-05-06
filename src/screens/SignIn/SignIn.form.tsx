import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { RenderInput, SubmitButton } from '../../components/RenderInput';
import { ISignInForm } from './SignIn.types';
import { FormProps } from '../../shared/types';
import { required } from '../../shared/validations';

export const SignInForm: React.SFC<FormProps<ISignInForm>> = ({ onSubmit, isMakingRequest }) => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine }) => {
        return (
          <React.Fragment>
            <Field name="email" validate={required} validateFields={[]}>
              {({ input, meta }) => (
                <RenderInput label="Email" icon="user" meta={meta} input={input} />
              )}
            </Field>
            <Field name="password" validate={required} validateFields={[]}>
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
            <SubmitButton
              disabled={submitting || pristine}
              onClick={() => {
                handleSubmit();
              }}
              isMakingRequest={isMakingRequest}
              text="Sign In"
            />
          </React.Fragment>
        );
      }}
    />
  );
};
