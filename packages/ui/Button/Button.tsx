'use client';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import './Button.scss';

type TButton = ButtonHTMLAttributes<HTMLButtonElement>;
interface Props extends TButton {
  buttonType?: 'primary' | 'secondary' | 'cancel';
  href?: string;
  icon?: string;
  iconAlt?: string;
  size?: number;
}

export const Button = ({
  buttonType,
  children,
  className,
  href,
  icon,
  iconAlt,
  size = 20,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <button {...props} className="button">
      {children}
    </button>
  );
};
