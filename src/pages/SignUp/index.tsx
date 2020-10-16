import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';

/** Importando todas as funcionalidades do yup e add na variável Yup*/
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, Background, AnimationContainer } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';


const SignUp: React.FC = () => {

  /** Utilizando a lib unform, podemos acessar os elementos do
   *  inner atraves de algumas funcoes
   **/
  const formRef = useRef <FormHandles>(null);


  const handleSubmit = useCallback(async (data: object) => {
    try {
      /** Setando o array de erros comom vazio */
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email(),
        password: Yup.string().min(6, 'Mínimo de 6 digitos'),

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
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit"> Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
          Voltar para Logon
        </Link>
      </AnimationContainer>
      </Content>

    </Container>
  );
}



export default SignUp;
