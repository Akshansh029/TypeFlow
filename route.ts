export const publicRoutes = [
  "/",
  "/about",
  "/settings",
  "/leaderboard",
  "/api/leaderboard",
];

// These routes will redirect logged in users to the PROFILE page
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

// These routes will be used for the API auth purposes
export const apiAuthPrefix = "/api/auth";

// This is the default redirect path for logged in users
export const DEFAULT_LOGIN_REDIRECT = "/profile";
