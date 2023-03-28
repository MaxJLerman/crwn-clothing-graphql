import { FormInputLabel, Input, Group } from './form-input.styles';

const FormInput = ({ label, ...otherProperties }) => {
  return(
    <Group>
      <Input {...otherProperties} />
      {
          label && ( <FormInputLabel shrink={otherProperties.value.length}>{label}</FormInputLabel> )
      }
    </Group>
  );
};

export default FormInput;
