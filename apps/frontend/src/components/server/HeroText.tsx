export const HeroText = () => {
  return (
    <div className="flex flex-col">
      <h1 className="flex text-h1 tracking-tighter">
        Journey thru vibes <br />
        Collect, Exchange and Share
      </h1>
      <h4 className="flex text-xxs">
        THAT WAS THE BEST CONCERT OF MY LIFE! I'M SO SAD IT ENDED... ALL I HAVE
        IS ONE BLURRY PICTURE OF MYSELF
        <br />
        ...WILL ANYONE EVEN BELIEVE I WAS THERE?
      </h4>
      <a
        href="https://discord.gg/RV6nmsGrgH"
        target="_blank"
        className="mt-3 flex w-fit flex-grow-0 justify-center rounded-md bg-brandDark px-3 py-2 text-xxs font-bold text-white hover:bg-brandDarkHover"
      >
        JOIN SOCIAL
      </a>
    </div>
  );
};
