import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { setHasToken } from "../utils/store";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../components/form";
import api from "../utils/api";

export default function Login() {
  const [errors, setErrors] = useState<string[] | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFormSubmit = async (e: FormEvent, name: string, password: string) => {
    e.preventDefault();
    setErrors(null);
    try {
      const res = await api.post("/user/", { username: name, password })
      if (res.status == 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem("username", name);
        dispatch(setHasToken(true));
        navigate("/");
      }
    } catch (error: any) {
      console.error(error);
      setErrors(Object.values<string>(error.response.data));
      dispatch(setHasToken(false));
    }
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center"
      style={{ width: "100%", height: "100svh" }}
    >
      <h1 className="text-center">Login</h1>
      <Form onSubmit={onFormSubmit} submitText="Login" errors={errors} />
    </div>
  );
}
