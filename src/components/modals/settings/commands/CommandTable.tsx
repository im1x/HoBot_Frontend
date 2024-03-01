import React from "react";
import { Table } from "@mantine/core";
import { SettingsCommand } from "../../../../models/response/SettingsResponse.ts";
import ReadOnlyRow from "./ReadOnlyRow.tsx";
import EditableRow from "./EditableRow.tsx";
import { UseFormReturnType } from "@mantine/form";

const CommandTable: React.FC<{
  headers: { title: string; width: string }[];
  commands: SettingsCommand[];
  editAlias: string;
  handleEdit: (event: React.MouseEvent<HTMLElement>, alias: string) => void;
  handleDelete: (alias: string) => void;
  form: UseFormReturnType<
    SettingsCommand,
    (values: SettingsCommand) => SettingsCommand
  >;
  onSubmit: (event: React.FormEvent) => void;
  handleCancel: () => void;
}> = ({
  headers,
  commands,
  editAlias,
  handleEdit,
  handleDelete,
  form,
  onSubmit,
  handleCancel,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            {headers.map((header, index) => (
              <Table.Th key={index} w={header.width}>
                {header.title}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {commands.map((command) =>
            editAlias !== command.alias ? (
              <ReadOnlyRow
                key={command.alias}
                cmd={command}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ) : (
              <EditableRow
                key={command.alias}
                cmd={command}
                form={form}
                handleCancel={handleCancel}
              />
            ),
          )}
        </Table.Tbody>
      </Table>
    </form>
  );
};

export default CommandTable;
