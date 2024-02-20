import React from "react";
import Button from '@mui/material/Button';

interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    styleClass?: string;
    disabled?: boolean
}

const AppButton: React.FC<Props> = ({
    styleClass,
    children,
    onClick,
    disabled
}) => {
    return (
        <Button
            onClick={onClick} disabled={disabled}
            className={styleClass} >
            {children}
        </Button>
    );
}

export default AppButton;
