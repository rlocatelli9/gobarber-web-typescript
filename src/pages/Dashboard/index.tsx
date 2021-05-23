import React from 'react';

import { FiPower } from 'react-icons/fi';
import {
  Container,
  CustomHeader,
  CustomHeaderContent,
  CustomProfile,
} from './styles';

import logo from '../../assets/logo.svg';
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <CustomHeader>
        <CustomHeaderContent>
          <img src={logo} alt="GoBarber" />

          <CustomProfile>
            <img src={user.avatarUrl} alt={user.name} />
            <div>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </div>
          </CustomProfile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </CustomHeaderContent>
      </CustomHeader>
    </Container>
  );
};

export default Dashboard;
