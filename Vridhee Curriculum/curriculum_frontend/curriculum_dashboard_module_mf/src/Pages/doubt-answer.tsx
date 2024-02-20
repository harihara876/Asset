import * as React from 'react';
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import DashboardService from "../Services/dashboardservices";
import Answer from './answer';

interface IDoubts {
    doubt: [];
}

const drawerWidth = 150;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const DoubtAnswer = () => {

    const [doubts, setDoubts] = React.useState<IDoubts>({
        doubt: []
    });

    React.useEffect(() => {
        DashboardService.getDoubtsList(23, localStorage.getItem('Tokenuserid'))
            .then(res => {
                if (res.data.data) {
                    const updatedState = {
                        ...doubts,
                        doubt: res.data.data,
                    };
                    setDoubts(updatedState);
                    console.log("DUoubtslist>>>", updatedState);
                }
            })
            .catch(e =>
                console.log(e, "e")
            );
    }, [])


    return (
        <div>

            <Answer />

        </div>
    )
}

export default DoubtAnswer