import { useDispatch } from "react-redux";
import { setHasToken } from "../utils/store";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import Form from "../components/form";
import api from "../utils/api";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<string[] | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFormSubmit = async (e: FormEvent, name: string, password: string) => {
    e.preventDefault();
    setErrors(null);
    try {
      const res = await api.put("/user/", { username: name, password, email })
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("username", name);
      dispatch(setHasToken(true));
      navigate("/");
    } catch (error: any) {
      setErrors(Object.values<string>(error.response.data));
      dispatch(setHasToken(false));
    }
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center"
      style={{ width: "100%", height: "100svh" }}
    >
      <h1 className="text-center">Sign Up</h1>
      <Form onSubmit={onFormSubmit} submitText="Register" errors={errors}>
        <input
          type="email"
          placeholder="email..."
          inputMode="email"
          name="email"
          className="form-control form-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </Form>
    </div>
  );
}
