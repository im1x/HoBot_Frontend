import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "@mantine/core";
import { A } from "./modals/A.tsx";
import { B } from "./modals/B.tsx";
import { ReactNode } from "react";

type ContentComponents = {
  [key: string]: ReactNode;
};

export const ModalLayout = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    navigate("/");
    return null;
  }
  const contentComponents: ContentComponents = {
    a: <A />,
    b: <B />,
    // Add more mappings for other parameters
  };
  const selectedContent = contentComponents[id] || null;

  return (
    <Modal opened={true} onClose={() => navigate("/")} title="Authentication">
      {selectedContent}
    </Modal>
  );
};
