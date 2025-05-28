import { Menu } from "./Menu";

export type TokenJWT = {
  iss: string;
  iat: number;
  exp: number;
  nbf: number;
  jti: string;
  sub: string;
  prv: string;

  id: string;
  usuario: string;
  email: string | null;
  nome: string | null;
  avatar: string;
  menus: Menu[];
};
