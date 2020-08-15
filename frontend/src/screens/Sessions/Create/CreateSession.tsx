import * as React from 'react';
import { IProps, ICreateSessionForm } from './CreateSession.types';
import { CreateSessionForm } from './CreateSession.form';
import { FormWizard } from '../../../components/FormWizard';
import { Field } from 'react-final-form';
import { required } from '../../../shared/validations';
import { RenderInput } from '../../../components/RenderInput';

export class CreateSession extends React.PureComponent<IProps> {
  render() {
    const { isMakingRequest } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="main-content-label mg-b-5"> Your Requirement </div>
              <p className="mg-b-20">
                Please be specific as must as possible to get best search results
              </p>
              <FormWizard
                initialValues={{ employed: true, stooge: 'larry' }}
                onSubmit={this.createSession}
              >
                <FormWizard.Page title="Lesson Details">
                  <section role="tabpanel" className="body">
                    <h3 tabIndex={-1} className="title">
                      Lesson Details
                    </h3>
                    <Field name="title" validate={required} validateFields={[]}>
                      {({ input, meta }) => <RenderInput label="Title" meta={meta} input={input} />}
                    </Field>
                    <Field name="description" validate={required} validateFields={[]}>
                      {({ input, meta }) => (
                        <RenderInput
                          type="textarea"
                          label="Description"
                          meta={meta}
                          input={input}
                        />
                      )}
                    </Field>
                    <div className="row">
                      <div className="col-6">
                        <Field name="budgetFrom" validate={required} validateFields={[]}>
                          {({ input, meta }) => (
                            <RenderInput
                              type="number"
                              label="Budget From"
                              meta={meta}
                              input={input}
                            />
                          )}
                        </Field>
                      </div>
                      <div className="col-6">
                        <Field name="budgetTo" validate={required} validateFields={[]}>
                          {({ input, meta }) => (
                            <RenderInput
                              type="number"
                              label="Budget To"
                              meta={meta}
                              input={input}
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                  </section>
                </FormWizard.Page>
                <FormWizard.Page title="Skills">
                  <div>
                    <label>Employed?</label>
                    <Field name="employed" component="input" type="checkbox" />
                  </div>
                  <div>
                    <label>Toppings</label>
                    <Field name="toppings" component="select" type="select" multiple={true}>
                      <option value="ham">Ham</option>
                    </Field>
                    <Error name="toppings" />
                  </div>
                </FormWizard.Page>
                <FormWizard.Page title="Vetting">
                  <section role="tabpanel" className="body">
                    <h3 tabIndex={-1} className="title">
                      Vetting
                    </h3>
                    <Field name="questionsDuration" validate={required} validateFields={[]}>
                      {({ input, meta }) => (
                        <RenderInput
                          type="number"
                          label="Questions Duration"
                          meta={meta}
                          input={input}
                        />
                      )}
                    </Field>
                    <Field name="passPercentage" validate={required} validateFields={[]}>
                      {({ input, meta }) => (
                        <RenderInput
                          type="number"
                          label="Pass Percentage"
                          meta={meta}
                          input={input}
                        />
                      )}
                    </Field>
                    <Field name="noResponseDuration" validate={required} validateFields={[]}>
                      {({ input, meta }) => (
                        <RenderInput
                          type="number"
                          label="No Response Duration"
                          meta={meta}
                          input={input}
                        />
                      )}
                    </Field>
                  </section>
                </FormWizard.Page>
              </FormWizard>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private createSession = (createSessionForm: any) => {
    // private createSession = (createSessionForm: ICreateSessionForm) => {
    // this.props.createSession(createSessionForm);
    // console.log(createSessionForm);
  };
}

interface IFieldError {
  name: string;
}

const Error = ({ name }: IFieldError) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) => (touched && error ? <span>{error}</span> : null)}
  />
);
