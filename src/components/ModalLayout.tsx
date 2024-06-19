import { useNavigate, useParams } from "react-router-dom";
import {Modal} from "@mantine/core";
import { ReactNode } from "react";
import {CommandsSettings} from "./modals/settings/commands/CommandsSettings.tsx";
import Feedback from "./modals/Feedback.tsx";
import About from "./modals/About.tsx";
import SongRequestsSettings from "./modals/settings/songRequests";
import Voting from "./modals/Voting";

type ContentComponents = {
  [key: string]: {modal: ReactNode, label: string, size?: string};
};

export const ModalLayout = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    navigate("/");
    return null;
  }
  const contentComponents: ContentComponents = {
    commandsSettings: {modal: <CommandsSettings />, label: "Настройки команд"},
    songRequestsSettings: {modal: <SongRequestsSettings />, label: "Настройки заказа песен"},
    feedback: {modal: <Feedback />, label: "Обратная связь"},
    about: {modal: <About />, label: "О проекте"},
    voting: {modal: <Voting />, label: "Голосование", size: "100%"},
    // Add more mappings for other parameters
  };


  const selectedContent = contentComponents[id] || null;

  return (

    <Modal size={selectedContent?.size ? selectedContent?.size : "xl"} opened={true} onClose={() => navigate("/")} title={selectedContent?.label}>
        {selectedContent?.modal}
    </Modal>

  );
};

export default ModalLayout;
