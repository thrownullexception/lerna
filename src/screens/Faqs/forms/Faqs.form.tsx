import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { RenderInput, SubmitButton } from '../../../components/RenderInput';
import { IFaqsForm } from '../../../app/faqs/faqs.types';
import { FormProps } from '../../../shared/types';
import { required } from '../../../shared/validations';

export const FaqsForm: React.SFC<FormProps<IFaqsForm>> = ({
  onSubmit,
  isMakingRequest,
  initialValues,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, submitting, pristine }) => {
        return (
          <React.Fragment>
            <Field name="question" validate={required} validateFields={[]}>
              {({ input, meta }) => <RenderInput label="Question" meta={meta} input={input} />}
            </Field>
            <Field name="answer" validate={required} validateFields={[]}>
              {({ input, meta }) => (
                <RenderInput type="textarea" label="Answer" meta={meta} input={input} />
              )}
            </Field>
            <SubmitButton
              disabled={submitting || pristine}
              onClick={() => {
                handleSubmit();
              }}
              isMakingRequest={isMakingRequest}
              text="Submit"
            />
          </React.Fragment>
        );
      }}
    />
  );
};
