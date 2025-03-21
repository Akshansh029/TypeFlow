import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Stats, User } from "./interfaces";
import { User2 } from "lucide-react";
import { format } from "date-fns";
import { FaSignOutAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/actions/signout";
import MoonLoader from "react-spinners/MoonLoader";

interface ProfileDisplayProps {
  user: User | null;
  data: Stats | null;
}

const ProfileSummary = ({ user, data }: ProfileDisplayProps) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(userInfo);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <section className="w-full flex flex-col md:flex-row gap-6 bg-[#1a1e2a] rounded-lg px-6 py-8 text-white">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative">
          {user?.image ? (
            <Image
              className="w-20 h-20 rounded-full"
              src={user.image || "/placeholder.svg"}
              width={80}
              height={80}
              alt={user?.name ?? "Profile"}
              priority
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-2xl">
              <User2 className="w-12 h-12" />
            </div>
          )}
        </div>
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{user?.name || "User"}</h1>
          </div>
          {loading ? (
            <MoonLoader color="#b2b2b2" size={25} className="mx-auto" />
          ) : (
            <>
              <p className="text-sm text-gray-400">
                Joined{" "}
                {userInfo?.createdAt
                  ? format(new Date(userInfo.createdAt), "d MMM, yyyy")
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-400">
                Email -{" "}
                <span className="text-neutral-200">{userInfo?.email}</span>
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 mt-6 md:mt-auto">
        <div className="text-center text-sm text-gray-400">
          <div className="flex flex-col sm:flex-row justify-around items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">tests started</span>
              <span className="text-[42px] font-bold text-neutral-200">
                {data?.testResults.length || "-"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">highest wpm</span>
              <span className="text-[42px] font-bold text-neutral-200">
                {data?.stats._max.netWPM || "-"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">time typing</span>
              <span className="text-[42px] font-bold text-neutral-200">
                {new Date((data?.stats._sum.duration ?? 0) * 1000)
                  .toISOString()
                  .substr(11, 8) || "--:-:--"}
              </span>
            </div>
            <form action={signOutAction}>
              <Button
                type="submit"
                variant="secondary"
                className="w-full cursor-pointer text-lg text-white py-6 bg-primary flex gap-3"
              >
                <span>Sign Out</span>
                <FaSignOutAlt className="w-6 h-6 text-red-500" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSummary;
