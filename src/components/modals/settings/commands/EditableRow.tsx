import { SettingsCommand } from "../../../../models/response/SettingsResponse.ts";
import React from "react";
import {ActionIcon, Select, Table, Textarea, TextInput} from "@mantine/core";
import {IconCheck, IconPencilOff} from "@tabler/icons-react";
import {UseFormReturnType} from "@mantine/form";

const EditableRow: React.FC<{
  cmd: SettingsCommand;
  handleCancel: () => void;
  form: UseFormReturnType<SettingsCommand, (values: SettingsCommand) => SettingsCommand>;
}> = ({ cmd, handleCancel, form: form }) => {
  const accessLevel = [{value: "0", label: "Все"}, {value: "1", label: "Модераторы и владелец"}, {value: "2", label: "Владелец"}];
  return (
      <Table.Tr key={cmd.alias}>
        <Table.Td>{cmd.description}</Table.Td>
        <Table.Td>
          <TextInput {...form.getInputProps("alias")} />
        </Table.Td>
        <Table.Td>
          {cmd.payload === "" ?
            <Select data={accessLevel} {...form.getInputProps("access_level")} /> :
            <Textarea {...form.getInputProps("payload")} />}
        </Table.Td>
        <Table.Td>
          <ActionIcon type="submit" variant="filled" aria-label="Edit">
            <IconCheck style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="filled" aria-label="Cancel" ml="5px" onClick={handleCancel}>
            <IconPencilOff style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
  );
};

export default EditableRow;
