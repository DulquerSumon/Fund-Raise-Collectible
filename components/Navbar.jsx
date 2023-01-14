import React, { useState, useEffect } from "react";
import { navlinks } from "../constants";
import { CustomButton } from "./";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTasks } from "../components/AppContext";

const Navbar = () => {
  const router = useRouter();
  const { address, contract, active, connect } = useTasks();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  return (
    <div className="flex md:flex-row flex-col-reverse bg-[#13131a] justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-14px placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />
        <div className="w-[72px]  h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img
            // src={search}
            src="/search.svg"
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? "create a campaign" : "connect"}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            // if (address) navigate("create-campaign");

            if (address) router.push("/create-campaign");
            else connect();
          }}
        />

        <Link href="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              // src={thirdweb}
              src="thirdweb.png"
              alt="user"
              className="rounded-full object-contain"
            />
          </div>
        </Link>
      </div>
      {/* small devices navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            // src={thirdweb}
            // src={logo}
            src="/logo.svg"
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
        <img
          // src={menu}
          src="/menu.svg"
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700
            `}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  // navigate(link.link);
                  router.push(link.link);
                  // <Link href="/link.link">Dashboard</Link>;
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "create a campaign" : "connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                // if (address) navigate("create-campaign");

                if (address) router.push("/create_campaign");
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
