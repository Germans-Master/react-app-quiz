import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Quiz from './components/Quiz';
import { Login } from './components/Login';
import { Register } from './components/Register';
jest.mock('./logo_german_mastery.jpg');
jest.mock('./App.css', () => require('./__mocks__/styleMock.js'));

describe('Login Component', () => {
  // Login component tests
  test('clicking on the login button should trigger the onLogin prop if all fields are filled', () => {
    const mockOnLogin = jest.fn();
    render(<Login onLogin={mockOnLogin} />);
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    const loginButton = screen.getByText('Log In');
    fireEvent.click(loginButton);

    expect(mockOnLogin).toHaveBeenCalled();
  });

  test('clicking on the login button should show a validation error message if any field is empty', () => {
    render(<Login />);
    const loginButton = screen.getByText('Log In');
    fireEvent.click(loginButton);
    const validationMessage = screen.getByText('Please fill all fields');
    expect(validationMessage).toBeInTheDocument();
  });

  test('clicking on the register link should trigger the onFormSwitch prop', () => {
    const mockOnFormSwitch = jest.fn();
    render(<Login onFormSwitch={mockOnFormSwitch} />);
    // Find and click the register link
    const registerLink = screen.getByText('Don\'t have an account? Register here.');
    fireEvent.click(registerLink);
    // Verify that the onFormSwitch prop has been called with the correct value
    expect(mockOnFormSwitch).toHaveBeenCalledWith('register');
  });

});

describe('Register Component', () => {
  // Register component tests
  test('triggers onFormSwitch function with "login" argument when "Already have an account? Login here." button is clicked', () => {
    const onFormSwitchMock = jest.fn();
    render(<Register onFormSwitch={onFormSwitchMock} />);
    const loginButton = screen.getByText('Already have an account? Login here.');
    fireEvent.click(loginButton);
    expect(onFormSwitchMock).toHaveBeenCalledWith('login');
  });

  test('updates state when inputs are typed', () => {
    render(<Register />);
    const nameInput = screen.getByLabelText('full name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
    const emailInput = screen.getByLabelText('email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
    const passwordInput = screen.getByLabelText('password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });
});

