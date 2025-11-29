import { TypeUser } from "@/src/utils/datatypes/users";
import * as yup from "yup";

export const formSchema = yup.object({
  name: yup.string().required("O nome é obrigatório").min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: yup.string().required("O email é obrigatório").email("Digite um email válido"),
  cpf: yup.string().required("O CPF é obrigatório").matches(/^\d{11}$/, "O CPF deve conter 11 dígitos"),
  password: yup.string().required("A senha é obrigatória").min(6, "A senha deve ter pelo menos 6 caracteres"),
  repeatPassword: yup.string().required("A confirmação de senha é obrigatória").oneOf([yup.ref("password")], "As senhas devem ser iguais"),
  phone: yup.string().required("O telefone é obrigatório").matches(/^\+?\d{10,15}$/, "Número de telefone inválido"),
  dateOfBirth: yup.string().required("A data de nascimento é obrigatória").matches(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (use YYYY-MM-DD)"),
  typeuser: yup.mixed<TypeUser>().oneOf([TypeUser.CLIENTE, TypeUser.ARTESAO], "Tipo de usuário inválido").required("O tipo de usuário é obrigatório"),

});

export type FormSchemaType = yup.InferType<typeof formSchema>;
