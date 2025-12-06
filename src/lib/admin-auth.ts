import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_SESSION_COOKIE = "admin_session";
const ADMIN_SESSION_VALUE = "authenticated";

export async function validateAdminPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.error("ADMIN_PASSWORD not set in environment variables");
    return false;
  }
  
  return password === adminPassword;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  return session?.value === ADMIN_SESSION_VALUE;
}

export async function requireAdminAuth() {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) {
    redirect("/admin-login");
  }
}

