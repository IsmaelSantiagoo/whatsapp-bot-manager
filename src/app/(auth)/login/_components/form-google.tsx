import Image from "next/image";

import { Button } from "@/components/ui/button";

export const GoogleLogin = () => {
  return (
    <form action="/api/auth/provider/google">
      <Button variant="outline" className="w-full">
        <Image
          className="dark:invert"
          src="/assets/brand_icons/google.svg"
          alt="Google logo"
          width={18}
          height={18}
        />
        Gmail
      </Button>
    </form>
  );
};
