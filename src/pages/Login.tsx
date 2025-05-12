import { useState } from "react";
import coverImage from "../assets/homeDesktopPageCover.webp";
import { ThemeToggle } from "../components/ThemeToggle";
import Button from "../components/ui/Button";
import { useLogin } from "../hooks/useLogin";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isPending } = useLogin();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="flex  justify-center sm:p-4 items-center h-screen w-full min-h-96">
      <div className="relative flex shadow-lg rounded-lg overflow-hidden w-full max-w-6xl">
        <div className="w-full">
          <img
            className="h-auto max-h-[700px] min-h-96 dark:brightness-50 w-full brig object-cover sm:object-bottom md:object-left"
            src={coverImage}
            alt="home desktop page cover image"
          />
        </div>

        <div className=" absolute left-0 top-0 bottom-0 flex items-center justify-center w-full md:w-1/3  sm:p-8 sm:min-w-80">
          <div className=" bg-white/90 p-6 md:p-3 rounded-lg border shadow-sm border-neutral-300 dark:border-neutral-500 w-full max-w-xs dark:bg-neutral-500/90">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-medium mb-6">Login</h2>
              <ThemeToggle />
            </div>
            <form onSubmit={handleSubmit}>
              <Input
                label="Email address"
                id="username"
                type="email"
                className="mb-4"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                className="mb-2"
                id="password"
                required
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex flex-col justify-between">
                <a
                  className="align-baseline mb-6 w-max font-normal text-sm hover:text-slate-300 underline decoration-slate-400 underline-offset-2"
                  href="#"
                >
                  Forgot Password?
                </a>

                <Button
                  type="submit"
                  disabled={isPending}
                  className={`w-full py-2 ${
                    isPending ? "cursor-not-allowed" : ""
                  } bg-blue-500 text-white rounded hover:bg-blue-600`}
                >
                  {isPending ? <Loader size="md" /> : "Login"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
