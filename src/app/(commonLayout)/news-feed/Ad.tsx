"use client";

import { Link } from "@nextui-org/link";
import { X } from "lucide-react";
import { useState } from "react";

const BecomeAPremiumMember = () => {
    const [isVisible, setIsVisible] = useState(true);
    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="flex items-center justify-between p-4 rounded-lg backdrop-blur-md bg-white/30 dark:bg-black/30 shadow-lg">
            <div className="flex items-center space-x-2 mx-auto">
                <span className="text-yellow-500">✨</span>
                <p className="text-sm text-gray-900 dark:text-white text-center">
                    Unlock exclusive features and insights at Gadget Guru Hub
                    for only $20/month.{" "}
                    <Link
                        className="underline text-black font-semibold dark:text-white"
                        href="/choose-plan"
                    >
                        Join our premium membership
                    </Link>
                </p>
                <button
                    className="text-gray-500 hover:text-black dark:hover:text-white"
                    onClick={handleClose}
                >
                    <X className="size-6 text-red-400" />
                </button>
            </div>
        </div>
    );
};

export default BecomeAPremiumMember;
