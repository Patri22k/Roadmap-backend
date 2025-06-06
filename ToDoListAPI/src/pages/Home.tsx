import CustomLink from "../components/Link.tsx";
import AuthLayout from "../layouts/AuthLayout.tsx";

const Home = () => {
  return (
    <AuthLayout>
      <AuthLayout.Header>
        <h1 className="text-3xl">To Do List API</h1>
        <p>This is a simple API for managing a to-do list.</p>
      </AuthLayout.Header>
      <AuthLayout.Main>
        <CustomLink text="Register" to="/register"/>
        <CustomLink text="Log In" to="/login"/>
      </AuthLayout.Main>
      <AuthLayout.Footer>
        {/* TODO */}
      </AuthLayout.Footer>
    </AuthLayout>
  );
};

export default Home;