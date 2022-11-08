import { Route, Routes } from "react-router-dom";
import { RouteMap } from "./RouterMap";

export default function Router() {
  return (
    <Routes>
      {RouteMap.map((x, i) => {
        return <Route {...x} key={i} />;
      })}
    </Routes>
  );
}
