// app/profile/Profile.tsx (Server Component)
import { auth } from "@/auth";
import { ProfileClient } from "./ProfileClient";

export default async function Profile() {
  const session = await auth();

  return <ProfileClient user={session?.user ?? null} />;
}
