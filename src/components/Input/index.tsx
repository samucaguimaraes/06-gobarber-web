import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';
import { useField } from '@unform/core';

/** Propriedades que o Input vai receber com InputHTMLAttributes */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  /** Add um referencia ao input */
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  /** Registrando um elemento de tela */
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect( () => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  },[fieldName, registerField]);



  /** Função para controlar o fucus do input e icone
  *   Utilizando o hook useCallBack para criar a função
  *   de forma otimizada
  **/
  const handleInputBlur = useCallback(() =>{
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
    }, []);


  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={ () => {setIsFocused(true)}}
        onBlur= {handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest} />
      {error &&
        <Error>
            <FiAlertCircle color="#c53030" size={20} />
        </Error> }
    </Container>
  );
};

export default Input;
