import React, { useCallback, useRef }  from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, Background } from './styles';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';


/** Interface p/ o formulario */
interface SignInFormData{
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
/** Utilizando a lib unform, podemos acessar os elementos do
   *  inner atraves de algumas funcoes
   **/
  const formRef = useRef <FormHandles>(null);
  const {signIn} = useAuth();
  const {addToast} = useToast();


  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      /** Setando o array de erros comom vazio */
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail Obrigatório').email(),
        password: Yup.string().required('Senha Obrigatória'),

      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      if(err instanceof Yup.ValidationError){
        const erros = getValidationErrors(err);

        formRef.current?.setErrors(erros);
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Houve um problema no processo de login.',
      });
    }
  },
  [signIn, addToast],
  );
return (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Faça seu logon</h1>

        <Input name="email" icon={FiMail} placeholder="E-mail" />

        <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

        <Button type="submit"> Entrar</Button>

        <a href="http://">Esqueci minha senha</a>
      </Form>
      <a href="http://">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
  )
};

export default SignIn;
