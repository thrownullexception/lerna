import React from 'react';
import { FormFeedback, FormGroup, Input, Label, Button } from 'reactstrap';
import { FieldInputProps, FieldMetaState } from 'react-final-form';
import Select from 'react-select';

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

  let inputData = null;

  if (selectData) {
    inputData = (
      <Select
        {...input}
        value={selectData.find(({ value }) => value === input.value)}
        onChange={({ value }: any) => input.onChange(value)}
        options={selectData}
      />
    );
  } else {
    inputData = (
      <Input
        {...input}
        placeholder={label}
        type={type}
        invalid={!!(meta.touched && meta.error)}
        disabled={disabled}
        style={{ borderRadius: 5, borderColor: 'hsl(0,0%,80%)' }}
      />
    );
  }

  return (
    <FormGroup>
      {!hideLabel && <Label for={input.name}>{label}</Label>}
      {inputData}
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
