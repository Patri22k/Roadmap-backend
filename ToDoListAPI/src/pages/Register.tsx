import {Link} from "react-router-dom";

const Register = () => {
  return (
    <div className="APP-register w-full min-h-screen flex flex-col items-center justify-center">
      <header className="mx-auto w-[90%] gap-y-3">
        <h1 className="text-3xl">Register new account</h1>
      </header>
      <main>
        <Link to="/" />
      </main>
    </div>
  );
};

export default Register;