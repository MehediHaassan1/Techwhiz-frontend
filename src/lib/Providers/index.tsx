"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "@/src/context/user.provider";
import { Toaster } from "sonner";

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter();

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <NextUIProvider navigate={router.push}>
                    <NextThemesProvider {...themeProps}>
                        {children}
                        <Toaster />
                    </NextThemesProvider>
                </NextUIProvider>
            </UserProvider>
        </QueryClientProvider>
    );
}
