// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Github, LucideLogIn, LucideUserPlus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";

// type User =
//   | {
//       name?: string | null | undefined;
//       email?: string | null | undefined;
//       image?: string | null | undefined;
//     }
//   | undefined;

// type Props = {
//   user: User;
//   pagetype: string;
// };
// export default function AuthPage({ user, pagetype }: Props) {
//   // using client session to get the user's session
//   const { data: session } = useSession({
//     required: true,
//     onUnauthenticated() {
//       redirect("/api/auth/signin?callbackUrl=/client");
//     },
//   });

//   const greeting = user?.name ? (
//     <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
//       Hello {user?.name}!
//     </div>
//   ) : null;

//   const emailDisplay = user?.email ? (
//     <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
//       {user?.email}
//     </div>
//   ) : null;

//   const userImage = user?.image ? (
//     <Image
//       className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
//       src={user?.image}
//       width={200}
//       height={200}
//       alt={user?.name ?? "Profile Pic"}
//       priority={true}
//     />
//   ) : null;

//   return (
//     <div className="flex flex-col items-center justify-center bg-primary p-4 text-gray-300 md:flex-row md:gap-32 min-h-[calc(100vh-84px)]">
//       {session ? (
//         <main className="flex w-full max-w-2xl md:items-start md:gap-32">
//           <section className="flex flex-col gap-4">
//             {greeting}
//             {emailDisplay}
//             {userImage}
//             <p className="text-2xl text-center">{pagetype} Page!</p>
//             <Button
//               variant="secondary"
//               onClick={() => redirect("/api/auth/signout")}
//             >
//               Sign Out
//             </Button>
//           </section>
//         </main>
//       ) : (
//         <div className="flex w-full max-w-2xl md:items-start md:gap-32">
//           {/* Register Form */}
//           <div className="flex-1 min-h-[400px] self-start">
//             <div className="mb-6 flex items-center gap-2">
//               <LucideUserPlus className="h-5 w-5" />
//               <h2 className="text-xl font-light">register</h2>
//             </div>
//             <form className="space-y-3">
//               <Input
//                 type="text"
//                 placeholder="username"
//                 className="border-0 bg-[#1e1e26] py-2 text-gray-300 placeholder:text-gray-500"
//               />
//               <Input
//                 type="email"
//                 placeholder="email"
//                 className="border-0 bg-[#1e1e26] py-2 text-gray-300 placeholder:text-gray-500"
//               />
//               <Input
//                 type="email"
//                 placeholder="verify email"
//                 className="border-0 bg-[#1e1e26] py-2 text-gray-300 placeholder:text-gray-500"
//               />
//               <Input
//                 type="password"
//                 placeholder="password"
//                 className="border-0 bg-[#1e1e26] py-2 text-gray-300 placeholder:text-gray-500"
//               />
//               <Input
//                 type="password"
//                 placeholder="verify password"
//                 className="border-0 bg-[#1e1e26] py-2 text-gray-300 placeholder:text-gray-500"
//               />
//               <Button
//                 type="submit"
//                 className="w-full bg-[#1e1e26] py-2 hover:bg-[#2a2a36]"
//               >
//                 <LucideUserPlus className="mr-2 h-4 w-4" />
//                 sign up
//               </Button>
//             </form>
//           </div>

//           {/* Login Form */}
//           <div className="flex-1 min-h-[400px] self-start">
//             <div className="mb-6 flex items-center gap-2">
//               <LucideLogIn className="h-5 w-5" />
//               <h2 className="text-xl font-light">login</h2>
//             </div>
//             <div className="mb-4 flex gap-4">
//               <Button
//                 variant="outline"
//                 className="flex-1 bg-[#1e1e26] py-2 text-gray-300 hover:bg-neutral-200 hover:text-gray-800"
//                 aria-label="Google"
//               >
//                 <span className="text-lg font-medium">G</span>
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex-1 bg-[#1e1e26] py-2 text-gray-300 hover:bg-neutral-200 hover:text-gray-800"
//                 aria-label="Github"
//               >
//                 <Github className="h-4 w-4 font-semibold" />
//               </Button>
//             </div>
//             <div className="mb-4 flex items-center justify-center">
//               <div className="flex-1 border-t border-gray-700"></div>
//               <span className="mx-4 text-sm text-gray-500">or</span>
//               <div className="flex-1 border-t border-gray-700"></div>
//             </div>
//             <form className="space-y-4">
//               <Input
//                 type="email"
//                 placeholder="email"
//                 className="border-0 bg-[#1e1e26] py-2 text-gray-300 placeholder:text-gray-500"
//               />
//               <Input
//                 type="password"
//                 placeholder="password"
//                 className="border-0 bg-[#1e1e26] py-2 text-gray-300 placeholder:text-gray-500"
//               />
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="remember"
//                   className="border-gray-600 data-[state=checked]:bg-gray-600"
//                 />
//                 <label
//                   htmlFor="remember"
//                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                 >
//                   remember me
//                 </label>
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full bg-[#1e1e26] py-2 hover:bg-[#2a2a36]"
//               >
//                 <LucideLogIn className="mr-2 h-4 w-4" />
//                 sign in
//               </Button>
//             </form>
//             <div className="mt-4 text-right">
//               <Link
//                 href="/forgot-password"
//                 className="text-sm !text-gray-500 !hover:text-gray-700"
//               >
//                 forgot password?
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function AuthPage({ pagetype }: { pagetype: string }) {
  // Get user session
  const { data: session, status } = useSession();

  // Redirect to login page if user is not authenticated
  if (status === "loading") {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (status === "unauthenticated") {
    redirect("/api/auth/signin?callbackUrl=/client");
  }

  // Extract user details safely
  const user = session?.user;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-84px)] bg-primary px-4">
      {user ? (
        <main className="flex flex-col items-center space-y-6 bg-neutral-100 shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
          {/* User Profile Image */}
          {user.image && (
            <Image
              className="w-24 h-24 rounded-full border-4 border-zinc-200 shadow-lg"
              src={user.image}
              width={96}
              height={96}
              alt={user.name ?? "Profile Pic"}
              priority
            />
          )}

          {/* Greeting Message */}
          <h1 className="text-2xl font-semibold text-gray-900">
            Hello, {user.name ?? "User"}!
          </h1>
          <p className="text-gray-600 text-sm">{user.email}</p>

          {pagetype && (
            <p className="text-lg font-medium text-gray-700">{pagetype} Page</p>
          )}

          {/* Sign Out Button */}
          <Button
            className="w-full py-2 bg-red-600 hover:bg-red-700 transition rounded-lg cursor-pointer"
            onClick={() => redirect("/api/auth/signout")}
          >
            Sign Out
          </Button>
        </main>
      ) : (
        <p className="text-gray-300">No user found</p>
      )}
    </div>
  );
}
