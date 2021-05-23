import React, { useCallback, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

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
  CustomSection,
  CustomAppointment,
} from './styles';

import logo from '../../assets/logo.svg';
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

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

          <CustomSection>
            <strong>Manhã</strong>

            <CustomAppointment>
              <span>
                <FiClock />
                08:00
              </span>
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
            </CustomAppointment>
            <CustomAppointment>
              <span>
                <FiClock />
                08:00
              </span>
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
            </CustomAppointment>
          </CustomSection>

          <CustomSection>
            <strong>Tarde</strong>

            <CustomAppointment>
              <span>
                <FiClock />
                08:00
              </span>
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
            </CustomAppointment>
          </CustomSection>
        </CustomSchedule>
        <CustomCalendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </CustomCalendar>
      </CustomContent>
    </Container>
  );
};

export default Dashboard;
