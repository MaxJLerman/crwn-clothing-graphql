import { DefaultButton, GoogleSignInButton, InvertedButton, ButtonSpinner } from './button.styles';
import { BUTTON_TYPE_CLASSES } from "./button.types";

const getButton = (buttonType = BUTTON_TYPE_CLASSES.DEFAULT_BUTTON) => ({
  [BUTTON_TYPE_CLASSES.DEFAULT_BUTTON]: DefaultButton,
  [BUTTON_TYPE_CLASSES.GOOGLE_BUTTON]: GoogleSignInButton,
  [BUTTON_TYPE_CLASSES.INVERTED_BUTTON]: InvertedButton
}[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  
  return (
    <CustomButton {...otherProps}>
      {children}
    </CustomButton>
  );
};

export default Button;
