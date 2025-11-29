import { TypeArtisan } from "@/src/utils/datatypes/users";
import * as yup from "yup";

export const updateFormSchema = yup.object({
  name: yup.string().nullable().optional(),
  bio: yup.string().max(500).nullable().optional(),
  craftsmanRegistration: yup.string().max(255).nullable().optional(),
  numberWalletCICAB: yup.string().max(255).nullable().optional(),
  artisanType: yup.mixed<TypeArtisan>().oneOf(Object.values(TypeArtisan)).nullable().optional(),
});

export type UpdateFormSchemaType = yup.InferType<typeof updateFormSchema>;
