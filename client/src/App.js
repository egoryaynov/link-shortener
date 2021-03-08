import React from 'react'
import {useRoutes} from "./routes";
import {Container} from "@material-ui/core";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/auth.context";
import Navbar from "./components/Navbar/Navbar";

function App() {
    const {login, logout, token, userId} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuth
        }}>
            <Container>
                {isAuth && <Navbar/>}

                {routes}
            </Container>
        </AuthContext.Provider>
    )
}

export default App