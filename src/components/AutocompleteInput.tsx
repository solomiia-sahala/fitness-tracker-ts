import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Option } from '../interfaces/option.interface';

export default function AutocompleteInput({
  options, selectedOption, inputLabel, handleOptionSelect, formName,
}: {
  options: Option[];
  selectedOption: Option | null;
  inputLabel: string;
  formName: string;
  handleOptionSelect: (formName: string, selectedOption: Option | null) => void
}): JSX.Element {
  return (
    <Autocomplete
      sx={{ width: 300 }}
      value={selectedOption}
      options={options}
      autoHighlight
      getOptionLabel={(option) => option.label}
      onChange={(e, option) => handleOptionSelect(formName, option)}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.icon && option.icon}
          {' '}
          {option.label}
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
