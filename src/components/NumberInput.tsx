import React from 'react';

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({ className = '', ...props }) => {
  return (
    <input
      type="number"
      step="0.01"
      min="0"
      {...props}
      className={`${className} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
    />
  );
};

export default NumberInput;