import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import { FormControl, FormHelperText, InputLabel, Input, Button } from "@mui/material";
import { setCookie } from "nookies";
import { useRouter} from "next/router";
import Navbar from "../components/Navbar";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    async function handleLogin(e) { 
        e.preventDefault();
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const { error: errorMessage } = await response.json();
                setErrorMessage(errorMessage);
                return;
            }
            
            const { role, userId } = await response.json();

            setCookie(null, 'userId', userId, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            });

            setCookie(null, 'role', role, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            });
            
            if (role === 'student') {
                router.push(`/student/${userId}`);
              } else if (role === 'professor') {
                router.push(`/professor/${userId}`);
              }

        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong');
        }
    
    }

    return(
        <>
            <Navbar />
            <form onSubmit={handleLogin}>
                <div>
                    <Input 
                    id="username" 
                    value={username} 
                    onChange={(event) => setUsername(event.target.value)}
                    />
                    <FormHelperText>Enter your username</FormHelperText>
                </div>
                <div>
                    <Input 
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <FormHelperText>Enter your password</FormHelperText>
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <Button type="submit">
                    Login
                </Button>
            </form>
        </>
    )

}