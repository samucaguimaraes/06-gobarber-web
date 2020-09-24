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

const SignIn: React.FC = () => {
/** Utilizando a lib unform, podemos acessar os elementos do
   *  inner atraves de algumas funcoes
   **/
  const formRef = useRef <FormHandles>(null);


  const handleSubmit = useCallback(async (data: object) => {
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

    } catch (err) {

      const erros = getValidationErrors(err);
      formRef.current?.setErrors(erros);
    }
  }, [])
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
