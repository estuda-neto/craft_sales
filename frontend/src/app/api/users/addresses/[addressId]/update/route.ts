import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { BASE_URL_BACKEND } from "../../../../base_url";
import { AddressOut } from "@/src/utils/datatypes/address";
import { decoderTokenToClaims } from "@/src/app/api/auth/decode-claims";
import { User } from "@/src/utils/datatypes/users";

interface RouteContext { params: { addressId: string }; };

export async function POST(req: NextRequest, context: RouteContext) {
    const params = await context.params;
    const { addressId } = params;

    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("jwt_back");
        const jwt = token?.value ?? "not found";
        const user = decoderTokenToClaims(jwt);

        const response = await fetch(`${BASE_URL_BACKEND}/users/${user?.id}/addresses/${addressId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        const userResponse: User = await response.json();
        return NextResponse.json(userResponse, { status: response.status });

    } catch (err) {
        console.error("Erro no route handler:", err);
        return NextResponse.json({ message: "Erro ao conectar no backend" }, { status: 500 });
    }
}
