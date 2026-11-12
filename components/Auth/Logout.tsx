import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// import api from "../../Api/api.js";

interface LogoutProps {
  className: string;
}

export default function SignOut({ className }: LogoutProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    setLoading(true);
    const toastId = toast.loading("Logout...");
    try {
      const res = await fetch("/users/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if(!res.ok){
        throw new Error(data.message || "Something went wrong!")
      }

      setLoading(false);

      toast.update(toastId, {
        render: data?.message || "Logout successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      localStorage.removeItem("user");
      router.push("/");
    } catch (error:any) {
      console.log(error);

      setLoading(false);

      const errorMsg = error.message || "somting went wrong!";

      toast.update(toastId, {
        render: errorMsg,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }

  return (
    <section>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={loading}
        className="w-44 border-0 rounded-2xl py-1.5 font-bold text-black/85 bg-yellow-400 hover:bg-yellow-500 cursor-pointer"
      >
        {loading ? "Logout..." : "Logout"}
      </button>
    </section>
  );
}
