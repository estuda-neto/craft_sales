import * as yup from "yup";

export const productFormSchema = yup.object({
  name: yup.string().required("O nome é obrigatório").min(3, "O nome deve ter pelo menos 3 caracteres"),
  price: yup.number().typeError("O preço deve ser um número").required("O preço é obrigatório").min(0, "O preço não pode ser negativo"),
  quantStock: yup.number().typeError("A quantidade deve ser um número inteiro").required("A quantidade em estoque é obrigatória").integer("A quantidade deve ser um número inteiro").min(0, "A quantidade não pode ser negativa"),
  description: yup.string().required("A descrição é obrigatória").min(10, "A descrição deve ter pelo menos 10 caracteres"),
});

export type ProductFormSchemaType = yup.InferType<typeof productFormSchema>;
