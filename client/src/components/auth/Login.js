import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Typography from '@material-ui/core/Typography';
import 'react-toastify/dist/ReactToastify.css';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import '../../styles/login.scss';

import { ToastContainer, toast } from 'react-toastify';

import { Jumbotron, Badge } from 'reactstrap';
import GoogleBtn from '../googleBtn'
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
  );
}

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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const domain = `${process.env.REACT_APP_BACKEND_DOMAIN}`
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, seterror] = useState('')

  const hanleEmailChange = (e) => {
    const { target: { value } } = e;
    setEmailInput(value);
  }

  const hanlePasswordChange = (e) => {
    const { target: { value } } = e;
    setPasswordInput(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: `${domain}/users/login`,
      data: {
        email: emailInput,
        password: passwordInput
      }
    }).then((response, err) => {
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      console.log(err)
      console.log(user)
      localStorage.setItem("user", JSON.stringify(user));
      setEmailInput('');
      setPasswordInput('');
      if(user.role === 'customer') window.location.href = "http://localhost:3000/";
      else if(user.role === 'admin') window.location.href = "http://localhost:3000/admin/landing";
      else if(user.role === 'serviceowner') window.location.href = "http://localhost:3000/service-owner/landing";
      else if(user.role === 'productowner') window.location.href = "http://localhost:3000/product-owner/landing";
    }, (error) => {
      console.log('====================================');
      console.log(error.response.data.msg, "ERRROR");

      console.log('====================================');

      if (error.response.data.msg == "Please Confirm your email to login") {
        seterror("Please Confirm your email to login");
        error.message = "Please Confirm your email to login";
      }
      else {      
        error.message = "Email or password are wrong";
        seterror(error.message)
      }
      toast(error.message)
    });


  }

  const classes = useStyles();
  //   useEffect(() => {
  //     (async function () {
  //         try {
  //             let response = await axios.get(
  //                 `${domain}/users/logincheck`, {
  //                 headers: {
  //                     'Authorization': 'Bearer ' + localStorage.getItem("token")
  //                 }
  //             }
  //             ).then((response) => {
  //                 console.log('====================================');
  //                 console.log("Response  ::  ",response);
  //                 console.log('====================================');
  //                 if (response.status === 200) {
  //                     setIsLoggedIn(true);
  //                     sessionStorage.setItem("user", JSON.stringify(response.data.user));
  //                     sessionStorage.setItem("loggedIn", JSON.stringify(true));
  //                 }
  //             });


  //         } catch (error) {
  //             console.log("error is ...", error);
  //         }
  //     })();
  // }, []);

  // if (isLoggedIn == false) {

  return (
    <Container component="main" maxWidth="xs">

      <div>
       
        {
          error ?
            <ToastContainer /> : null}
      </div>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
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
            onChange={hanleEmailChange}
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
            onChange={hanlePasswordChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
          <Grid item xs>
          <GoogleBtn />
          </Grid>
            <Grid item s>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
  // }
  // else{return (
  //                 <div className="container">
  //                     <Jumbotron>
  //                         <h1 style={{ textAlign: "center" }}><Badge color="secondary" >Welcome to Admin Panel</Badge></h1>
  //                     </Jumbotron>

  //                 </div>
  //             );

  // }

}