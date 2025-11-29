import { BrazilStates } from "@/src/utils/datatypes/address";
import * as yup from "yup";

export const formSchema = yup.object({
  country: yup.string().required("País é obrigatório"),
  CEP: yup.string().matches(/^\d{5}-?\d{3}$/, "CEP inválido").required("CEP é obrigatório"),
  state: yup.mixed<BrazilStates>().oneOf(Object.values(BrazilStates), "Estado inválido").required("Estado é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
  neighborhood: yup.string().required("Bairro é obrigatório"),
  streetAndHouseNumber: yup.string().required("Rua e número são obrigatórios"),
});

export type FormSchemaType = yup.InferType<typeof formSchema>;
