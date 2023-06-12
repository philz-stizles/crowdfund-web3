import { createCampaign, dashboard, logout, payment, withdraw, profile } from "../assets";

export const navLinks: {
  name: string;
  icon: string;
  link: string;
  disabled?: boolean;
}[] = [
  {
    name: "dashboard",
    icon: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    icon: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "payment",
    icon: payment,
    link: "/payment",
    disabled: true,
  },
  {
    name: "withdraw",
    icon: withdraw,
    link: "/withdraw",
    disabled: true,
  },
  {
    name: "profile",
    icon: profile,
    link: "/profile",
  },
  {
    name: "logout",
    icon: logout,
    link: "/logout",
    disabled: true,
  },
];