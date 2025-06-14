import { useState } from "react";
import { useLogin } from "./useLogin";
import { login } from "../../services/apiAuth";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from '../../ui/SpinnerMini'

function LoginForm() {
  const [email, setEmail] = useState("xyz@example.com");
  const [password, setPassword] = useState("");
  const {loginFn, isLoading} = useLogin()

  function handleSubmit(e) {
    e.preventDefault()
    if(!email && !password) return

    loginFn({email,password},{
      onSettled:()=>{
        setEmail('')
        setPassword('')
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button  size="large" disabled={isLoading}>
          {!isLoading?'Login':<SpinnerMini/>}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
