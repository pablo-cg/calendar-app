import { calendarApi } from '../../src/api/calendar-api';

describe('calendat-api Tests', () => {
  test('debe tener la config por defecto', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test('debe tener el x-token en el header de todas las peticiones', async () => {
    const token = 'test-token';

    localStorage.setItem('token', token);

    const response = await calendarApi.post('/auth', {
      email: 'test@user.com',
      password: '123456',
    });

    expect(response.config.headers['x-token']).toBe(token);
  });
});
