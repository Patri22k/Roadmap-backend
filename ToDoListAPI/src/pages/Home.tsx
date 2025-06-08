import CustomLink from "../components/Link.tsx";
import AuthLayout from "../layouts/AuthLayout.tsx";

const Home = () => {
  return (
    <AuthLayout>
      <AuthLayout.Header>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">To Do List</h1>
        <p className="text-sm sm:text-base lg:text-lg">This is a simple project for managing a to-do list.</p>
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