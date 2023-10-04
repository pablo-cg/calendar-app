import { addHours, differenceInSeconds } from 'date-fns';
import es from 'date-fns/locale/es';
import { useEffect, useMemo, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useCalendarStore, useUIStore } from '../../hooks';

import 'react-datepicker/dist/react-datepicker.css';
import 'sweetalert2/dist/sweetalert2.min.css';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

registerLocale('es', es);

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUIStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formSubmmited, setFormSubmmited] = useState(false);

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmmited) {
      return '';
    }

    return formValues.title.trim() ? '' : 'is-invalid';
  }, [formValues.title, formSubmmited]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  function onInputChange({ target }) {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  }

  function onDateChange(value, valueName) {
    setFormValues({
      ...formValues,
      [valueName]: value,
    });
  }

  function onCloseModal() {
    closeDateModal();
  }

  async function onSubmit(event) {
    event.preventDefault();
    setFormSubmmited(true);

    const timeDiff = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(timeDiff) || timeDiff <= 0) {
      Swal.fire({
        title: 'Fechas incorrectas',
        text: 'Revisar las fechas ingresadas',
        icon: 'error',
      });
      return;
    }

    if (!formValues.title.trim()) return;

    await startSavingEvent(formValues);
    onCloseModal();
    setFormSubmmited(false);
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      style={modalStyles}
      onRequestClose={onCloseModal}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <h2>Nuevo evento</h2>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2 row">
          <label className="form-label">Fecha y hora inicio</label>
          <section>
            <DatePicker
              locale="es"
              timeCaption="Hora"
              showTimeSelect
              selected={formValues.start}
              className="form-control"
              onChange={(value) => onDateChange(value, 'start')}
              dateFormat="Pp"
            />
          </section>
        </div>

        <div className="form-group mb-2">
          <label className="form-label">Fecha y hora fin</label>
          <section>
            <DatePicker
              locale="es"
              timeCaption="Hora"
              showTimeSelect
              minDate={formValues.start}
              className="form-control"
              selected={formValues.end}
              onChange={(value) => onDateChange(value, 'end')}
              dateFormat="Pp"
            />
          </section>
        </div>

        <hr />
        <div className="form-group mb-2">
          <label className="form-label">Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted fst-italic">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted fst-italic">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
