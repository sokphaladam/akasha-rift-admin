import React, { useEffect, useRef, useState } from "react";
import {
  DashboardIcon,
  SettingsIcon,
  PageLayoutIcon,
  AntennaIcon,
  Popover,
  Menu,
  ApplicationIcon,
  ThirdPartyIcon,
  InheritedGroupIcon,
  LayoutHierarchyIcon,
  MugshotIcon,
  HelpIcon,
} from "evergreen-ui";
import "../styles/sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const sidebarNavItems = [
  {
    display: "Dashbord",
    icon: <DashboardIcon />,
    to: "/",
    section: "",
  },
  {
    display: "Content Block",
    icon: <PageLayoutIcon />,
    to: "#",
    section: "block",
    sub: [
      {
        display: "Logo",
        icon: AntennaIcon,
        to: "/block/logo",
        section: "logo",
      },
      {
        display: "Story",
        icon: ApplicationIcon,
        to: "/block/story",
        section: "story",
      },
      {
        display: "Character",
        icon: ThirdPartyIcon,
        to: "/block/_bcharacter",
        section: "_bcharacter",
      },
      {
        display: "Roadmap",
        icon: LayoutHierarchyIcon,
        to: "/block/_broadmap",
        section: "_broadmap",
      },
      {
        display: "team",
        icon: MugshotIcon,
        to: "/block/_bteam",
        section: "_bteam",
      },
      {
        display: "FAQ",
        icon: HelpIcon,
        to: "/block/_bfaq",
        section: "_bfaq",
      },
      {
        display: "Join the play",
        icon: InheritedGroupIcon,
        to: "/block/join_team",
        section: "join_team",
      },
    ],
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
  const navigate = useNavigate();

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
          if (item.sub) {
            return (
              <Popover
                key={index}
                content={
                  <Menu>
                    <Menu.Group>
                      {item.sub.map((x, i) => {
                        return (
                          <Menu.Item
                            key={i}
                            icon={x.icon}
                            onClick={() => navigate(x.to)}
                          >
                            {x.display}
                          </Menu.Item>
                        );
                      })}
                    </Menu.Group>
                  </Menu>
                }
              >
                <Link
                  to={item.to}
                  key={index}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className={`sidebar__menu__item ${
                      activeIndex === index ? "active" : ""
                    }`}
                  >
                    <div className="sidebar__menu__item__icon">{item.icon}</div>
                    <div className="sidebar__menu__item__text">
                      {item.display}
                    </div>
                  </div>
                </Link>
              </Popover>
            );
          }

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
