import React from 'react';
import { FormFeedback, FormGroup, Input, Label, Button } from 'reactstrap';
import { FieldInputProps, FieldMetaState } from 'react-final-form';

export interface ISelectData {
  value: string;
  label: string;
}

interface IRenderInput {
  input: FieldInputProps<any, HTMLElement>;
  meta: FieldMetaState<any>;
  label: string;
  type?: 'textarea' | 'number' | 'password' | 'date' | 'select';
  icon?: string;
  selectData?: ISelectData[];
  hideLabel?: boolean;
  disabled?: boolean;
}

export const RenderInput: React.SFC<IRenderInput> = ({
  input,
  label,
  type,
  selectData,
  meta,
  hideLabel,
  disabled,
}): JSX.Element => {
  const hasError = meta.invalid && meta.touched;
  if (selectData) {
    type = 'select';
  }
  return (
    <FormGroup>
      {!hideLabel && <Label for={input.name}>{label}</Label>}
      <Input
        {...input}
        placeholder={label}
        type={type}
        invalid={!!(meta.touched && meta.error)}
        id={input.name}
        disabled={disabled}
      >
        {selectData &&
          selectData.map((each: ISelectData) => (
            <option value={each.value} key={each.value}>
              {each.label}
            </option>
          ))}
      </Input>
      {hasError && <FormFeedback>{meta.error}</FormFeedback>}
    </FormGroup>
  );
};

interface ISubmitButton {
  text: string;
  isMakingRequest: boolean;
  onClick: () => void;
}

export const SubmitButton: React.SFC<ISubmitButton> = ({ text, isMakingRequest, onClick }) => {
  return (
    <Button
      disabled={isMakingRequest}
      color="primary"
      onClick={onClick}
      type="submit"
      className="pull-right"
    >
      {isMakingRequest ? <i className="fa fa-spinner fa-spin" /> : null} {text}
    </Button>
  );
};
