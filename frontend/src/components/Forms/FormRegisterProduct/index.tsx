"use client";

import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productFormSchema, ProductFormSchemaType } from "./formregister-scheme";
import { InputCustom } from "@/src/components/InputCustom";
import { SubButton } from "@/src/components/Buttons/SubButton";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const FormRegisterProduct = () => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const router = useRouter();
  const methods = useForm<ProductFormSchemaType>({
    resolver: yupResolver(productFormSchema), mode: "onChange",
    defaultValues: { name: "", material: "", price: 0, quantStock: 0, description: "" },
  });

  const onSubmitProduct = async (data: ProductFormSchemaType) => {
    try {
      const response = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 201 && photoFile) {
        const product = await response.json();

        const formData = new FormData();
        formData.append("photo", photoFile, photoFile.name);
        const uploadResp = await fetch(`http://localhost:3001/api/products/${product.productId}/photo`, { method: "POST", body: formData });

        if (uploadResp.ok) {
          toast.success("Produto criado com sucesso!");
          router.refresh();
          router.push("/manager");
        }
        else { toast.error("Nenhuma foto foi selecionada."); }
      } else {
        toast.error("Erro ao criar o produto.");
      }
    } catch (err) {
      toast.error("Erro ao comunicar com o servidor.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPhotoFile(file);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitProduct)} className="flex flex-col gap-6 p-6 bg-white rounded-2xl shadow-lg  w-full max-w-2xl mx-auto border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">
          Cadastro de Produto
        </h2>

        <div >
          <label className="block text-sm font-medium text-gray-700">Imagem de exibição do Produto</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2 border border-gray-300 rounded-lg p-2 w-full" />
          {photoFile && <p className="text-sm text-gray-600 mt-1">{photoFile.name}</p>}
        </div>

        {/* Nome + Preço */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputCustom name="name" label="Nome do Produto" required />
          <InputCustom name="material" label="Material utilizado" required />
          <InputCustom name="price" label="Preço" type="number" required />
        </div>

        {/* Quantidade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputCustom name="quantStock" label="Quantidade em Estoque" type="number" required />
        </div>

        {/* Descrição */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Descrição
          </label>
          <textarea
            {...methods.register("description")}
            className="border border-gray-300 rounded-xl p-3 w-full h-28  focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Descreva seu produto..."
          />
          {methods.formState.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {methods.formState.errors.description.message}
            </p>
          )}
        </div>

        {/* Botão */}
        <div className="flex justify-center">
          <SubButton label="Cadastrar Produto" />
        </div>
      </form>
    </FormProvider>
  );
};
