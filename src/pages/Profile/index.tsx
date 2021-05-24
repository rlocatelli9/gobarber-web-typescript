import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { FiUser, FiMail, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import api from '../../services/apiClient';

import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AvatarInput } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
  passwordConfirmation?: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          oldPassword: Yup.string(),
          newPassword: Yup.string().when('oldPassword', {
            is: (oldPassword: string) => !!oldPassword.length,
            then: Yup.string()
              .required('A senha é obrigatória')
              .min(6, 'No mínimo 6 dígitos'),
            otherwise: Yup.string(),
          }),
          passwordConfirmation: Yup.string()
            .when('oldPassword', {
              is: (oldPassword: string) => !!oldPassword.length,
              then: Yup.string()
                .required('A senha é obrigatória')
                .min(6, 'No mínimo 6 dígitos'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('newPassword', undefined)],
              'Confirmação incorreta',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          oldPassword,
          newPassword,
          passwordConfirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(oldPassword && {
            oldPassword,
            newPassword,
            passwordConfirmation,
          }),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
      } catch (error) {
        console.error(error);

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização!',
          description: 'Erro durante atualização do perfil. Tente novamente!',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const formData = new FormData();

        formData.append('avatar', event.target.files[0]);

        api
          .patch('/users/avatar', formData)
          .then(response => {
            updateUser(response.data);
            addToast({
              type: 'success',
              title: 'Avatar atualizado com sucesso',
            });
          })
          .catch(() => {
            addToast({
              type: 'error',
              title: 'Falha ao atualizar o avatar',
            });
          });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatarUrl} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input
                type="file"
                accept="image/*"
                id="avatar"
                onChange={handleAvatarChange}
              />
            </label>
          </AvatarInput>

          <h1>Meu Perfil</h1>

          <Input name="name" icon={FiUser} type="text" placeholder="seu nome" />
          <Input
            name="email"
            icon={FiMail}
            type="email"
            autoComplete="username"
            placeholder="seu e-mail"
          />

          <hr />

          <Input
            name="oldPassword"
            icon={FiLock}
            type="password"
            placeholder="sua senha"
          />

          <Input
            name="newPassword"
            icon={FiLock}
            type="password"
            autoComplete="new-password"
            placeholder="sua senha"
          />

          <Input
            name="passwordConfirmation"
            icon={FiLock}
            type="password"
            placeholder="sua senha"
          />

          <Button type="submit">Confirma mudança</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
