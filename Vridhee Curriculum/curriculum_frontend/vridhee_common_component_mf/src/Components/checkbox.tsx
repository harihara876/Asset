import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Checbox() {
  return (
    <div>
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="By clicking Create account, I agree that I have read and accepted the Terms of Use and Privacy Policy." />
      </FormGroup>
    </div>
  );
}




