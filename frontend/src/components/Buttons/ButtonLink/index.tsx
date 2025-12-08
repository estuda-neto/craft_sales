"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

type ButtonLinkProps = {
    color?: "blue" | "red" | "green" | "yellow" | "purple";
    typeOf?: "submit" | "button" | "reset";
    route?: string;
    fnExecution?: () => void;
    children: ReactNode;
};

const colorMap = {
    blue: "bg-blue-600 hover:bg-blue-700",
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    yellow: "bg-yellow-600 hover:bg-yellow-700",
    purple: "bg-purple-600 hover:bg-purple-700",
};

export const ButtonLink: React.FC<ButtonLinkProps> = ({ color = "blue", typeOf = "submit", route, fnExecution, children }) => {
    const routeDestination = useRouter();

    const handleClick = () => {
        if (fnExecution) fnExecution();
        if (route) routeDestination.push(route);
    };

    return (
        <button className={clsx("w-full flex items-center justify-center gap-3 text-white py-3 rounded-md transition", colorMap[color])} type={typeOf} onClick={handleClick}>
            {children}
        </button>
    );
};
