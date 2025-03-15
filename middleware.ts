export { default } from "next-auth/middleware";

export const config = {
  // If empty it will match all paths and protect all routess
  matcher: ["/leaderboard"],
};
