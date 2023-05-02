import React from "react";
import Link from "next/link";
import { Box, AppBar, Toolbar, MenuItem } from "@mui/material";

const Navbar: React.FC = () => {
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ position: "static" }} style={{ backgroundColor: '#527bc4'}}>
                <Toolbar variant="dense">
                    <Link href="/" style={{ textDecoration: 'none', color: 'whitesmoke' }}>
                        <MenuItem>
                            Home
                        </MenuItem>
                    </Link>
                    <Link href="/lists/classList" style={{ textDecoration: 'none', color: 'whitesmoke' }}>
                        <MenuItem>
                            Class List
                        </MenuItem>
                    </Link>
                    <Link href="/lists/professorList" style={{ textDecoration: 'none', color: 'whitesmoke' }}>
                        <MenuItem>
                            Professor List
                        </MenuItem>
                    </Link>
                    <Link href="/lists/studentList" style={{ textDecoration: 'none', color: 'whitesmoke' }}>
                        <MenuItem>
                            Student List
                        </MenuItem>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;