import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AppButton from "../Components/button"
import { Link, useNavigate } from 'react-router-dom';
import configJson from "../config";


const pages = ['Products', 'Pricing', 'Blog'];

export default function Header() {

    const assetUrl = configJson.local.assetUrl;

    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const dashboard_URL = process.env.REACT_ENV?.toLowerCase() == 'local' ? configJson.local.dashboardRouteUrl : configJson.server.dashboardRouteUrl
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    function onClick() {
        navigate('/join-us');
    }

    function doubt() {
        window.location.replace(`${dashboard_URL}doubt-without-login`)
    }

    return (
        <div className="login-header">
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <div className="login-logo">
                            <img src={`${assetUrl}/login/vridhee logo with name.svg`} alt="Vridhee Logo" />
                        </div>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <ul className="menu-bar  mb-2 mb-lg-0">
                                <li className="nav-item"><a className="nav-link" href="#"><img src={`${assetUrl}/login/light on.svg`} alt="" />Light On</a></li>
                                <li className="nav-item"><a className="nav-link" href="#"><img src={`${assetUrl}/login/community.svg`} alt="" />Community</a></li>
                                <li className="nav-item"><a className="nav-link" href="#"><img src={`${assetUrl}/login/learning.svg`} alt="" />Learning</a></li>
                                <li className="nav-item"><a className="nav-link" onClick={doubt}><img src={`${assetUrl}/login/ask , doubt.svg`} alt="" />Doubt</a></li>
                                <li className="nav-item"><AppButton onClick={onClick} children="Join Us" styleClass='btn save-btn primary-bg border-r' /></li>
                            </ul>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}
