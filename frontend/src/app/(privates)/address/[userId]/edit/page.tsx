
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { Session } from "@/src/utils/datatypes/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// async function getAddressData(): Promise<AddressOut | null> {
//     try {
//         const response = await fetch(`http://localhost:3001/addresses`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
                
//             },
//         });
//         if (!response.ok) return null;
//         const data: AddressOut = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching portfolio data:", error);
//         return null;
//     }
// }

interface Props { params: { userId: string }; };
export default async function AddressEdit({ params }: Props) {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");
    const { userId } = await params;

    return (<div className='w-full min-h-screen relative bg-gray-100 transition-colors duration-500'></div>);
}