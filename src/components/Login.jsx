import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signUp } from "@/services/auth";
import { useState } from "react";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";

export function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const { handleUserLogin } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignup) {
        const res = await signUp(form.name, form.email, form.password);
        handleUserLogin(res.user);
        toast.success("SignUp successfll!");
        setOpen(false); 
      } else {
        const res = await login(form.email, form.password);
        handleUserLogin(res.user);
        if (res.user && res.user.isAdmin === true) {
          window.location.href = "/stats";
        }
        toast.success("Login successfull!");
        setOpen(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error");
      toast.error(err.response?.data?.message || err.message || "Error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">{isSignup ? "Sign Up" : "Login"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isSignup ? "Sign Up" : "Login"}</DialogTitle>
            <DialogDescription>
              {isSignup ? "Create a new account" : "Enter your credentials"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {isSignup && (
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required={isSignup}
                />
              </div>
            )}
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </Button>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">{isSignup ? "Sign Up" : "Login"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
