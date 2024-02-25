import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const LoginInput = ({ label, handleChange, id, value, type }) => {
  return (
    <div className='inputComponent'>
      <Box
        sx={{
          width: 350,
          maxWidth: '100%',
        }}
      >
        <TextField
          required
          fullWidth
          label={label}
          id={id}
          onChange={handleChange}
          value={value}
          type={type}
        />
      </Box>
    </div>
  );
};

export default LoginInput;
