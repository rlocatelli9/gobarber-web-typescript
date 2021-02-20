import React from 'react';

import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import Logo from '../../assets/logo.svg';
import { Container, Content, BackgroundImg } from './styles';

const SignUp: React.FC = () => {
  return (
    <Container>
      <BackgroundImg />
      <Content>
        <img src={Logo} alt="GoBarber" />

        <form>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} type="text" placeholder="seu nome" />
          <Input
            name="email"
            icon={FiMail}
            type="text"
            placeholder="seu e-mail"
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="sua senha"
          />

          <Button type="submit">Cadastrar</Button>
        </form>
        <a href="/register">
          <FiArrowLeft size={20} />
          Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
