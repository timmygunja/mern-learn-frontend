import Button from './Button';
import React from 'react';

import Modal from './Modal';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Возникла ошибка!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Ок</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
