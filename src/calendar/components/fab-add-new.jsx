import { addHours } from 'date-fns';
import { useAuthStore, useCalendarStore, useUIStore } from '../../hooks';

export const FabAddNew = () => {
  const { openDateModal } = useUIStore();
  const { setActiveEvent } = useCalendarStore();
  const { user } = useAuthStore();

  function onClickNew() {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 3),
      bgColor: '#fafafa',
      user,
    });
    openDateModal();
  }

  return (
    <button className="btn btn-primary fab fab-add" onClick={onClickNew}>
      <i className="fas fa-plus" />
    </button>
  );
};
