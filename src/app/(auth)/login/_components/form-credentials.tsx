import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LoginForm = async () => {
  return (
    <form
      action="/api/auth/provider/credentials"
      method="post"
      className="grid gap-6"
    >
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="usuario">CPF:</Label>

          <Input
            id="usuario"
            name="usuario"
            placeholder="000.000.000-00"
            required
          />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="senha">Senha:</Label>

            <Link
              href="/auth/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          <Input
            id="senha"
            name="senha"
            type="password"
            placeholder="**********"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </div>
    </form>
  );
};
