import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FiLogIn, FiMail } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../context/ToastContext';

import Logo from '../../assets/logo.svg';
import { Container, Content, BackgroundImg } from './styles';
import api from '../../services/apiClient';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  // const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setIsLoading(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Informe um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // TODO - recuperação de senha

        await api.post('/password/forgot', {
          email: data.email,
        });

        // history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'E-mail de recuperação de senha enviado!',
          description:
            'Um e-mail foi enviado para você. Cheque sua caixa de entrada.',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha!',
          description: 'Erro ao recuperar senha. Tente novament!',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <img src={Logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Recuperar senha</h1>

          <Input
            name="email"
            icon={FiMail}
            type="email"
            autoComplete="username"
            placeholder="seu e-mail"
          />

          <Button loading={isLoading} type="submit">
            Recuperar
          </Button>
        </Form>
        <Link to="/">
          <FiLogIn size={20} />
          Voltar ao login
        </Link>
      </Content>

      <BackgroundImg />
    </Container>
  );
};

export default ForgotPassword;
