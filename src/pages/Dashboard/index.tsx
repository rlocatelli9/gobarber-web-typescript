import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
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
import avatarDefault from '../../assets/avatar-nude.png';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/apiClient';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface AppointmentsItem {
  id: string;
  hourFormated: string;
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
    if (modifiers.available && !modifiers.disabled) {
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
      .get<AppointmentsItem[]>(`/appointments/me`, {
        params: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      })
      .then(response => {
        const appointmentsFormated = response.data.map(appointment => {
          return {
            ...appointment,
            hourFormated: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        setAppointments(appointmentsFormated);
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

  const mormingAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

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

          {isToday(selectedDate) && nextAppointment && (
            <CustomNextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src={nextAppointment.user.avatarUrl}
                  alt={nextAppointment.user.name}
                />

                {!nextAppointment.user.avatarUrl && (
                  <img src={avatarDefault} alt={nextAppointment.user.name} />
                )}

                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormated}
                </span>
              </div>
            </CustomNextAppointment>
          )}

          <CustomSection>
            <strong>Manhã</strong>

            {mormingAppointments.length === 0 && (
              <p>Nenhum agendamento para esse período</p>
            )}

            {mormingAppointments.map(appointment => (
              <CustomAppointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormated}
                </span>
                <div>
                  {appointment.user.avatarUrl && (
                    <img
                      src={appointment.user.avatarUrl}
                      alt={appointment.user.name}
                    />
                  )}

                  {!appointment.user.avatarUrl && (
                    <img src={avatarDefault} alt={appointment.user.name} />
                  )}

                  <strong>{appointment.user.name}</strong>
                </div>
              </CustomAppointment>
            ))}
          </CustomSection>

          <CustomSection>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento para esse período</p>
            )}

            {afternoonAppointments.map(appointment => (
              <CustomAppointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormated}
                </span>
                <div>
                  {appointment.user.avatarUrl && (
                    <img
                      src={appointment.user.avatarUrl}
                      alt={appointment.user.name}
                    />
                  )}

                  {!appointment.user.avatarUrl && (
                    <img src={avatarDefault} alt={appointment.user.name} />
                  )}

                  <strong>{appointment.user.name}</strong>
                </div>
              </CustomAppointment>
            ))}
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
