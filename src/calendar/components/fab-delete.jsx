// import { useCalendarStore, useUIStore } from '../../hooks';
import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeleteEvent, hasActiveEvent } = useCalendarStore();
  // const { isDateModalOpen } = useUIStore();

  async function onClickDelete() {
    await startDeleteEvent();
  }

  return (
    <button
      aria-label="fab-delete"
      className="btn btn-danger fab fab-delete"
      onClick={onClickDelete}
      style={{
        // display: hasActiveEvent && !isDateModalOpen ? '' : 'none',
        display: hasActiveEvent ? '' : 'none',
      }}
    >
      <i className="fas fa-trash-alt" />
    </button>
  );
};
