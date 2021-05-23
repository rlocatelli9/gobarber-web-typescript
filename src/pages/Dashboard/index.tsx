import React from 'react';

import { FiClock, FiPower } from 'react-icons/fi';
import {
  Container,
  CustomHeader,
  CustomHeaderContent,
  CustomProfile,
  CustomContent,
  CustomSchedule,
  CustomCalendar,
  CustomNextAppointment,
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

      <CustomContent>
        <CustomSchedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <CustomNextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/36084116?v=4"
                alt="Robson Locatelli"
              />

              <strong>Robson Locatelli</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </CustomNextAppointment>
        </CustomSchedule>
        <CustomCalendar />
      </CustomContent>
    </Container>
  );
};

export default Dashboard;
