import React, { InputHTMLAttributes } from 'react';
import {IconBaseProps} from 'react-icons';
import { Container } from './styles';

/** Propriedades que o Input vai receber com InputHTMLAttributes */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest}) => (
  <Container>
    {Icon && <Icon size={20} />}
    <input {...rest} />
  </Container>
);

export default Input;
