"use client";

import { protectedRoutes } from "@/src/constant";
import { useUser } from "@/src/context/user.provider";
import { userLogout } from "@/src/services/AuthService";
import { Divider } from "@nextui-org/divider";
import { LogOut, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AdminLinks, UserLinks } from "./constant";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Logo } from "../icons";

const Sidebar = () => {
    const { user, setIsLoading: userSetIsLoading } = useUser();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    const handleLogOut = () => {
        userLogout();
        userSetIsLoading(true);
        if (protectedRoutes.some((route) => pathname.match(route))) {
            router.push("/");
        }
    };

    // Function to handle link click
    const handleLinkClick = (link: string) => {
        setActiveLink(link);
        setIsSidebarOpen(false);
    };

    return (
        <div className="h-full relative">
            <div className="bg-black w-full text-gray-300 flex justify-between z-50 md:hidden">
                <div className="p-4 font-bold flex items-center gap-2">
                    <Logo /> <span className="text-2xl">TechWhiz</span>
                </div>
                <button
                    className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <Menu className="size-8" />
                </button>
            </div>

            {/* Sidebar Content */}
            <div
                className={`fixed min-h-screen inset-y-0 left-0 top-0 z-50 w-64 transform bg-default-100 transition-transform lg:static lg:transform-none ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:block`}
            >
                <div className="h-full flex flex-col">
                    <div className="mt-4 text-2xl flex items-center justify-center gap-2">
                        <Logo /> TechWhiz
                    </div>

                    <Divider className="my-4" />

                    {/* Sidebar Links Section */}
                    <div className="space-y-4 rounded-xl px-4 flex-1">
                        {(user?.role === "user" ? UserLinks : AdminLinks).map(
                            (link) =>
                                link.path ? (
                                    <Button
                                        key={link.name}
                                        className={`w-full flex items-center p-2 rounded text-lg ${
                                            activeLink === link.name
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-blue-300 hover:text-gray-900"
                                        }`}
                                        href={link.path}
                                        onClick={() =>
                                            handleLinkClick(link.name)
                                        }
                                        as={Link}
                                        startContent={<link.icon />}
                                    >
                                        {link.name}
                                    </Button>
                                ) : null
                        )}
                    </div>
                </div>

                {/* Log Out Section */}
                <div className="absolute w-full bottom-6">
                    <Divider className="mb-6 " />
                    <div className="flex items-center px-4 w-full ">
                        <Button
                            startContent={<LogOut />}
                            onClick={() => handleLogOut()}
                            className="w-full rounded bg-red-500"
                        >
                            Log Out
                        </Button>
                    </div>
                </div>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default Sidebar;
