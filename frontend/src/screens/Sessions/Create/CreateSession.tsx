import * as React from 'react';
import { IProps, ICreateSessionForm } from './CreateSession.types';
import { CreateSessionForm } from './CreateSession.form';
import { FormWizard } from '../../../components/FormWizard';
import { Field } from 'react-final-form';
import { required } from '../../../shared/validations';
import { RenderInput } from '../../../components/RenderInput';
import { FieldArray } from 'react-final-form-arrays';
import {
  transformDataToSelectData,
  transformSystemValuesToSelectData,
} from '../../../shared/transformers';
import './styles.scss';

export class CreateSession extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.getSkillsWithNoChildrenList();
    this.props.getSkillLevels();
  }

  render() {
    const { isMakingFormRequest, skillsWithNoChildren, skillLevels } = this.props;
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
                initialValues={{
                  employed: true,
                  stooge: 'larry',
                  skills: [{ skillId: '', levelId: '' }],
                }}
                onSubmit={this.createSession}
              >
                <FormWizard.Page title="Skills">
                  <FieldArray name="skills">
                    {({ fields }) => {
                      return (
                        <>
                          {fields.map((name, index) => (
                            <div className="row" key={name}>
                              <div className="col-5">
                                <Field name={`${name}.skillId`} validate={required}>
                                  {({ input, meta }) => (
                                    <RenderInput
                                      selectData={transformDataToSelectData(skillsWithNoChildren)}
                                      label="Skill"
                                      meta={meta}
                                      input={input}
                                    />
                                  )}
                                </Field>
                              </div>
                              <div className="col-5">
                                <Field name={`${name}.levelId`} validate={required}>
                                  {({ input, meta }) => (
                                    <RenderInput
                                      selectData={transformSystemValuesToSelectData(skillLevels)}
                                      label="Level"
                                      meta={meta}
                                      input={input}
                                    />
                                  )}
                                </Field>
                              </div>

                              <div className="col-2 text-center">
                                <button
                                  disabled={!(fields && fields.length && fields.length > 1)}
                                  type="button"
                                  className="btn btn-danger create-session__delete-skill-button"
                                  onClick={() => fields.remove(index)}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="btn btn-primary pull-right"
                            onClick={() => fields.push({ skillId: '', levelId: '' })}
                          >
                            Add
                          </button>
                        </>
                      );
                    }}
                  </FieldArray>
                </FormWizard.Page>
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
