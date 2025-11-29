"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./formregister-scheme";
import { toast } from "react-toastify";
import { InputCustom } from "@/src/components/InputCustom";
import { SubButton } from "@/src/components/Buttons/SubButton";
import { TypeUser } from "@/src/utils/datatypes/users";

type FormRegister = {
  name: string,
  email: string,
  cpf: string,
  password: string,
  repeatPassword: string,
  phone: string,
  dateOfBirth: string,
  typeuser: TypeUser,
};

export const FormRegister = () => {
  const router = useRouter();
  const methods = useForm<FormRegister>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", cpf: "", password: "", repeatPassword: "", phone: "", dateOfBirth: "", typeuser: TypeUser.CLIENTE },
  });

  const handlesubmitRegister = async (data: FormRegister) => {
    try {
      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response && response.status === 201) {
        toast.success("Usuário criado com sucesso, 1 seg e será redirecionado!");
        router.push("/");
      } else {
        toast.error(response.status === 400 ? "Email já existe na aplicação, prossiga para redefinição de senha" : "Erro ao registrar");
      }
    } catch (error) {
      throw new Error("Ocorreu um erro de comunicação no Next...");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handlesubmitRegister)} className="flex flex-col gap-4 p-6 bg-white rounded-md w-full max-w-[80%] mx-auto">
        {/* Linha 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputCustom name="name" label="Nome completo" required />
          <InputCustom name="email" label="Email" type="email" required />
        </div>

        {/* Linha 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputCustom name="cpf" label="CPF" required />
          <InputCustom name="phone" label="Telefone" required />
          <InputCustom name="dateOfBirth" label="Data de Nascimento" type="date" required/>
        </div>

        {/* Linha 5 - Senhas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputCustom name="password" label="Senha" type="password" required />
          <InputCustom name="repeatPassword" label="Confirme sua senha" type="password" required />
        </div>

        {/* Linha 6 - Tipo de usuário */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Tipo de usuário
          </label>
          <select {...methods.register("typeuser")} className="border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value={"CLIENTE"}>Cliente</option>
            <option value={"ARTESAO"}>Artesão</option>
          </select>
        </div>

        {/* Botão */}
        <div className="flex justify-center mt-4">
          <SubButton label="Registrar" />
        </div>
      </form>
    </FormProvider>
  );
};
