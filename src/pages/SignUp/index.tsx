import React from 'react';
import { Form } from '@unform/web';

import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import Logo from '../../assets/logo.svg';

import { Container, Content, BackgroundImg } from './styles';

const SignUp: React.FC = () => {
  function handleSubmit(data: any): void {
    console.log(data);
  }
  return (
    <Container>
      <BackgroundImg />
      <Content>
        <img src={Logo} alt="GoBarber" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} type="text" placeholder="seu nome" />
          <Input
            name="email"
            icon={FiMail}
            type="email"
            autoComplete="username"
            placeholder="seu e-mail"
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            autoComplete="new-password"
            placeholder="sua senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>
        <a href="/register">
          <FiArrowLeft size={20} />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
