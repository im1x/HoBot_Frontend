import { SettingsCommand } from "@models/response/SettingsResponse";
import React from "react";
import {ActionIcon, Table} from "@mantine/core";
import {IconPencil, IconTrash} from "@tabler/icons-react";

const ReadOnlyRow: React.FC<{
  cmd: SettingsCommand;
  handleEdit: (event: React.MouseEvent<HTMLElement>, alias: string) => void;
  handleDelete: (alias: string) => void;
}> = ({ cmd, handleEdit, handleDelete }) => {
  const accessLevel = ["Все", "Модераторы и владелец", "Владелец"];
  return (
    <Table.Tr key={cmd.alias}>
      <Table.Td>{cmd.description}</Table.Td>
      <Table.Td>{cmd.alias}</Table.Td>
      {cmd.payload === "" ? <Table.Td>{accessLevel[cmd.access_level as number]}</Table.Td> : <Table.Td>{cmd.payload}</Table.Td>}
      <Table.Td>
        <ActionIcon variant="filled" aria-label="Edit" onClick={(event) => handleEdit(event, cmd.alias)}>
          <IconPencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
        <ActionIcon variant="filled" aria-label="Delete" ml="5px" onClick={() => handleDelete(cmd.alias)}>
          <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  );
};

export default ReadOnlyRow;
