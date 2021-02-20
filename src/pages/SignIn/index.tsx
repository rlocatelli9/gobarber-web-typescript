import React from 'react';

import { FiLogIn, FiKey } from 'react-icons/fi';

import { Container, Content, BackgroundImg } from './styles';
import Logo from '../../assets/logo.svg';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="GoBarber" />

        <form>
          <h1>Faça seu logon</h1>

          <input type="text" placeholder="seu e-mail" />
          <input type="password" placeholder="sua senha" />

          <button type="submit">Entrar</button>

          <a href="/forgot">
            <FiKey />
            Esqueci minha senha
          </a>
        </form>
        <a href="/register">
          <FiLogIn />
          Criar conta
        </a>
      </Content>

      <BackgroundImg />
    </Container>
  );
};

export default SignIn;
