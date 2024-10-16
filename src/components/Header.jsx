import HeadLogo from "../assets/headerlogo.png";
// import Logo from "../assets/logo.png";


const HeaderLogo = () => {

  return (
    <div>
      <div className="pt-10 mx-auto flex justify-center">
          <img
            src={HeadLogo}
            alt="Header Logo"
            className=" h-[36px] w-[228px]"
          />
      </div>
      {/* <div className="pt-[40px]">
        <img src={Logo} alt="Logo" className="h-[48px] w-[48px] mx-auto" />
      </div> */}
    </div>
  );
};

export default HeaderLogo;