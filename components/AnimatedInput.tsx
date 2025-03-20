"use client"

import React, { useState, useRef, useEffect } from 'react';

interface AnimatedInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({ 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  required = false, 
  disabled = false,
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        disabled={disabled}
        className={`w-full bg-transparent py-3 focus:outline-none placeholder-gray-600 ${className}`}
        data-focused={isFocused ? "true" : "false"}
      />
    </div>
  );
};

export default AnimatedInput;