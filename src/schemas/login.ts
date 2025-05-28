import { z } from "zod";

const schema = z.object({
  usuario: z.string().trim().min(1, {
    message: "O usuário é obrigatório",
  }),
  senha: z.string().min(1, {
    message: "A senha é obrigatória",
  }),
});

export type LoginSchema = z.infer<typeof schema>;

export const defaultValues: LoginSchema = {
  usuario: "",
  senha: "",
};

export default schema;
