import * as React from "react";

interface LayoutProps {
  children?: React.ReactNode;
}

interface AuthLayoutProps extends React.FC<LayoutProps> {
  Header: React.FC<LayoutProps>;
  Main: React.FC<LayoutProps>;
  Footer: React.FC<LayoutProps>;
}

const AuthLayout: AuthLayoutProps = (props: LayoutProps) => {
  return (
    <div className="App w-full min-h-screen flex flex-col items-center justify-center gap-y-5">
      {props.children}
    </div>
  );
};

AuthLayout.Header = (props: LayoutProps) => {
  return (
    <header className="APP-header flex flex-col justify-center items-center text-center gap-y-3 mx-auto w-[90%]">
      {props.children}
    </header>
  );
};

AuthLayout.Main = (props: LayoutProps) => {
  return (
    <main className="APP-main flex flex-col justify-center items-center gap-y-3 mx-auto w-[90%]">
      {props.children}
    </main>
  );
};

AuthLayout.Footer = (props: LayoutProps) => {
  // TODO:

  return (
    <footer>
      {props.children}
    </footer>
  )
}

export default AuthLayout;