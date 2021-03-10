import React from 'react'
import {useHttp} from "../hooks/http.hooks";
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {CircularProgress} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import {AuthContext} from "../context/auth.context";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        height: theme.palette
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}))

const AuthPage = () => {
    const auth = React.useContext(AuthContext)
    const {isLoading, request, error, clearError} = useHttp()
    const classes = useStyles()

    const [form, setForm] = React.useState({
        email: '', password: ''
    })
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
        clearError()
    }

    const registerHandler = async () => {
        try {
            await request('/api/auth/register', 'POST', {...form})
            await loginHandler()
        } catch (e) {

        }
    }

    const loginHandler = async (event) => {
        event && event.preventDefault()
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={form.email}
                        onChange={changeHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={form.password}
                        onChange={changeHandler}
                    />
                    <Button
                        type="primary"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isLoading}
                        onClick={loginHandler}
                    >
                        {isLoading ? <CircularProgress color="secondary"/>
                            : "Sign In"}
                    </Button>
                    <Button disabled={isLoading} color="primary" onClick={registerHandler} fullWidth>
                        {isLoading ? <CircularProgress color="secondary"/>
                            : "Don't have an account? Sign Up"}
                    </Button>
                </form>
            </div>

            {error && <Alert severity="error">{error}</Alert>}

            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    )
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default AuthPage
