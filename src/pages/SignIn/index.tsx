import React from 'react';

import { FiLogIn, FiKey, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import Logo from '../../assets/logo.svg';
import { Container, Content, BackgroundImg } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="GoBarber" />

        <form>
          <h1>Faça seu logon</h1>

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
            autoComplete="current-password"
            placeholder="sua senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="/forgot">
            <FiKey />
            Esqueci minha senha
          </a>
        </form>
        <a href="/register">
          <FiLogIn size={20} />
          Criar conta
        </a>
      </Content>

      <BackgroundImg />
    </Container>
  );
};

export default SignIn;
