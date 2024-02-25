import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (name, personName, theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const MultipleSelect = ({ label, options, handleChange, values, error }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        fullWidth
        error={error}
        value={typeof values === 'string' ? values.split(',') : values}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
      >
        {options.map((value) => (
          <MenuItem
            key={value.id}
            value={value.value}
            style={getStyles(value.label, values, theme)}
          >
            {value.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default MultipleSelect;
