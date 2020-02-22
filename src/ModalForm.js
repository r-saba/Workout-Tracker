import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';



export default function ModalForm(props) {
  const { register, handleSubmit, reset } = useForm();

  return (
    <>
      <Modal show={props.showModal} onHide={props.handleClose}>
        <Form onSubmit={handleSubmit(props.updateDays)}>

        <Modal.Header closeButton>
          <Modal.Title>Enter new workout day</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
              <Col>
                <Form.Control name="workoutDay" type="text" placeholder="Workout day" ref={register} />
              </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
      </>
  );
}