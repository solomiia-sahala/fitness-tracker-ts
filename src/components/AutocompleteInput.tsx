import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Option } from '../interfaces/option.interface';

export default function AutocompleteInput({ options, selectedOption, inputLabel, handleOptionSelect, formName }: {
  options: Option[];
  selectedOption?: any;
  inputLabel: string;
  formName: string;
  handleOptionSelect: Function
}) {

  return (
    <Autocomplete
      sx={{ width: 300 }}
      options={options}
      autoHighlight
      getOptionLabel={(option) => option.label}
      onChange={(e, newValue) => handleOptionSelect(formName, newValue?.label)}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.icon && option.icon} {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={inputLabel}
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}