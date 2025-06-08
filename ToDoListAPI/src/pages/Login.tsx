import AuthLayout from "../layouts/AuthLayout.tsx";
import CustomLink from "../components/Link.tsx";
import {useState} from "react";
import * as React from "react";
import {loginUser} from "../api/auth.ts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await loginUser(email, password);

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

        setEmailError(errorsByField.email || null);
        setPasswordError(errorsByField.password || null);
      } else {
        setError(response.error.message);
      }
    } else {
      // TODO: Handle successful login, e.g., redirect to dashboard or show success message
    }
  };

  // TODO: Add component button, input

  return (
    <AuthLayout>
      <AuthLayout.Header>
        <h1 className="text-3xl">Log In</h1>
        <p>Please enter your credentials to log in to your account</p>
      </AuthLayout.Header>
      <AuthLayout.Main>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 w-full">
          <input className="py-2 border rounded pl-2" type="email" placeholder="john@doe.com" onChange={(e) => setEmail(e.target.value)}/>
          {emailError && <p className="text-red-600">{emailError}</p>}
          <input className="py-2 border rounded pl-2" type="password" placeholder="123456789" onChange={(e) => setPassword(e.target.value)}/>
          {passwordError && <p className="text-red-600">{passwordError}</p>}
          <button className="text-sm sm:text-base lg:text-xl px-6 py-2 bg-gray-300 rounded-lg hover:text-amber-50 hover:bg-gray-700 hover:transition hover:duration-500" type="submit">Submit</button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
        <CustomLink text="Go Back to Menu" to="/"/>
      </AuthLayout.Main>
    </AuthLayout>
  );
};

export default Login;