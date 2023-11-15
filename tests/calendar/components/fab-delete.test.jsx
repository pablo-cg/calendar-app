import { fireEvent, render, screen } from '@testing-library/react';
import { FabDelete } from '../../../src/calendar/components/fab-delete';
import { useCalendarStore } from '../../../src/hooks/use-calendar-store';

jest.mock('../../../src/hooks/use-calendar-store');

describe('<FabDelete/> Tests', () => {
  const mockStartDeleteEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('debe de mostrar el componente correctamente', () => {
    useCalendarStore.mockReturnValue({
      hasActiveEvent: false,
    });

    render(<FabDelete />);

    const fabButton = screen.getByLabelText('fab-delete');

    expect(fabButton.classList).toContain('btn');
    expect(fabButton.classList).toContain('btn-danger');
    expect(fabButton.classList).toContain('fab');
    expect(fabButton.classList).toContain('fab-delete');
    expect(fabButton.style.display).toBe('none');
  });

  test('debe de mostrar el boton si hay un evento activo', () => {
    useCalendarStore.mockReturnValue({
      hasActiveEvent: true,
    });

    render(<FabDelete />);

    const fabButton = screen.getByLabelText('fab-delete');

    expect(fabButton.style.display).toBe('');
  });

  test('debe llamar startDeleteEvent al hacerle click con un evento activo', () => {
    useCalendarStore.mockReturnValue({
      hasActiveEvent: true,
      startDeleteEvent: mockStartDeleteEvent,
    });

    render(<FabDelete />);

    const fabButton = screen.getByLabelText('fab-delete');

    fireEvent.click(fabButton);

    expect(mockStartDeleteEvent).toHaveBeenCalled();
  });
});
