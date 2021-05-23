import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FiLock } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../context/ToastContext';

import Logo from '../../assets/logo.svg';
import { Container, Content, BackgroundImg } from './styles';
import api from '../../services/apiClient';

interface ResetPasswordFormData {
  password: string;
  passwordConfirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'A confirmação parece não ser a mesma senha',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        const { password, passwordConfirmation } = data;

        await api.post('/password/reset', {
          password,
          passwordConfirmation,
          token,
        });

        history.push('/');

        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: 'Sua nova senha foi validada com sucesso.',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senhar!',
          description: 'Erro ao tentar resetar sua senha. Tente novamente!',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <img src={Logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Alterar senha</h1>

          <Input
            name="password"
            icon={FiLock}
            type="password"
            autoComplete="current-password"
            placeholder="Nova senha"
          />

          <Input
            name="passwordConfirmation"
            icon={FiLock}
            type="password"
            autoComplete="current-password"
            placeholder="Confirme nova senha"
          />

          <Button type="submit">Alterar senha</Button>
        </Form>
      </Content>

      <BackgroundImg />
    </Container>
  );
};

export default ResetPassword;
