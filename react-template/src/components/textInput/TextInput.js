import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import './TextInput.css';

const TextInput = ({ label, handleChange, id, value, error }) => {
  return (
    <div className='inputComponent'>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        <TextField
          fullWidth
          error={error}
          label={label}
          id={id}
          onChange={handleChange}
          value={value}
        />
      </Box>
    </div>
  );
};

export default TextInput;
