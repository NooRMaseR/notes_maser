import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import Form from "../components/form";
import api from "../utils/api";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<string[] | null>(null);
  const navigate = useNavigate();

  const onFormSubmit = async (e: FormEvent, name: string, password: string) => {
    setErrors(null);
    e.preventDefault();
    await api
      .put("/user/", { username: name, password: password, email: email })
      .then((response) => {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        localStorage.setItem("username", name);
        navigate("/");
      })
      .catch((error) => {
        setErrors(Object.values<string>(error.response.data));
      });
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center"
      style={{ width: "100%", height: "100svh" }}
    >
      <h1>Sign Up</h1>
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
