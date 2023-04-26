import { InputHTMLAttributes, FC } from 'react';

import { FormInputLabel, Input, Group } from './form-input.styles';

type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {
          label && ( 
            <FormInputLabel shrink={Boolean( // returns true if the conditions below are truthy, otherwise false
              otherProps.value && // checks for otherProps being passed in and have values being truthy
              typeof otherProps.value === "string" && // checks that the otherProps being passed in are string values
              otherProps.value.length // checks if the otherProps values being passed in each have a length greater than 0
            )}>
              {label}
            </FormInputLabel>
          )
      }
    </Group>
  );
};

export default FormInput;
