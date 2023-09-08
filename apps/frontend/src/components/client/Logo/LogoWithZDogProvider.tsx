import { Illustration } from "react-zdog";
import { Logo } from "./Logo";

export const LogoWithZDogProvider = ({ small }: any) => {
  return (
    <Illustration zoom={small ? 1 : 1.6} element="svg">
      <Logo />
    </Illustration>
  );
};
