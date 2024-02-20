import React, { ChangeEvent, FC } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import IUser from "../Models/IUser";

interface InputProps {
  id?: string
  name?: string
  selectedValue?: string
  title?: string
  placeholder?: string
  options?: any
  selectStyle?: string
  handleChange?: (e: SelectChangeEvent<unknown>) => void
}

const handleChange = (e: SelectChangeEvent) => {

};

const Dropdown: FC<InputProps> = ({
  id,
  name,
  options,
  title,
  selectStyle,
  handleChange,
  selectedValue
}) => {
  return (

    <div>
      <Select
        id={id}
        name={name}
        onChange={handleChange}
        value={selectedValue}
        className={selectStyle}
        input={<OutlinedInput />}
        displayEmpty

        renderValue={(selected: string) => {
          console.log(selected, "selected")
          if (!selected) {
            return <div style={{ color: 'lightgrey' }}>{title}</div>;
          } else {
            return <div>{selectedValue}</div>;
          }
        }}
        inputProps={{ 'aria-label': 'Without label' }}>

        <MenuItem value="">
          {title}
        </MenuItem>
        {options.map((option: IUser) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Select>

    </div>
  );
}

export default Dropdown;
