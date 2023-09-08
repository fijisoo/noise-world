export const Label = ({ id, text }: any) => {
  return (
    <label className="my-2 flex text-xs font-bold" htmlFor={id}>
      {text}
    </label>
  );
};
