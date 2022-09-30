import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BsBorderWidth } from "react-icons/bs";
import { CgTerminal } from "react-icons/cg";
import { MdPrivacyTip } from "react-icons/md";
import { BiLogOutCircle, BiSupport } from "react-icons/bi";
import { TbJewishStar } from "react-icons/tb";
import { GiKnightBanner } from "react-icons/gi";
import image from "../../../assets/Final Direct2U Logo-01.png";

import {
  MdDashboardCustomize,
  MdOutlineProductionQuantityLimits,
  MdOutlineCategory,
  MdOutlineNotifications,
} from "react-icons/md";

const Sidebar = ({ hamb, setHamb }) => {
  const nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3" />,
      link: "/vendorDashboard",
      name: "Dashboard",
    },
    {
      icon: <MdOutlineProductionQuantityLimits className="text-xl mr-3" />,
      link: "/vendorProducts",
      name: "Products",
    },

    {
      icon: <MdOutlineCategory className="text-xl mr-3" />,
      link: "/vendorCategories",
      name: "Categories",
    },
    {
      icon: <GiKnightBanner className="text-xl mr-3" />,
      link: "/vendorUsers",
      name: "Users",
    },
    {
      icon: <GiKnightBanner className="text-xl mr-3" />,
      link: "/vendorOrders",
      name: "Orders",
    },
    {
      icon: <BsBorderWidth className="text-xl mr-3" />,
      link: "/vendorTransactions",
      name: "Transactions",
    },
    {
      icon: <CgTerminal className="text-xl mr-3" />,
      link: "/vendorFavorites",
      name: "Favorites",
    },

    // {
    //   icon: <MdPrivacyTip className="text-xl mr-3" />,
    //   link: "/vendorPrivacy",
    //   name: "Privacy Policy",
    // },
    {
      icon: <BiSupport className="text-xl mr-3" />,
      link: "/vendorSupport",
      name: "Help and Support ",
    },
    {
      icon: <TbJewishStar className="text-xl mr-3" />,
      link: "/vendorComplaints",
      name: "Complaint",
    },
    {
      icon: <TbJewishStar className="text-xl mr-3" />,
      link: "/vendorReports",
      name: "Report",
    },
    {
      icon: <TbJewishStar className="text-xl mr-3" />,
      link: "/vendorCoupons",
      name: "Coupons",
    },
    {
      icon: <TbJewishStar className="text-xl mr-3" />,
      link: "/vendorCommission",
      name: "Commission",
    },
    {
      icon: <BiLogOutCircle className="text-xl mr-3" />,
      link: "/vendorLogin",
      name: "Logout",
    },
  ];
  return (
    <>
      <aside className="p-4 h-auto">
        {/* Top */}
        <div className="w-full md:hidden relative  p-2 mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>
        {/* Logo */}
        <figure className="flex  flex-col items-center">
          <span className="font-bold text-[rgb(241,146,46)]">
            <img src={image} className="h-24" />
          </span>
        </figure>
        {/* Nav-menu */}
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <Link to={nav.link} key={nav.name} className="">
                <span className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm">
                  {nav.icon} {nav.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
