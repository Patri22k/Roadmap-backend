import CustomLink from "../components/Link.tsx";

const Home = () => {
  return (
    <div className="App w-full min-h-screen flex flex-col items-center justify-center gap-y-5">
      <header className="APP-header flex flex-col justify-center items-center text-center gap-y-3 mx-auto w-[90%]">
        <h1 className="text-3xl">To Do List API</h1>
        <p>This is a simple API for managing a to-do list.</p>
      </header>
      <main className="APP-main flex flex-col gap-y-3">
        <CustomLink text="Register" to="/register" />
        <CustomLink text="Log In" to="/login" />
        </main>
      <footer>
        {/* TODO */}
      </footer>
    </div>
  );
};

export default Home;