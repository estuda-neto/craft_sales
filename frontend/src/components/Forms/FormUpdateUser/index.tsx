"use client";

import { useForm, FormProvider, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { InputCustom } from "@/src/components/InputCustom";
import { updateFormSchema, UpdateFormSchemaType } from "./formregister-scheme";
import { useSession } from "next-auth/react";
import { SubButton } from "@/src/components/Buttons/SubButton";
import { TypeArtisan, UpdateUserInput } from "@/src/utils/datatypes/users";

export const FormUpdateUser = () => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const router = useRouter();
  const { data: session, update } = useSession();

  const methods = useForm<UpdateFormSchemaType>({
    resolver: yupResolver(updateFormSchema) as Resolver<UpdateFormSchemaType>, mode: "onChange", defaultValues: {
      name: "", bio: "", craftsmanRegistration: "", numberWalletCICAB: "", artisanType: null,
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPhotoFile(file);
  };

  const handleSubmitUpdate = async (data: UpdateFormSchemaType) => {
    try {
      const payload: UpdateUserInput = {
        name: data.name ?? undefined,
        bio: data.bio ?? undefined,
        craftsmanRegistration: data.craftsmanRegistration ?? undefined,
        numberWalletCICAB: data.numberWalletCICAB ?? undefined,
        artisanType: data.artisanType ?? undefined,
      };

      const response = await fetch("http://localhost:3001/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Erro ao atualizar informações do usuário");
        return;
      }
      const usersession = await response.json();
      // 🔹 Upload da foto (caso exista)
      if (photoFile && usersession) {
        const formData = new FormData();
        formData.append("photo", photoFile, photoFile.name);
        const uploadResp = await fetch(`http://localhost:3001/api/users/photo`, { method: "POST", body: formData });
        if (uploadResp.ok) {
          const userAtualizado = await uploadResp.json();
          const newSession = await update({ user: { ...session?.user, image: userAtualizado.photo, } });
          if (newSession) {
            toast.success("Dados do usuário atualizados com sucesso!");
          }
        } else {
          toast.error("Erro ao enviar a foto");
        }
      }
      router.refresh();
      router.push("/manager");
    } catch (error) {
      console.error(error);
      toast.error("Erro de comunicação com o servidor");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmitUpdate)} className="flex flex-col gap-6 sm:p-6 lg:p-8 w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 max-w-[90%] mx-auto">
        {/* Foto */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Foto do usuário</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2 border border-gray-300 rounded-lg p-2 w-full" />
          {photoFile && <p className="text-sm text-gray-600 mt-1">{photoFile.name}</p>}
        </div>

        {/* Bio */}
        <InputCustom name="name" label="Nome" type="text" />

        {/* Bio */}
        <InputCustom name="bio" label="Biografia" type="text" />

        {/* Registro Artesão */}
        <InputCustom
          name="craftsmanRegistration"
          label="Registro de Artesão"
          type="text"
        />

        {/* Carteira CICAB */}
        <InputCustom
          name="numberWalletCICAB"
          label="Número da Carteira CICAB"
          type="text"
        />

        {/* Tipo de Artesão */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Artesão
          </label>

          <select
            {...methods.register("artisanType")}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="">Selecione</option>

            <option value={TypeArtisan.CERÂMICA}>Cerâmica</option>
            <option value={TypeArtisan.MADEIRA}>Madeira</option>
            <option value={TypeArtisan.TECIDOS}>Tecidos</option>
            <option value={TypeArtisan.FIBRA}>Fifra</option>
            <option value={TypeArtisan.METAL}>Metal</option>
            <option value={TypeArtisan.RECICLÁVEIS}>Recicláveis</option>
            <option value={TypeArtisan.PINTURA}>Pintura</option>
            <option value={TypeArtisan.ESCULTURA}>Escultura</option>
            <option value={TypeArtisan.PEDRA_SABÃO}>Pedra Sabão</option>
          </select>
        </div>

        {/* Botão */}
        <SubButton type="submit" label="Atualizar Usuário" />
      </form>
    </FormProvider>
  );
};
