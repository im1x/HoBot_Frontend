import { ScrollArea } from "@mantine/core";
import {
  IconAdjustments,
  IconHelp,
} from "@tabler/icons-react";
import { LinksGroup } from "./NavbarLinksGroup.tsx";

const mockdata = [
  {
    label: "Настройки",
    icon: IconAdjustments,
    initiallyOpened: true,
    links: [
      { label: "Комманды", link: "/modal/commandsSettings", modal: true },
      { label: "Заказ песен", link: "/modal/songRequestsSettings", modal: true },
    ],
  },
  {
    label: "Помощь",
    icon: IconHelp,
    initiallyOpened: true,
    links: [
      { label: "О проекте", link: "/modal/about", modal: true },
      { label: "Обратная связь", link: "/modal/feedback", modal: true },
    ],
  },
];

export default function NavbarNested() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav>
      <ScrollArea>
        <div>{links}</div>
      </ScrollArea>
    </nav>
  );
}
