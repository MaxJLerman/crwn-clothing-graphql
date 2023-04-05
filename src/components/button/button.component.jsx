import { DefaultButton, GoogleSignInButton, InvertedButton, ButtonSpinner } from './button.styles';
import * as t from "./button.types";

const getButton = (buttonType) => (
  {
    [t.DEFAULT_BUTTON]: DefaultButton,
    [t.GOOGLE_BUTTON]: GoogleSignInButton,
    [t.INVERTED_BUTTON]: InvertedButton
  }[buttonType]
);

const Button = ({ children, buttonType, isLoading, ...otherProperties }) => {
  const CustomButton = getButton(buttonType);
  
  return (
    <CustomButton disabled={isLoading} {...otherProperties}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
}

export default Button;
