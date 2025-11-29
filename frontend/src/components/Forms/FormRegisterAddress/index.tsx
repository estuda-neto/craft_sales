"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema, FormSchemaType } from "./formregister-scheme";
import { toast } from "react-toastify";
import { InputCustom } from "@/src/components/InputCustom";
import { SubButton } from "@/src/components/Buttons/SubButton";
import { AddressOut, BrazilStates } from "@/src/utils/datatypes/address";

export const FormRegisterAdress = () => {
  const router = useRouter();

  const methods = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    defaultValues: { country: "", CEP: "", state: "" as any, city: "", neighborhood: "", streetAndHouseNumber: "" },
  });

  const handlesubmitRegister = async (data: FormSchemaType) => {
    try {
      const response = await fetch("http://localhost:3001/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        const address: AddressOut = await response.json();
        const responseUpdate = await fetch(`http://localhost:3001/api/users/addresses/${address.addressId}/update`, {
          method: "POST",
        });

        if (responseUpdate.status === 201) {
          toast.success("Endereço criado com sucesso, e atrelado ao usuário!");
          router.push("/manager");
        }

      } else {
        toast.error("Erro ao registrar novo endereço");
      }
    } catch (error) {
      toast.error("Erro de comunicação com o servidor");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handlesubmitRegister)}
        className="flex flex-col gap-6 p-8 bg-white rounded-xl shadow-md w-full max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Cadastro de Endereço
        </h2>

        {/* País + CEP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputCustom name="country" label="País" required />
          <InputCustom name="CEP" label="CEP" required />
        </div>

        {/* Estado */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700 font-medium">Estado</label>
          <select
            {...methods.register("state")}
            className="border border-gray-300 rounded-full p-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Selecione um estado</option>
            {Object.values(BrazilStates).map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
          {methods.formState.errors.state && (
            <p className="text-sm text-red-500">
              {methods.formState.errors.state.message}
            </p>
          )}
        </div>

        {/* Cidade */}
        <InputCustom name="city" label="Cidade" required />

        {/* Bairro + Rua */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputCustom name="neighborhood" label="Bairro" required />
          <InputCustom
            name="streetAndHouseNumber"
            label="Rua e Número"
            required
          />
        </div>

        {/* Botão */}
        <div className="flex justify-center mt-4">
          <SubButton label="Cadastrar Endereço" />
        </div>
      </form>
    </FormProvider>
  );
};
