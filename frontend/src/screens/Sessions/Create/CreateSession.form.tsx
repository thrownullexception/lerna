import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { RenderInput, SubmitButton } from '../../../components/RenderInput';
import { ICreateSessionForm } from './CreateSession.types';
import { FormProps } from '../../../shared/types';
import { required } from '../../../shared/validations';

export const CreateSessionForm: React.SFC<FormProps<ICreateSessionForm>> = ({
  onSubmit,
  isMakingRequest,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine }) => {
        return (
          <React.Fragment>
            <Field name="title" validate={required} validateFields={[]}>
              {({ input, meta }) => <RenderInput label="Title" meta={meta} input={input} />}
            </Field>
            <Field name="description" validate={required} validateFields={[]}>
              {({ input, meta }) => (
                <RenderInput
                  type="textarea"
                  label="Password"
                  icon="lock"
                  meta={meta}
                  input={input}
                />
              )}
            </Field>
            <div className="row">
              <div className="col-6">
                <Field name="budgetFrom" validate={required} validateFields={[]}>
                  {({ input, meta }) => (
                    <RenderInput type="number" label="Budget From" meta={meta} input={input} />
                  )}
                </Field>
              </div>
              <div className="col-6">
                <Field name="budgetTo" validate={required} validateFields={[]}>
                  {({ input, meta }) => (
                    <RenderInput type="number" label="Budget To" meta={meta} input={input} />
                  )}
                </Field>
              </div>
            </div>
            <SubmitButton
              disabled={submitting || pristine}
              onClick={handleSubmit}
              isMakingRequest={isMakingRequest}
              text="Create Session"
            />
          </React.Fragment>
        );
      }}
    />
  );
};
