import {Box, AppBar, Toolbar, MenuItem } from "@mui/material";
import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ position: "static", background: "#abd699"}}>
                <Toolbar variant="dense">
                <Link href="/" style={{ textDecoration: 'none', color: "#16123f" }}>
                        <MenuItem>
                            Home
                        </MenuItem>
                    </Link>                    
                    <Link href="/lists/classlist" style={{ textDecoration: 'none', color: "#16123f" }}>
                        <MenuItem>
                            Class List
                        </MenuItem>
                    </Link>
                    <Link href="/lists/students" style={{ textDecoration: 'none', color: "#16123f" }}>
                        <MenuItem>
                            Student List
                        </MenuItem>
                    </Link>
                    <Link href="/lists/professors" style={{ textDecoration: 'none', color: "#16123f" }}>
                        <MenuItem>
                            Professor List
                        </MenuItem>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
        </>
    )
}