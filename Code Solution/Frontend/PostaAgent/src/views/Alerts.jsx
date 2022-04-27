import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Modal } from "react-bootstrap";

function Alerts() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleClose}>
            Ne Rregull
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

//render(<Alerts />);

export default Alerts;
