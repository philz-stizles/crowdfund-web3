import { Link, useNavigate } from "react-router-dom";
import { Button, Search } from "..";
import { logo, menu, thirdweb } from "../../assets";
import { useCampaignContext } from "../../context/CampaignContext";
import { useState } from "react";
import { navLinks } from "../../constants/nav-links";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("dashboard");
  const [showDrawer, setShowDrawer] = useState(false);
  const navigate = useNavigate();
  const { connect, address } = useCampaignContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      {/* Large screen navigation */}
      <Search />
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <Button
          title={address ? "Create a campaign" : "Connect"}
          className={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          onClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setShowDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !showDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                name={link.name}
                icon={link.icon}
                isActive={link.name === activeLink}
                onClick={() => {
                  setActiveLink(link.name);
                  setShowDrawer(false);
                  navigate(link.link);
                }}
              />
            ))}
          </ul>

          <div className="flex mx-4">
            <Button
              title={address ? "Create a campaign" : "Connect"}
              className={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              onClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {
  name: string;
  icon?: string;
  isActive: boolean;
  onClick: () => void;
};

const NavLink = ({ name, icon, isActive, onClick }: Props) => {
  return (
    <li
      key={name}
      className={`flex p-4 ${isActive && "bg-[#3a3a43]"}`}
      onClick={onClick}
    >
      <img
        src={icon}
        alt={name}
        className={`w-[24px] h-[24px] object-contain ${
          isActive ? "grayscale-0" : "grayscale"
        }`}
      />
      <p
        className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
          isActive ? "text-[#1dc071]" : "text-[#808191]"
        }`}
      >
        {name}
      </p>
    </li>
  );
};

export default Navbar;
