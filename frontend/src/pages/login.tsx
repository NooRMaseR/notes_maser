import * as actions from "../utils/storeActions";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import Form from "../components/form";
import api from "../utils/api";

export default function Login({setHeadState}: {setHeadState: (state: boolean) => void}) {
  const [errors, setErrors] = useState<string[] | null>(null);
  const navigate = useNavigate();
  const onFormSubmit = async (e: FormEvent, name: string, password: string) => {
    e.preventDefault();
    setErrors(null);
    api
      .post("/user/", { username: name, password: password })
      .then((response) => {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        localStorage.setItem("username", name);
        // actions.updateState("hasToken", true);
        setHeadState(true);
        navigate("/");  
      })
      .catch((error) => {
        console.table(error.response.data);
        setErrors(Object.values<string>(error.response.data));
        actions.removeState('hasToken');
      });
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center"
      style={{ width: "100%", height: "100svh" }}
    >
      <h1>Login</h1>
      <Form onSubmit={onFormSubmit} submitText="Login" errors={errors} />
    </div>
  );
}
