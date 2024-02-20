import React, { FC } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface InputProps {
    id?: string
    options?: any
    value?: string | number
    styleClass?: string
    onChange?: any
}

const AutocompleteSearch: FC<InputProps> = ({
    id,
    options,
    value,
    onChange

}) => {
    return (
        <div>
            <Autocomplete
                id={id} value={value}
                options={options} onChange={onChange}
                renderInput={(params) => <TextField {...params} InputProps={{
                    ...params.InputProps,
                    type: 'search',
                }} />}
            />
        </div>
    );
}


export default AutocompleteSearch;
