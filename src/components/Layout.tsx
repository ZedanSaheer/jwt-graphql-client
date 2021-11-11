import { FC } from "react";
import Navbar from "./Navbar";
import Wrapper, { WrapperVariant } from "./Wrapper";

interface LayoutProps {
  variant?: WrapperVariant;
}

export const Layout: FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <Navbar />
      <Wrapper variants={variant}>{children}</Wrapper>
    </>
  );
};
