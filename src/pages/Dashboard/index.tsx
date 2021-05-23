import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isToday, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
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
import api from '../../services/apiClient';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface AppointmentsItem {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
  };
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [appointments, setAppointments] = useState<AppointmentsItem[]>([]);

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          month: currentMonth.getMonth() + 1,
          year: currentMonth.getFullYear(),
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get(`/appointments/me`, {
        params: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      })
      .then(response => {
        setAppointments(response.data);
        console.log(response.data);
      });
  }, [selectedDate]);

  const desabledDays = useMemo(() => {
    const date = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });

    return date;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectedDate]);

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
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
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
            disabledDays={[{ daysOfWeek: [0] }, ...desabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
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
