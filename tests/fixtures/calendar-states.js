export const events = [
  {
    id: '1',
    start: new Date('2023-10-13 13:00:00'),
    end: new Date('2023-10-13 15:00:00'),
    title: 'Titulo Evento 1',
    notes: 'Notas Evento 1',
    bgColor: '#fafafa',
  },
  {
    id: '2',
    start: new Date('2023-10-14 15:00:00'),
    end: new Date('2023-10-14 18:00:00'),
    title: 'Titulo Evento 2',
    notes: 'Notas Evento 2',
    bgColor: '#fafafa',
  },
];

export const initialState = {
  events: [],
  activeEvent: null,
  isLoadingEvents: true,
};

export const stateWithEvents = {
  events: [...events],
  activeEvent: null,
  isLoadingEvents: false,
};

export const stateWithActiveEvent = {
  events: [...events],
  activeEvent: { ...events[0] },
  isLoadingEvents: false,
};
