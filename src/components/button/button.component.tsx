import { FC, ButtonHTMLAttributes } from 'react';

import { DefaultButton, GoogleSignInButton, InvertedButton, ButtonSpinner } from './button.styles';
import { BUTTON_TYPE_CLASSES } from "./button.types";

const getButton = (buttonType = BUTTON_TYPE_CLASSES.DEFAULT_BUTTON): typeof DefaultButton => ({
  [BUTTON_TYPE_CLASSES.DEFAULT_BUTTON]: DefaultButton,
  [BUTTON_TYPE_CLASSES.GOOGLE_BUTTON]: GoogleSignInButton,
  [BUTTON_TYPE_CLASSES.INVERTED_BUTTON]: InvertedButton
}[buttonType]);

export type ButtonProps = {
  children: React.ReactNode;
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>; // allows us to pass any other HTMLButtonElement props e.g. type="submit"

// FC == functional component => passing the ButtonProps as a generic type
// equivalent of passing ButtonProps onto the component props: ({ prop1, prop2, prop3 }: ButtonProps)
const Button: FC<ButtonProps> = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
}

export default Button;
