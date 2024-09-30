import { Navbar } from "@/src/components/navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default layout;
