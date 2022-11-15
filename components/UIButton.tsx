/* eslint-disable react/button-has-type */
import React from 'react';

interface IBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'tertiary' | 'empty';
  disabled?: boolean;
}

const UIButton = (props: IBtnProps) => {
  const { variant, disabled = false, onClick, children, ...btnProps } = props;

  if (variant === 'primary') {
    return (
      <button
        {...btnProps}
        className={`py-1.5 border rounded-full px-4 cursor-pointer text-xs self-center text-white bg-brandColor-skin-teal border-brandColor-skin-teal ${
          btnProps.className
        } ${disabled && 'opacity-30 cursor-not-allowed'}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        {...btnProps}
        className={`py-1.5 border rounded-full px-4 cursor-pointer text-xs self-center text-textColor-skin-brand bg-backgroundColor-skin-secondary border-brandColor-skin-teal ${
          btnProps.className
        } ${disabled && 'opacity-30 cursor-not-allowed'}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  if (variant === 'tertiary') {
    return (
      <button
        {...btnProps}
        className={`py-1.5 border rounded-full px-4 cursor-pointer text-xs self-center text-textColor-skin-secondary bg-backgroundColor-skin-secondary border-[#686868] ${
          btnProps.className
        } ${disabled && 'opacity-30 cursor-not-allowed'}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      {...btnProps}
      className={`cursor-pointer text-sm text-textColor-skin-secondary ${
        btnProps.className
      } ${disabled && 'opacity-30 cursor-not-allowed'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default UIButton;
