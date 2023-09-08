export const NavItem = ({ href, text, isDisabled, isMobile }: any) => {
  if (isMobile) {
    const mobileStyles = `
      ${isDisabled ? "line-through pointer-events-none" : ""}
    -mx-3 block rounded-lg px-3 py-2 text-xs font-semibold leading-7 text-gray-900 hover:bg-gray-50`;

    return (
      <a href={isDisabled ? "#" : href} className={mobileStyles}>
        {text}
      </a>
    );
  }

  const defaultStyles = `
      ${isDisabled ? "line-through pointer-events-none" : ""}
    text-xs font-semibold leading-6 text-gray-900`;
  return (
    <a href={href} className={defaultStyles}>
      {text}
    </a>
  );
};
