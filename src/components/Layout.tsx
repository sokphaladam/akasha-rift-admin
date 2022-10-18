import React, { PropsWithChildren } from "react";

export function Layout(props: PropsWithChildren<{ title: string }>) {
  return (
    <div>
      <h3 style={{ color: "#555" }}>{props.title}</h3>
      <br />
      <div>{props.children}</div>
    </div>
  );
}
