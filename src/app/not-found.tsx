import { redirect } from "next/navigation";

const NotFound = async () => {
  const { NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_DEFAULT_LOGIN_REDIRECT } = process.env;

  redirect(
    NEXT_PUBLIC_APP_URL +
      NEXT_PUBLIC_DEFAULT_LOGIN_REDIRECT +
      "?error=not-found",
  );
};

export default NotFound;
