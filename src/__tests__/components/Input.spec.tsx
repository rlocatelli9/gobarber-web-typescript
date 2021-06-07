import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField: () => {
      return {
        fieldname: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input Component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );
    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const constainerElement = getByTestId('input-container-focus');

    fireEvent.focus(inputElement);

    await waitFor(() => {
      expect(constainerElement).toHaveStyle('border-color: #ff9000');
      expect(constainerElement).toHaveStyle('color: #ff9000');
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(constainerElement).not.toHaveStyle('border-color: #ff9000');
      expect(constainerElement).not.toHaveStyle('color: #ff9000');
    });
  });

  it('should keep border highlight when input is filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const constainerElement = getByTestId('input-container-focus');

    fireEvent.change(inputElement, {
      target: { value: 'fulano.tal@email.com.br' },
    });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(constainerElement).toHaveStyle('color: #ff9000');
    });
  });
});
