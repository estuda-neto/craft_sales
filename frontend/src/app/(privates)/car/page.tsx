import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { BASE_URL_BACKEND } from "@/src/app/api/base_url";
import { CarClient } from "@/src/components/CarClient";
import { CarWithProducts } from "@/src/utils/datatypes/car";
import { Session } from "@/src/utils/datatypes/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getACarOfUser(session: Session): Promise<CarWithProducts> {
    try {
        const response = await fetch(`${BASE_URL_BACKEND}/cars/user/${session.user.id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json") && response.status === 200) {
            const car = await response.json();
            return car;
        }
        return {} as CarWithProducts;
    } catch (error) { throw new Error("Network error"); }
}

export default async function MyCar() {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");
    const car = await getACarOfUser(session);


    return (
        <div className='w-full min-h-screen relative bg-gray-100 transition-colors duration-500'>
            <CarClient carItems={car.items} userId="ewfew1222" />
        </div>);
}