import { addHours } from 'date-fns';
import es from 'date-fns/locale/es';
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';

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
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

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
    setIsModalOpen(false);
  }

  return (
    <Modal
      isOpen={isModalOpen}
      style={modalStyles}
      onRequestClose={onCloseModal}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <h2>Nuevo evento</h2>
      <hr />
      <form className="container">
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
            className="form-control"
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