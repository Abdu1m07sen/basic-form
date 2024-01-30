import React from 'react'
import { useForm } from 'react-hook-form';
import { TextField, Button, MenuItem } from '@mui/material';
import { z } from 'zod';
import { MuiTelInput } from 'mui-tel-input'
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Col, Row } from "react-bootstrap"
import "./FormComponent.scss"

const schema = z.object({
  fullName: z.string().min().refine((val) => val.trim() !== '', {
    message: 'Full name is required',
  }),
  phoneNumber: z.string().min().refine((val) => val.trim() !== '', {
    message: 'Phone number is required',
  }),
  email: z.string().email('Invalid email format').refine((val) => val.trim() !== '', {
    message: 'Email is required',
  }),
  password: z.string().min(8).refine((val) => val.trim() !== '', {
    message: 'Password is required',
  }),
  jobType: z.string().refine((val) => val.trim() !== '', {
    message: 'Job type is required',
  }),
});
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Row className='my-4'>
      <Col >
      <Card className='w-50 mx-auto'>
      <h2 className='mx-auto'>Basic Form</h2>
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

      <Row>
      <Button
      className='mx-auto rounded-5'
      style={
        {width: "fit-content",
         color: "#153C3F",
         backgroundColor: "#00C8E1"
        }
         } type="submit" variant='contained'>Submit</Button>
      </Row>

    </form>
        
      </Card.Body>
    </Card>
      </Col>
    </Row>
  )
}

export default FormComponent