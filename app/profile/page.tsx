import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function AuthPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-84px)] bg-primary px-4">
      {/* {user ? ( */}
      <main className="flex flex-col items-center space-y-6 bg-neutral-100 shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {user?.image && (
          <Image
            className="w-24 h-24 rounded-full border-4 border-zinc-200 shadow-lg"
            src={user?.image ?? ""}
            width={96}
            height={96}
            alt={user?.name ?? "Profile Pic"}
            priority
          />
        )}

        {/* Greeting Message */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Hello, {user?.name ?? "User"}!
          </h1>
          <h2 className="text-lg font-medium text-gray-900">
            Excited to see you here!
          </h2>
        </div>
        <p className="text-gray-600 text-sm">
          Email address:{" "}
          <span className="font-medium text-gray-900">{user?.email}</span>
        </p>

        <form
          className="w-full"
          action={async () => {
            "use server";
            await signOut({
              redirectTo: "/",
            });
          }}
        >
          <Button
            type="submit"
            variant="destructive"
            className="w-full cursor-pointer"
          >
            Sign Out
          </Button>
        </form>
      </main>
    </div>
  );
}
