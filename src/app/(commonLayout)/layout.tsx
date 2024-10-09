import { ReactNode } from "react";

import { Navbar } from "@/src/components/navbar";
import Footer from "@/src/components/Footer";

interface IProps {
  children: ReactNode;
  components: ReactNode;
}

const layout = ({ children }: IProps) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
