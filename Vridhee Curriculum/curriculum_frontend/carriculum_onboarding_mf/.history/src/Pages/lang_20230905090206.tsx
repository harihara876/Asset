import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
const drawerWidth = 300;

export default function Lang(){
    
    return(
        <div>
             <Box sx={{ display: 'flex' }}>
             <CssBaseline />
             <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"  >
                <div className="sidebar-sec">
                    
                </div>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}  >


                </Box>
             </Box>
        </div>
    );
}