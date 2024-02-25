import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

import './TextTareaInput.css';

const TextTareaInput = ({ label, value, handleChange, error }) => {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <InputLabel>{label}</InputLabel>
      <TextareaAutosize
        minRows={5}
        error={error}
        aria-label='maximum height'
        style={{ width: 500, maxWidth: '100%' }}
        value={value}
        onChange={handleChange}
        className='texttarea'
      />
    </Box>
  );
};

export default TextTareaInput;
