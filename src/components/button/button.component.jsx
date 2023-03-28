import { DefaultButton, GoogleSignInButton, InvertedButton } from './button.styles';

export const BUTTON_TYPE_CLASSES = {
  default: 'default',
  google: 'google-sign-in',
  inverted: 'inverted'
};

const getButton = (buttonType) => (
  {
    [BUTTON_TYPE_CLASSES.default]: DefaultButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
  }[buttonType]
);

const Button = ({ children, buttonType, ...otherProperties }) => {
  const CustomButton = getButton(buttonType);
  
  return <CustomButton {...otherProperties}>{children}</CustomButton>;
}

export default Button;
