import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import {Redirect, useLocation} from 'react-router';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {login} from '../redux/auth/authActions';
import logo from '../../starwars-logo.png';

interface AuthType {
  loggingIn?: boolean;
  loggedIn?: boolean;
  error?: boolean;
}

interface LocationState {
  from: {
    pathname: string;
  };
}
const schema = yup.object().shape({
  email: yup.string().email().required('E-mail is required'),
  password: yup.string().required('Password is required'),
});

export default function Login() {
  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
  });
  const auth = useSelector(({auth}: {auth: AuthType}) => auth);
  const dispatch = useDispatch();
  const location = useLocation<LocationState>();
  const {from} = location.state || {from: {pathname: '/people'}};

  const onSubmit = handleSubmit(({email, password}) => {
    dispatch(login(email, password));
  });

  if (auth && auth.loggedIn) return <Redirect to={from} />;
  return (
    <div className="login">
      <img src={logo} alt='Star Wars' className='logo'/>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="e-mail" name="email" ref={register} />
        <p className="login-error">{errors.email?.message} </p>
        <input
          type="password"
          placeholder="password"
          name="password"
          ref={register}
        />
        <p className="login-error"> {errors.password?.message} </p>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
      {auth.error && (
        <span className="login-error">Invalid username or password</span>
      )}
    </div>
  );
}
