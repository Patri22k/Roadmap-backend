import AuthLayout from "../layouts/AuthLayout.tsx";
import {useState} from "react";
import * as React from "react";
import {registerUser} from "../api/auth.ts";
import CustomLink from "../components/Link.tsx";

const Register = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await registerUser(name, email, password);

    // Reset errors
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setError(null);

    if (!response.success) {
      if (Array.isArray(response.error.errors)) {
        const errorsByField = response.error.errors.reduce((acc: Record<string, string>, err: any) => {
          const field = err.path && err.path[0];
          if (field) {
            acc[field] = err.message;
          }
          return acc;
        }, {});

        setNameError(errorsByField.name || null);
        setEmailError(errorsByField.email || null);
        setPasswordError(errorsByField.password || null);
      } else {
        setError(response.error.message);
      }
    } else {
      // TODO: Handle successful registration, e.g., redirect to login page or show success message
    }
  };

  return (
    <AuthLayout>
      <AuthLayout.Header>
        <h1 className="text-3xl">Register new account</h1>
      </AuthLayout.Header>
      <AuthLayout.Main>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 w-full">
          <input className="py-2 border rounded pl-2" type="text" onChange={(e) => setName(e.target.value)}
                 value={name} placeholder="John Doe"/>
          {nameError && <p className="text-red-700">{nameError}</p>}
          <input className="py-2 border rounded pl-2" type="email"
                 onChange={(e) => setEmail(e.target.value)} value={email} placeholder="john@doe.com"/>
          {emailError && <p className="text-red-700">{emailError}</p>}
          <input className="py-2 border rounded pl-2" type="password"
                 onChange={(e) => setPassword(e.target.value)} value={password} placeholder="123456789"/>
          {passwordError && <p className="text-red-700">{passwordError}</p>}
          <button
            className="text-sm sm:text-base lg:text-xl px-6 py-2 bg-gray-300 rounded-lg hover:text-amber-50 hover:bg-gray-700 hover:transition hover:duration-500"
            type="submit">Submit
          </button>
          {error && <p className="text-red-700">{error}</p>}
        </form>
        <CustomLink text="Go Back to Menu" to="/" />
      </AuthLayout.Main>
    </AuthLayout>
  );
};

export default Register;