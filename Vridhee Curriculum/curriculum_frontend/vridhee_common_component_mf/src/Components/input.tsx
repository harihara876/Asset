import { ChangeEvent, FC } from 'react'
import TextField from '@mui/material/TextField';
import React from "react"

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url'
  label?: string
  value?: string | number
  name?: string
  placeholder?: string
  error?: boolean
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  onKeyDown?:(e: React.KeyboardEvent<HTMLInputElement>)=> void,
}

const AppInput: FC<InputProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
  onKeyDown
}) => {
  return (
    <div className="input-wrapper container">
      <label htmlFor={label}>{label}</label>
      <TextField
        type={type}
        id={label}
        value={value} onKeyDown={onKeyDown}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p className="error">Input filed can't be empty!</p>}
    </div>

  )
}

export default AppInput
