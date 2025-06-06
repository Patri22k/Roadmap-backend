import AuthLayout from "../layouts/AuthLayout.tsx";

const Login = () => {
  return (
    <AuthLayout>
      <AuthLayout.Header>
        <h1 className="text-3xl">Log In</h1>
        <p>Please enter your credentials to log in to your account</p>
      </AuthLayout.Header>
    </AuthLayout>
  );
};

export default Login;