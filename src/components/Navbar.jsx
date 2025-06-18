import { Button } from "./ui/button";
import { Login } from "./Login";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import useAuth from "@/hooks/useAuth";

function Navbar() {
  const { isLogin, user, handleUserLogout } = useAuth();
  console.log(isLogin, user);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-3 border-b shadow-sm z-50 bg-background">
      <div className="flex gap-4">
        <Sidebar />
        <div className="font-bold text-xl">AI ChatBot</div>
      </div>
      <div className="flex gap-4 items-center">
        <ThemeToggle />
        {isLogin ? (
          <>
            <span className="font-medium">{user?.name}</span>
            <Button variant="outline" onClick={handleUserLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}
export default Navbar;
