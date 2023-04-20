import React from "react";
import Link from "next/link";
import { Box, AppBar, Toolbar, MenuItem } from "@mui/material";

const Navbar: React.FC = () => {
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ position: "static" }}>
                <Toolbar variant="dense">
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <MenuItem>
                            Home
                        </MenuItem>
                    </Link>
                    <Link href="/lists/classList" style={{ textDecoration: 'none' }}>
                        <MenuItem>
                            Class List
                        </MenuItem>
                    </Link>
                    <Link href="/lists/professorList" style={{ textDecoration: 'none' }}>
                        <MenuItem>
                            Professor List
                        </MenuItem>
                    </Link>
                    <Link href="/lists/studentList" style={{ textDecoration: 'none' }}>
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