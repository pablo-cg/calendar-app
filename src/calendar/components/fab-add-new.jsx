import { addHours } from 'date-fns';
import { useCalendarStore, useUIStore } from '../../hooks';

export const FabAddNew = () => {
  const { openDateModal } = useUIStore();
  const { setActiveEvent } = useCalendarStore();

  function onClickNew() {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 3),
      bgColor: '#fafafa',
    });
    openDateModal();
  }

  return (
    <button className="btn btn-primary fab fab-add" onClick={onClickNew}>
      <i className="fas fa-plus" />
    </button>
  );
};
