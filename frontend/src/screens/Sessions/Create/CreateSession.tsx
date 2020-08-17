import * as React from 'react';
import { IProps, ICreateSessionForm } from './CreateSession.types';
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

  renderSkillsForm = () => {
    const { skillsWithNoChildren, skillLevels } = this.props;
    return (
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
                    <Field name={`${name}.level`} validate={required}>
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
                onClick={() => fields.push({ skillId: '', level: '' })}
              >
                Add
              </button>
            </>
          );
        }}
      </FieldArray>
    );
  };

  renderLessionDetails = () => (
    <section role="tabpanel" className="body">
      <h3 tabIndex={-1} className="title">
        Lesson Details
      </h3>
      <Field name="title" validate={required} validateFields={[]}>
        {({ input, meta }) => <RenderInput label="Title" meta={meta} input={input} />}
      </Field>
      <Field name="description" validate={required} validateFields={[]}>
        {({ input, meta }) => (
          <RenderInput type="textarea" label="Description" meta={meta} input={input} />
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
    </section>
  );

  renderVettingForm = () => (
    <section role="tabpanel" className="body">
      <h3 tabIndex={-1} className="title">
        Vetting
      </h3>
      <Field name="questionsDuration" validate={required} validateFields={[]}>
        {({ input, meta }) => (
          <RenderInput type="number" label="Questions Duration" meta={meta} input={input} />
        )}
      </Field>
      <Field name="passPercentage" validate={required} validateFields={[]}>
        {({ input, meta }) => (
          <RenderInput type="number" label="Pass Percentage" meta={meta} input={input} />
        )}
      </Field>
      <Field name="noResponseDuration" validate={required} validateFields={[]}>
        {({ input, meta }) => (
          <RenderInput type="number" label="No Response Duration" meta={meta} input={input} />
        )}
      </Field>

      <FieldArray name="questions">
        {({ fields }) => {
          return (
            <>
              {fields.map((name, index) => (
                <div key={name}>
                  <Field name={`${name}.question`} validate={required}>
                    {({ input, meta }) => (
                      <RenderInput type="textarea" label="Question" meta={meta} input={input} />
                    )}
                  </Field>

                  <Field name={`${name}.optionA`} validate={required}>
                    {({ input, meta }) => (
                      <RenderInput label="Correct Answer" meta={meta} input={input} />
                    )}
                  </Field>

                  <Field name={`${name}.optionB`} validate={required}>
                    {({ input, meta }) => (
                      <RenderInput label="Option B" meta={meta} input={input} />
                    )}
                  </Field>

                  <Field name={`${name}.optionC`}>
                    {({ input, meta }) => (
                      <RenderInput label="Option C" meta={meta} input={input} />
                    )}
                  </Field>

                  <Field name={`${name}.optionD`}>
                    {({ input, meta }) => (
                      <RenderInput label="Option D" meta={meta} input={input} />
                    )}
                  </Field>

                  <Field name={`${name}.optionE`}>
                    {({ input, meta }) => (
                      <RenderInput label="Option E" meta={meta} input={input} />
                    )}
                  </Field>

                  <button
                    disabled={!(fields && fields.length && fields.length > 1)}
                    type="button"
                    className="btn btn-danger create-session__delete-skill-button"
                    onClick={() => fields.remove(index)}
                  >
                    <i className="fa fa-trash" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary pull-right"
                onClick={() =>
                  fields.push({
                    question: '',
                    optionA: '',
                    optionB: '',
                    optionC: '',
                    optionD: '',
                    optionE: '',
                  })
                }
              >
                Add
              </button>
            </>
          );
        }}
      </FieldArray>
    </section>
  );

  render() {
    const { isMakingFormRequest } = this.props;
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
                  title: '',
                  description: '',
                  budgetFrom: '0',
                  budgetTo: '2',
                  questionsDuration: '0',
                  passPercentage: '0',
                  noResponseDuration: '0',
                  skills: [{ skillId: '', level: '' }],
                  questions: [
                    {
                      question: '',
                      optionA: '',
                      optionB: '',
                      optionC: '',
                      optionD: '',
                      optionE: '',
                    },
                  ],
                }}
                isMakingFormRequest={isMakingFormRequest}
                onSubmit={this.createSession}
              >
                <FormWizard.Page title="Skills">{this.renderSkillsForm()}</FormWizard.Page>
                <FormWizard.Page title="Lesson Details">
                  {this.renderLessionDetails()}
                </FormWizard.Page>
                <FormWizard.Page title="Vetting">{this.renderVettingForm()}</FormWizard.Page>
              </FormWizard>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private createSession = (createSessionForm: ICreateSessionForm) => {
    this.props.createSession(createSessionForm);
  };
}
