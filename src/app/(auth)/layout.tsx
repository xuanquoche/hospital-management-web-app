const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-center items-center h-screen bg-background">
    {children}
  </div>
);

export default AuthLayout;
