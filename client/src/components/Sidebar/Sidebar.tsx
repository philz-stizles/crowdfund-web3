import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../../constants/nav-links";
import { logo, sun } from "../../assets";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation(); // pathname | state | search | hash
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon className="w-[52px] h-[52px] bg-[#2c2f32]" icon={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navLinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={pathname === link.link}
              onClick={() => {
                if (!link.disabled) {
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon className="bg-[#1c1c24] shadow-secondary" icon={sun} />
      </div>
    </div>
  );
};

type IconProps = {
  name?: string;
  icon?: string;
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const Icon = ({ className, icon, isActive, disabled, onClick }: IconProps) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${className}`}
    onClick={onClick}
  >
    {isActive ? (
      <img src={icon} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={icon}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${!isActive && "grayscale"}`}
      />
    )}
  </div>
);

export default Sidebar;
