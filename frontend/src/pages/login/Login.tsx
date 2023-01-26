import { Button, Input, Spin } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInQuery } from '../../graphql/mutations/signInGraphql';
import { apiCaller } from '../../utils/axios-request-caller';
import './login.scss';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    //Prevent page reload
    event.preventDefault();
    if (username.length !== 0 && password.length !== 0) {
      setIsLoading(true);
      const graphqlQuery = {
        operationName: 'signIn',
        query: SignInQuery,
        variables: {
          username: username,
          password: password,
        },
      };
      const res: any = await apiCaller(graphqlQuery, '');
      if (res.data.data.signIn.token !== null) {
        localStorage.setItem('token', res.data.data.signIn.token);
        navigate('/home/');
        setIsLoading(false);
        window.location.reload();
      } else {
        alert(res.data.data.signIn.message);

        setIsLoading(false);
      }
    } else {
      alert('Username and password is required!');
    }
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="label_login">Username </label>
          <Input
            className="login_input"
            type="text"
            placeholder="Username"
            name="uname"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <label className="label_login">Password </label>
          <Input
            className="login_input"
            type="password"
            placeholder="Password"
            name="pass"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="button-container">
          {
            <Button type="primary" disabled={isLoading} onClick={handleSubmit}>
              {isLoading ? <Spin /> : 'Signin'}
            </Button>
          }
        </div>
      </form>
    </div>
  );

  return (
    <div className="login">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
}

export default Login;
