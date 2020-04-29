import React from 'react';

const Modal = props => {

  const {
    children,
    id,
    title,
    isOpen,
    className,
    closeModal
  } = props;


  return (
    <div className={`modal__container modal__container--${isOpen ? 'open' : 'closed'}`}>
      <div className={`modal ${className}`} id={id}>
        <div className="modal__header">
          <div className="modal__title">{ title }</div>
          <div className="modal__close" onClick={ closeModal }>Close</div>
        </div>
        <div className="modal__content">
          { children }
        </div>
      </div>
      <div className="modal__backdrop" onClick={ closeModal }></div>
    </div>
  );
};

export default Modal;
