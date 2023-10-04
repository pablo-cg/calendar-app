import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';

export const useUIStore = () => {
  const { isDateModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  function openDateModal() {
    dispatch(onOpenDateModal());
  }

  function closeDateModal() {
    dispatch(onCloseDateModal());
  }

  return {
    isDateModalOpen,
    closeDateModal,
    openDateModal,
  };
};
