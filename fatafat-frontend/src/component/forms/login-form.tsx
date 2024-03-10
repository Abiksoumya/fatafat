import { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./form.css"; // You can style your form in LoginForm.css
import { useLogin } from "../../mutation/use-login";
import { useForm, SubmitHandler } from "react-hook-form";

type LoginFormInputs = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const loginMutation = useLogin();

  const submitForm: SubmitHandler<LoginFormInputs> = (data) => {
    // Handle login logic here
    console.log(data);
    loginMutation.mutate({
      username: data.username,
      password: data.password,
    });
  };

  return (
    <div className="login-form mt-4">
      <form onSubmit={handleSubmit(submitForm)} ref={formRef}>
        <div className="p-field">
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            className="mt-2"
            {...register("username", { required: true })}
          />
        </div>
        <div className="p-field">
          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <InputText
            className="mt-2"
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
        </div>
        <Button
          label="Login"
          // onClick={() => {
          //   formRef.current?.submit();
          // }}
          type="submit"
        />
      </form>
    </div>
  );
};

export default LoginForm;
