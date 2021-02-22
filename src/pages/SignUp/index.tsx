import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import api from '../../services/apiClient';

import { useToast } from '../../context/ToastContext';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import Logo from '../../assets/logo.svg';

import { Container, Content, BackgroundImg } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber.',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro!',
          description: 'Erro durante cadastro. Tente novamente!',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <BackgroundImg />
      <Content>
        <img src={Logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
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
        <Link to="/">
          <FiArrowLeft size={20} />
          Voltar para logon
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
