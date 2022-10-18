import { Avatar, Menu, Popover } from "evergreen-ui";
import React from "react";
import "../styles/topbar.scss";
import { signOut } from "firebase/auth";
import { auth } from "../service/firebase";

export function Topbar() {
  const onClickSignOut = () => {
    const confirm = window.confirm("Are sure you want to sign out?");
    if (confirm) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="topbar">
      <div style={{ marginRight: "1rem" }}>
        <Popover
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item onClick={onClickSignOut}>Logout</Menu.Item>
              </Menu.Group>
            </Menu>
          }
        >
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Avatar name="Admin" size={40} />
            <span style={{ marginLeft: 7, fontWeight: 700, color: "#555" }}>
              Adminstration
            </span>
          </div>
        </Popover>
      </div>
    </div>
  );
}
