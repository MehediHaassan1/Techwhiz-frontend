import { Navbar } from "@/src/components/navbar";
import { ReactNode } from "react";

interface IProps {
    children: ReactNode;
    components: ReactNode;
}

const layout = ({ children }: IProps) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default layout;
