import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { TextField, Button, MenuItem } from '@mui/material';
import { z } from 'zod';
import { MuiTelInput } from 'mui-tel-input'
import { database, databasePath } from '../firebaseConfig/firebase';
import { ref, push, set } from 'firebase/database';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Col, Modal, Row } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./FormComponent.scss"

const schema = z.object({
  fullName: z.string({}).min(1,{message: "Please enter your full name"}),
  phoneNumber: z.string().min(7, {message: "Please enter valid phone number"}),
  email: z.string().email({message: "Please enter your email"}),
  password: z.string().min(8, {message: "Password must contains at least 8 characters"}),
  jobType: z.string().refine((val) => val.trim() !== '', {
    message: 'Job type is required',
  }),
  termsAgreement: z.boolean().refine((val) => val, {
    message: 'Terms and Conditions must be accepted',
  }),
});


const TermsModal = ({ showModal, handleClose }) => (
  <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Terms and Conditions</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {/* Add your terms and conditions content here */}
      Your terms and conditions content goes here.
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);



const FormComponent = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [value, setValue] = React.useState('')

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const databaseRef = ref(database, databasePath);

  const onSubmit = async (data) => {
    try {
      const newDataRef = push(databaseRef);
      await set(newDataRef, data);

      toast.success('Form submitted successfully!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      console.log('Form data submitted successfully:', data);
    } catch (error) {

      toast.error('Error submitting form data. Please try again.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.error('Error submitting form data to Firebase:', error.message);
    }
  };

  const validateTerms = () => {
    const termsAgreement = ""
    return termsAgreement ? undefined : 'Terms and Conditions must be accepted';
  };

  return (
    <div>
      <Row className="my-4">
    <Col>
      <Card className="w-50 mx-auto">
        <h2 className="mx-auto">Basic Form</h2>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Row className='mb-3 mx-5'>
      <TextField
        label="Full Name"
        {...register('fullName')}
        error={!!errors.fullName}
        size='small'
        helperText={errors.fullName?.message}
      />
      </Row>

      <Row className='mb-3 mx-5'>
      <MuiTelInput
      label="Phone Number"
      {...register('phoneNumber')}
      error={!!errors.phoneNumber}
      helperText={errors.phoneNumber?.message}
      size='small'
      value={value} onChange={handleChange}
      />
      </Row>

      <Row className='mb-3 mx-5'>
      <TextField
        label="Email Address"
        {...register('email')}
        error={!!errors.email}
        size='small'
        helperText={errors.email?.message}
      />
      </Row>

      <Row className='mb-3 mx-5'>
      <TextField
        label="Password"
        type="password"
        {...register('password')}
        error={!!errors.password}
        size='small'
        helperText={errors.password?.message}
      />
      </Row>

      <Row className='mb-4 mx-5'>
      <TextField
        select
        label="Job Type"
        {...register('jobType')}
        error={!!errors.jobType}
        size='small'
        helperText={errors.jobType?.message}
      >
        <MenuItem value="IT">IT</MenuItem>
        <MenuItem value="Marketing">Marketing</MenuItem>
        <MenuItem value="Business Development">Business Development</MenuItem>
      </TextField>
      </Row>
            
      <Row className='mb-4 mx-4'>
  <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleShow}>
    <input
    className='mx-3'
      type="checkbox"
      {...register('termsAgreement', { validate: validateTerms })}
    />
    <span style={{textDecoration: 'underline'}}>I agree to the Terms and Conditions</span>
  </div>
  {errors.termsAgreement && (
    <p className="text-danger mx-3">{errors.termsAgreement?.message}</p>
  )}
  <TermsModal showModal={showModal} handleClose={handleClose} />
</Row>





            <Row>
              <Button
                className="mx-auto rounded-5"
                style={{
                  width: 'fit-content',
                  color: '#153C3F',
                  backgroundColor: '#00C8E1',
                }}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Row>
          </form>
        </Card.Body>
      </Card>
    </Col>
  </Row>

  <ToastContainer />
    </div>
  )
}

export default FormComponent