import Button from "./Button";

interface UserDropdownProps {
  userName: string | undefined;
  handleSingout: () => void;
}

export function UserDropdown({ userName, handleSingout }: UserDropdownProps) {
  return (
    <div className="relative hidden md:inline-block group">
      <div className="w-max p-3 cursor-pointer group-hover:bg-slate-300 dark:group-hover:bg-slate-800 rounded-t-md">
        <span>{userName}</span>
      </div>

      <div className="absolute top-full right-0 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top">
        <div className="flex flex-col gap-3 p-2 bg-slate-300 dark:bg-slate-800 rounded-b-md shadow-lg">
          <Button to="/profile" className="w-full text-center dark:hover:bg-slate-900">
            Profile
          </Button>

          <Button onClick={handleSingout} className="w-full text-center dark:hover:bg-slate-900">
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
