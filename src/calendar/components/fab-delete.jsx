import { useCalendarStore, useUIStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeleteEvent, hasActiveEvent } = useCalendarStore();
  const { isDateModalOpen } = useUIStore();

  async function onClickDelete() {
    await startDeleteEvent();
  }

  return (
    <button
      className="btn btn-danger fab fab-delete"
      onClick={onClickDelete}
      style={{
        display: hasActiveEvent && !isDateModalOpen ? '' : 'none',
      }}
    >
      <i className="fas fa-trash-alt" />
    </button>
  );
};
