import { ChangeEvent, FC } from 'react'
import Textarea from '@mui/joy/Textarea';
import React from "react"


interface InputProps {
  label?: string
  value?: string | number
  name?: string
  placeholder?: string
  error?: boolean
  disabled?: boolean
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}


const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  // do the rest here
}


const AppTextarea: FC<InputProps> = ({
  label,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
}) => {

  return (
    <div className="input-wrapper container">
      <label htmlFor={label}>{label}</label>
      <Textarea
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p className="error">Input filed can't be empty!</p>}
    </div>

  )
}

export default AppTextarea