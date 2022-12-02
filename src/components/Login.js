import { useState } from "react";

const Login = (props) =>{


const [username, setUsername] = useState()
const [email, setEmail] = useState()
const [password, setPassword] = useState()


    const submitHandler = (event) =>{
      event.preventDefault();

      const formData = {
        username: username,
        password: password,
        email: email};

      (props.registerFormMode.current) ? props.submitRegisterHandler(formData) : props.submitLoginHandler(formData);
    }
  
    return (
      <>
      <div className="loginForm">
        <form onSubmit = {submitHandler}>
              
          <input placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
          {(props.registerFormMode.current) ? <input placeholder="Email" onChange={(event) => setEmail(event.target.value) } /> : <></>}
          <input placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
      
          <button type='submit'>{(props.registerFormMode.current) ? "Register" : "Login"}</button>
        </form>
      </div>
      
      </>
    )
  }

export default Login;
