import { ReactNode } from "react";

import { Navbar } from "@/src/components/navbar";

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
