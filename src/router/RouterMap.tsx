import { RouteProps } from "react-router-dom";
import { LogoPage } from "../page/LogoPage";
import { StoryPage } from "../page/StoryPage";
import { ContentBlock as ContentBlockT } from "../page/team/ContenBlock";
import { ContentBlock as ContentBlockR } from "../page/roadmap/ContenBlock";
import { ContentBlock as ContentBlockC } from "../page/character/ContentBlock";
import { ContentBlock as ContentBlockF } from "../page/faq/ContentBlock";
import { JoinTeamPage } from "../page/JoinTeamPage";
import { SettingPage } from "../page/SettingPage";
import { CharacterList } from "../page/character/CharacterList";
import { CreateCharacter } from "../page/character/create";
import { RoadMapList } from "../page/roadmap/RoadMapList";
import { RoadMapForm } from "../page/roadmap/RoadMapForm";
import { TeamForm } from "../page/team/TeamForm";
import { TeamList } from "../page/team/TeamList";

function Blank() {
  return <div>This is Blank page</div>;
}

export const RouteMap: RouteProps[] = [
  {
    path: "/",
    element: <Blank />,
  },
  {
    path: "/block/logo",
    element: <LogoPage />,
  },
  {
    path: "/block/story",
    element: <StoryPage />,
  },
  {
    path: "/block/_bcharacter",
    element: <ContentBlockC />,
  },
  {
    path: "/block/_broadmap",
    element: <ContentBlockR />,
  },
  {
    path: "/block/_bteam",
    element: <ContentBlockT />,
  },
  {
    path: "/block/_bfaq",
    element: <ContentBlockF />,
  },
  {
    path: "/block/join_team",
    element: <JoinTeamPage />,
  },
  {
    path: "/setting",
    element: <SettingPage />,
  },
  {
    path: "/character/list",
    element: <CharacterList />,
  },
  {
    path: "/character/create",
    element: <CreateCharacter />,
  },
  {
    path: "/character/edit/:id",
    element: <CreateCharacter />,
  },
  {
    path: "/roadmap/list",
    element: <RoadMapList />,
  },
  {
    path: "/roadmap/create",
    element: <RoadMapForm />,
  },
  {
    path: "/roadmap/edit/:id",
    element: <RoadMapForm />,
  },
  {
    path: "/team/list",
    element: <TeamList />,
  },
  {
    path: "/team/create",
    element: <TeamForm />,
  },
  {
    path: "/team/edit/:id",
    element: <TeamForm />,
  },
];
