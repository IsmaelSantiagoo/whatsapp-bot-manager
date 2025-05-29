import Link from "next/link";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";

import { LoginForm } from "./_components/form-credentials";
import { GoogleLogin } from "./_components/form-google";
import { axios } from "@/lib/axios";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { Menu } from "@/interfaces/Menu";

type Props = {
  searchParams: Promise<{
    error?: string;
  }>;
};

type MenusResponse = ApiResponse<Menu[]>;

const Page = async ({ searchParams }: Props) => {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/login"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Logo logoName="chatbot" width={140} height={50} />
        </Link>

        <Card>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Boas vindas!</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Digite seu CPF e senha para acessar o sistema.
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />

                <AlertDescription>
                  Acesso não autorizado. Tente novamente ou contate o
                  administrador.
                </AlertDescription>
              </Alert>
            )}

            <LoginForm />

            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                ou continue com
              </span>
            </div>

            <GoogleLogin />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
