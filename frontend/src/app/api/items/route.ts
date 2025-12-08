import { NextRequest, NextResponse } from "next/server";
import { BASE_URL_BACKEND } from "../base_url";
import { cookies } from "next/headers";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get("jwt_back");
        let jwt = !token ? "not found" : token.value;

        const refreshtoken = (await cookieStore).get("jwt_back_refresh");
        let refreshJwt = !refreshtoken ? "not found" : refreshtoken.value;
        if (!jwt || !refreshJwt)
            return NextResponse.json({ message: "Token não encontrado." }, { status: 401 });

        // const user = decoderTokenToClaims(jwt);
        const body = await req.json();

        const response = await fetch(`${BASE_URL_BACKEND}/items`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json") && response.status === 201) {
            const item = await response.json();
            return NextResponse.json(item, { status: 201 });
        }
        return NextResponse.json({ message: "The request contains errors, such as invalid data, incorrect format, or missing required fields." }, { status: 400 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Erro ao conectar no backend." }, { status: 500 });
    }
}