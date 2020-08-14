import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { Button } from 'reactstrap';
import { ITutorSkillForm } from '../ListTutorSkills.types';
import { FormProps } from '../../../../../shared/types';
import { required } from '../../../../../shared/validations';
import { SubmitButton, RenderInput } from '../../../../../components/RenderInput';
import { SkillListResponse } from '../../../../../app/skills/responses';
import { SkillLevelResponse } from '../../../../../app/tutor-skills/responses';
import {
  transformSystemValuesToSelectData,
  transformDataToSelectData,
} from '../../../../../shared/transformers';
import pick from 'lodash-es/pick';

interface IProps extends FormProps<ITutorSkillForm> {
  skills: SkillListResponse[];
  skillLevels: SkillLevelResponse[];
  onDelete?: () => void;
}

const addOrUpdateText = (determinate: boolean): string => (determinate ? 'Update' : 'Create');

export const TutorSkillForm: React.SFC<IProps> = ({
  onSubmit,
  isMakingRequest,
  skills,
  onDelete,
  initialValues,
  skillLevels,
}) => {
  return (
    <Form
      onSubmit={(values: ITutorSkillForm) => {
        values.rate = Number(values.rate);
        values.years = Number(values.years);
        onSubmit(values);
      }}
      initialValues={pick(initialValues, ['skillId', 'level', 'years', 'rate', 'id'])}
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
                  selectData={transformSystemValuesToSelectData(skillLevels)}
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
            {initialValues ? (
              <Button color="danger" onClick={onDelete} type="button" className="pull-left">
                <i className="fa fa-trash" />
              </Button>
            ) : null}
            <SubmitButton
              onClick={handleSubmit}
              isMakingRequest={isMakingRequest}
              text={`${addOrUpdateText(!!initialValues)} Skill`}
            />
          </React.Fragment>
        );
      }}
    />
  );
};
