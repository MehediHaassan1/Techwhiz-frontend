"use client";

import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { HeartFilledIcon, Logo } from "@/src/components/icons";
import NavbarDropdown from "./NavbarDropdown";
import { LogIn } from "lucide-react";
import { useUser } from "../context/user.provider";
import Loading from "./Loading";

export const Navbar = () => {
    const { user } = useUser();
    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink
                        className="flex justify-start items-center gap-1"
                        href="/"
                    >
                        <Logo />
                        <p className="font-bold text-inherit">TechWhiz</p>
                    </NextLink>
                </NavbarBrand>
                <ul className="hidden md:flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                className={clsx(
                                    linkStyles({ color: "foreground" }),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                                )}
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-2">
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarItem className="flex">
                    {user ? (
                        <NavbarDropdown />
                    ) : (
                        <Button
                            as={Link}
                            className="text-sm font-normal text-default-600 bg-default-100 rounded"
                            href={siteConfig.links.login}
                            endContent={<LogIn />}
                            variant="flat"
                        >
                            Login
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <ThemeSwitch />
                <NavbarItem className="flex">
                    {user ? (
                        <NavbarDropdown />
                    ) : (
                        <Button
                            as={Link}
                            className="text-sm font-normal text-default-600 bg-default-100 rounded"
                            href={siteConfig.links.login}
                            startContent={
                                <HeartFilledIcon className="text-danger" />
                            }
                            variant="flat"
                        >
                            Login
                        </Button>
                    )}
                </NavbarItem>
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2
                                        ? "primary"
                                        : index ===
                                          siteConfig.navMenuItems.length - 1
                                        ? "danger"
                                        : "foreground"
                                }
                                href="#"
                                size="lg"
                            >
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};
