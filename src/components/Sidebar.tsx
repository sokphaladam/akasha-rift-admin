import React, { useEffect, useRef, useState } from "react";
import { DashboardIcon, SettingsIcon } from "evergreen-ui";
import "../styles/sidebar.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const sidebarNavItems = [
  {
    display: "Dashbord",
    icon: <DashboardIcon />,
    to: "/",
    section: "",
  },
  {
    display: "Setting",
    icon: <SettingsIcon />,
    to: "/setting",
    section: "setting",
  },
];

export function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef<HTMLDivElement | any>();
  const indicatorRef = useRef<HTMLDivElement | any>();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current?.querySelector(
        ".sidebar__menu__item"
      );
      indicatorRef.current.style.height = `${sidebarItem?.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">Akasha Rift</div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>
        {sidebarNavItems.map((item, index) => {
          return (
            <Link to={item.to} key={index} style={{ textDecoration: "none" }}>
              <div
                className={`sidebar__menu__item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <div className="sidebar__menu__item__icon">{item.icon}</div>
                <div className="sidebar__menu__item__text">{item.display}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
