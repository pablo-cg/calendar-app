import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuthStore } from '../../src/hooks/use-auth-store';
import { AppRouter } from '../../src/router/app-router';

jest.mock('../../src/hooks/use-auth-store');
jest.mock('../../src/calendar/pages/calendar-page', () => {
  return {
    CalendarPage: () => <h1>CalendarPage</h1>,
  };
});

describe('<AppRouter /> Tests', () => {
  const mockCheckToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('debe mostrar la pantalla de carga y llamar checkToken', () => {
    useAuthStore.mockReturnValue({
      status: 'checking',
      checkToken: mockCheckToken,
    });

    render(<AppRouter />);

    expect(mockCheckToken).toHaveBeenCalled();
    expect(screen.getByText('Cargando...')).toBeTruthy();
  });

  test('debe mostrar la pantalla de login si no esta autenticado', () => {
    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkToken: mockCheckToken,
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/auth']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('Ingreso')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('debe mostrar la el calendario si esta autenticado', () => {
    useAuthStore.mockReturnValue({
      status: 'authenticated',
      checkToken: mockCheckToken,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('CalendarPage')).toBeTruthy();
  });
});
