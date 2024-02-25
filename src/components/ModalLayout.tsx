import { useNavigate, useParams } from "react-router-dom";
import {Modal} from "@mantine/core";
import { A } from "./modals/A.tsx";
import { B } from "./modals/B.tsx";
import { ReactNode } from "react";
import {CommandsSettings} from "./modals/settings/commands/CommandsSettings.tsx";

type ContentComponents = {
  [key: string]: {modal: ReactNode, label: string};
};

export const ModalLayout = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    navigate("/");
    return null;
  }
  const contentComponents: ContentComponents = {
    a: {modal: <A />, label: "A"},
    b: {modal: <B />, label: "B"},
    commandsSettings: {modal: <CommandsSettings />, label: "Настройки команд"},
    // Add more mappings for other parameters
  };


  const selectedContent = contentComponents[id] || null;

  return (

    <Modal size="xl" opened={true} onClose={() => navigate("/")} title={selectedContent?.label}>
        {selectedContent?.modal}
    </Modal>

  );
};

export default ModalLayout;
