import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { ITutorSkillForm } from '../ListTutorSkills.types';
import { FormProps } from '../../../../../shared/types';
import { required } from '../../../../../shared/validations';
import { SubmitButton, RenderInput } from '../../../../../components/RenderInput';
import { SkillListResponse } from '../../../../../app/skills/responses';
import { TutorSkillLevelResponse } from '../../../../../app/tutor-skills/responses';
import {
  transformSystemValuesToSelectData,
  transformDataToSelectData,
} from '../../../../../shared/transformers';

interface IProps extends FormProps<ITutorSkillForm> {
  skills: SkillListResponse[];
  tutorSkillLevels: TutorSkillLevelResponse[];
}

export const TutorSkillForm: React.SFC<IProps> = ({
  onSubmit,
  isMakingRequest,
  skills,
  tutorSkillLevels,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => {
        return (
          <React.Fragment>
            <Field name="skillId" validate={required} validateFields={[]}>
              {({ input, meta }) => (
                <RenderInput
                  selectData={transformDataToSelectData(skills)}
                  label="Skill"
                  meta={meta}
                  input={input}
                />
              )}
            </Field>
            <Field name="level" validate={required} validateFields={[]}>
              {({ input, meta }) => (
                <RenderInput
                  selectData={transformSystemValuesToSelectData(tutorSkillLevels)}
                  label="Level"
                  meta={meta}
                  input={input}
                />
              )}
            </Field>
            <Field name="years" validate={required} validateFields={[]}>
              {({ input, meta }) => (
                <RenderInput type="number" label="Years Of Experience" meta={meta} input={input} />
              )}
            </Field>
            <Field name="rate" validate={required} validateFields={[]}>
              {({ input, meta }) => (
                <RenderInput type="number" label="Rate per Hour" meta={meta} input={input} />
              )}
            </Field>
            <SubmitButton
              onClick={handleSubmit}
              isMakingRequest={isMakingRequest}
              text="Add New Skill"
            />
          </React.Fragment>
        );
      }}
    />
  );
};
