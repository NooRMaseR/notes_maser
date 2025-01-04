import { useState, FormEvent, ReactNode } from "react";
import Indicator from "../components/indicator";
import Error_p from "./error_p";

interface FormProps {
  submitText?: string;
  onSubmit: (e: FormEvent, name: string, password: string) => Promise<void> | void;
  errors?: string[] | null;
  children?: ReactNode;
}

export default function Form({submitText = "Submit", onSubmit, errors, children}: FormProps) {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div
      className="container d-flex justify-content-center gap-2"
      style={{ width: "100%", height: "16rem" }}
    >
      <form
        onSubmit={async (e: FormEvent) => {
          setLoading(true);
          try {
            await onSubmit(e, name, password);
          } finally {
            setLoading(false);
          }
        }}
        className="form form-control d-flex flex-column justify-content-center gap-3 text-center"
      >
        <input
          type="text"
          placeholder="username..."
          className="form-control form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password..."
          className="form-control form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {children}
        {loading && <Indicator />}
        {errors && errors.map((e) => <Error_p text={e} key={e} />)}
        <button type="submit" className="btn btn-secondary">{submitText}</button>
      </form>
    </div>
  );
}
