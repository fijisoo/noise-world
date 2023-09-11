import Image from "next/image";

export const Icon = ({ src, alt }: any) => {
  return (
    <div className="relative flex h-[16px] shrink-0 p-2 w-[16px]">
      <Image src={src} alt={alt} fill />
    </div>
  );
};
