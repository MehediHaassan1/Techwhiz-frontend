"use client";

import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";

export default function NavbarDropdown() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        console.log("User logout successfully!");
    };

    const handleNavigation = (pathname: string) => {
        router.push(pathname);
    };

    const user = {
        profilePhoto: "",
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Avatar className="cursor-pointer" src={user?.profilePhoto} />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem onClick={() => handleNavigation("/dashboard")}>
                    Dashboard
                </DropdownItem>
                <DropdownItem onClick={() => handleNavigation("/profile")}>
                    Profile
                </DropdownItem>
                <DropdownItem
                    onClick={() => handleNavigation("/profile/settings")}
                >
                    Settings
                </DropdownItem>
                <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onClick={() => handleLogout()}
                >
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
