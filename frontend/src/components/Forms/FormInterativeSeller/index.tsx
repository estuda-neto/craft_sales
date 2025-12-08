"use client";

import { Product } from "@/src/utils/datatypes/products";
import { CreditCard, Heart, Share2, ShoppingCart, Star } from "lucide-react";
import { toast } from "react-toastify";
import { ButtonLink } from "../../Buttons/ButtonLink";
import { FormProvider, useForm } from "react-hook-form";
import { formSchema, ItemFormSchemaType } from "./formlogin-scheme";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputCustom } from "../../InputCustom";
import { useRouter } from "next/navigation";

//criados fakes 
const ratings = 1.6;
const reviewsCount = 2;
const parcelados = { parcelas: 5, value: 59.89, };

const formatPrice = (cents: number) => (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
type FormInterativeSellerProps = {
    cartId: string;
    product: Product;
};

export const FormInterativeSeller: React.FC<FormInterativeSellerProps> = ({ product, cartId }) => {
    const savings = 4; //product.price ? product.price - product.price : 0;
    const router = useRouter();
    const methods = useForm<ItemFormSchemaType>({
        resolver: yupResolver(formSchema), mode: "onChange",
        defaultValues: { productId: product.productId, carId: cartId, quantProduct: 1, price: product.price, sizeVariation: "" },
    });


    const sendProducToCar = async (data: ItemFormSchemaType) => {
        try {
            const response = await fetch("http://localhost:3001/api/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Erro ao adicionar ao carrinho");
            }
            toast.success("Item adicionado ao carrinho!");
            router.push("/car");
        } catch (error) {
            toast.error("Não foi possível adicionar esse item ao seu carrinho!");
            console.error(error);
        }
    };

    return (
        <FormProvider {...methods}>
            <form className="w-full md:w-1/2 md:pl-8" onSubmit={methods.handleSubmit(sendProducToCar)} >
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-lg font-semibold">{product.name}</h1>
                            <p className="text-sm text-muted-foreground mt-1">{product.material}</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-md border"><Heart size={18} /></button>
                            <button className="p-2 rounded-md border"><Share2 size={18} /></button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="flex items-end gap-4 mb-4">
                            <InputCustom name="sizeVariation" label="Variação do Produto" required />
                            <InputCustom name="quantProduct" type={"number"} label="Quantidade do Produto" required />
                        </div>
                        <div className="flex items-end gap-4">
                            <div>
                                <div className="text-3xl font-extrabold">{formatPrice(product.price)}</div>
                                {product.price && (<div className="text-sm line-through text-gray-500 mt-1">{formatPrice(product.price)}</div>)}
                                {savings > 0 && (<div className="text-xs text-green-600 mt-1">Você economiza {formatPrice(savings)}</div>)}
                            </div>
                            <div className="ml-auto text-sm">
                                <div className="flex items-center gap-1">
                                    <Star size={16} />
                                    <span className="font-medium">{ratings?.toFixed(1)}</span>
                                    <span className="text-sm text-gray-500">({reviewsCount})</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-3">
                            <ButtonLink color="blue" route="/seller/order">
                                <CreditCard size={18} /> Comprar agora
                            </ButtonLink>
                            <ButtonLink color="green" typeOf="submit">
                                <ShoppingCart size={18} /> Adicionar ao carrinho
                            </ButtonLink>

                            {parcelados && (
                                <div className="text-sm text-gray-600 mt-1">
                                    <span>{parcelados.parcelas}x de {formatPrice(parcelados.value)}</span>
                                    <span className="block">sem juros</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-5 text-sm text-gray-600 border-t pt-3">
                        <div>Vendido por <strong>{product.userId}</strong></div>
                        <div className="mt-2">{product.description}</div>
                    </div>
                </div>
            </form>

        </FormProvider>

    );
};