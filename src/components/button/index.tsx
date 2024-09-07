import { Button as NextButton } from '@nextui-org/react';
import type React from 'react';

type Props = {
  children: React.ReactNode;
  icon?: JSX.Element;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  color?: 
    'default' |
    'primary' |
    'success' |
    'warning' |
    'danger' |
    undefined;
  href?: string;
  disableRipple?: boolean
  as?: any
  anchorIcon?: any
  showAnchorIcon?: boolean
  onClick?: () => void;
  isExternal?: boolean;
};

export const Button: React.FC<Props> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
  as,
  showAnchorIcon,
  anchorIcon,
  href,
  onClick,
  disableRipple,
  isExternal,
}) => {
  return (
    <NextButton
      as={as}
      startContent={icon}
      size='lg'
      color={color} 
      variant='light'
      data-hover='false'
      className={className}
      showAnchorIcon={showAnchorIcon}
      anchorIcon={anchorIcon}
      type={type}
      href={href}
      fullWidth={fullWidth}
      onClick={onClick}
      disableRipple={disableRipple}
      isExternal={isExternal}
    >
      {children}
    </NextButton>
  );
};
