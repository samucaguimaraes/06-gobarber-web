import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';
import { useField } from '@unform/core';

/** Propriedades que o Input vai receber com InputHTMLAttributes */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  /** Utilizando o unform para formulários e persistencia de inputs */
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect( () => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  },[fieldName, registerField]);


  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input ref={inputRef} {...rest} />
    {error}
    </Container>
  );
};

export default Input;
