import * as yup from 'yup';

export const formSchema = yup.object().shape({
  productId: yup.string().uuid('productId deve ser um UUID válido').required('productId é obrigatório'),
  carId: yup.string().uuid('carId deve ser um UUID válido').required('carId é obrigatório'),
  quantProduct: yup.number().required('quantProduct é obrigatório').positive('quantProduct deve ser maior que zero').integer('quantProduct deve ser um número inteiro'),
  price: yup.number().required('price é obrigatório').positive('price deve ser maior que zero'),
  // aceita "P, M, G" como string
  sizeVariation: yup.string().required('sizeVariation é obrigatório').matches(/^[\w\s,]+$/, 'sizeVariation deve ser uma lista separada por vírgulas'),
});

export type ItemFormSchemaType = yup.InferType<typeof formSchema>;
