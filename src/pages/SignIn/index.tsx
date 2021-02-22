import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FiLogIn, FiKey, FiMail, FiLock } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

import Logo from '../../assets/logo.svg';
import { Container, Content, BackgroundImg } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Informe um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Seu login foi validado com sucesso.',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação!',
          description: 'Erro ao fazer login. Verifique as credenciais.',
        });
      }
    },
    [addToast, history, signIn],
  );

  return (
    <Container>
      <Content>
        <img src={Logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
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
        </Form>
        <Link to="/signup">
          <FiLogIn size={20} />
          Criar conta
        </Link>
      </Content>

      <BackgroundImg />
    </Container>
  );
};

export default SignIn;
