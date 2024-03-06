import { ScrollArea } from "@mantine/core";
import {
  IconAdjustments,
  IconHelp,
} from "@tabler/icons-react";
import { LinksGroup } from "./NavbarLinksGroup.tsx";
import classes from "./NavbarNested.module.css";

const mockdata = [
  {
    label: "Настройки",
    icon: IconAdjustments,
    initiallyOpened: true,
    links: [
      { label: "Комманды", link: "/modal/commandsSettings", modal: true },
    ],
  },
  {
    label: "Помощь",
    icon: IconHelp,
    initiallyOpened: true,
    links: [
      { label: "О проекте", link: "/test" },
      { label: "Обратная связь", link: "/modal/feedback", modal: true },
    ],
  },
];

export default function NavbarNested() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </nav>
  );
}
