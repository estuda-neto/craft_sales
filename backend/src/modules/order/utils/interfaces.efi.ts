interface PixChargePayload {
    pixKey: string;
    value: number;
    name: string;
    cpf: string;
    description: string;
}

interface AddressInfo {
    street: string;
    numerHouse: string;
    neighborhood: string;
    CEP: string;
    city: string;
    state: string;
}

interface ChargeItem {
    name: string;
    value: number; // em centavos
    amount: number;
}

interface CustomerInfo {
    name: string;
    cpf: string;
    phone_number: string;
    email: string;
    birth?: string; // opcional, algumas chamadas pedem
}

interface BoletoChargePayload {
    items: ChargeItem[];
    customer: CustomerInfo;
    expireAt: string; // formato: "YYYY-MM-DD"
}

interface BoletoPaymentResponse {
    charge_id: number;
    status: string;
    total: number;
    link: string;
    payment: {
        banking_billet: {
            expire_at: string;
            barcode: string;
            link: string;
            pdf: string;
        };
    };
}

export type { PixChargePayload, CustomerInfo, ChargeItem, AddressInfo, BoletoChargePayload, BoletoPaymentResponse };
