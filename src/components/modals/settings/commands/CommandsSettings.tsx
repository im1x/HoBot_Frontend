import { settingsApi } from "../../../../services/SettingsService.ts";
import {
  ActionIcon,
  Flex,
  Paper,
  Select,
  Table,
  TextInput,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { SettingsCommand } from "../../../../models/response/SettingsResponse.ts";
import React, { useCallback, useEffect, useState } from "react";
import ReadOnlyRow from "./ReadOnlyRow.tsx";
import EditableRow from "./EditableRow.tsx";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";

export const CommandsSettings = () => {
  const { data: dropdownCmdList } = settingsApi.useGetCommandsDropdownQuery();
  const { data: commandsReq } = settingsApi.useGetCommandsQuery();
  const [commands, setCommands] = useState<SettingsCommand[]>([]);
  const [addCommand] = settingsApi.useAddCommandMutation();
  const [editCommand] = settingsApi.useEditCommandMutation();
  const [deleteCommand] = settingsApi.useDeleteCommandMutation();
  const formAdd = useForm<SettingsCommand>({
    initialValues: {
      command: null,
      alias: "",
      description: "",
      access_level: null,
    },

    validate: {
      alias: hasLength({ min: 3, max: 15 }, "От 3 до 15 символов"),
    },
  });

  const [editAlias, setEditAlias] = useState("");
  const formEdit = useForm<SettingsCommand>();
  const accessLevel = [
    { value: "0", label: "Все" },
    { value: "1", label: "Модераторы и владелец" },
    {
      value: "2",
      label: "Владелец",
    },
  ];

  useEffect(() => {
    if (commandsReq) {
      setCommands(commandsReq);
    }
  }, [commandsReq]);

  const handleSubmitAdd = async () => {
    const updatedValues = {
      ...formAdd.values,
      access_level: parseInt(formAdd.values.access_level?.toString() || "0"),
    };
    addCommand(updatedValues).then((result) => {
      if ("data" in result) {
        setCommands(result.data);
        notifications.show({
          message: "Добавлено",
          color: "green",
          icon: <IconCheck />,
        });
      } else {
        notifications.show({
          message: "Ошибка добавления",
          color: "red",
          icon: <IconX />,
        });
      }
      formAdd.reset();
    });
  };

  /*  const handleEdit = (event: React.MouseEvent<HTMLElement>, alias: string) => {
      event.preventDefault();
      const index = commands.findIndex((cmd) => cmd.alias === alias);
      const elemConvert = { ...commands[index] };
      elemConvert.access_level = elemConvert.access_level.toString();
      formEdit.setValues(elemConvert);
      setEditAlias(alias);
    };*/

  const handleEdit = useCallback(
    (event: React.MouseEvent<HTMLElement>, alias: string) => {
      event.preventDefault();
      const index = commands.findIndex((cmd) => cmd.alias === alias);
      const elemConvert = { ...commands[index] };
      elemConvert.access_level = elemConvert.access_level?.toString() || "0";
      formEdit.setValues(elemConvert);
      setEditAlias(alias);
    },
    [commands],
  );

  const handleDelete = (alias: string) => {
    deleteCommand(alias).then((result) => {
      if ("data" in result) {
        setCommands(result.data);
        notifications.show({
          message: "Удалено",
          color: "green",
          icon: <IconCheck />,
        });
      } else {
        notifications.show({
          message: "Ошибка удаления",
          color: "red",
          icon: <IconX />,
        });
      }
    });
  };

  const handleCancel = () => {
    console.log("handleCancel");
    setEditAlias("");
  };

  const handleFormEdit = (event: React.FormEvent) => {
    event.preventDefault();
    const index = commands.findIndex((cmd) => cmd.alias === editAlias);
    const updatedCommands = [...commands];

    if (
      formEdit.values.alias === updatedCommands[index].alias &&
      formEdit.values.access_level?.toString() ===
        updatedCommands[index].access_level?.toString()
    ) {
      setEditAlias("");
      return;
    }

    /*const condition1 = formEdit.values.alias === updatedCommands[index].alias;
    const condition2 =
      formEdit.values.access_level?.toString() ===
      updatedCommands[index].access_level?.toString();

    console.log("Condition 1:", condition1);
    console.log("Condition 2:", condition2);

    if (condition1 || condition2) {
      setEditAlias("");
      return;
    }*/

    console.log(formEdit.values);
    console.log(updatedCommands[index]);
    console.log(formEdit.values.access_level?.toString());
    console.log(updatedCommands[index].access_level?.toString());

    updatedCommands[index] = formEdit.values;
    updatedCommands[index].access_level = parseInt(
      updatedCommands[index].access_level?.toString() || "0",
    );
    editCommand({ alias: editAlias, cmd: updatedCommands[index] }).then(
      (result) => {
        if ("data" in result) {
          //setCommands(result.data);
          setCommands(updatedCommands);
          notifications.show({
            message: "Измененно",
            color: "green",
            icon: <IconCheck />,
          });
        } else {
          notifications.show({
            message: "Ошибка изменения",
            color: "red",
            icon: <IconX />,
          });
        }
      },
    );
    setEditAlias("");
  };

  return (
    <>
      <form onSubmit={handleFormEdit}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w="25%">Описание</Table.Th>
              <Table.Th>Команда</Table.Th>
              <Table.Th>Уровень доступа</Table.Th>
              <Table.Th>Действия</Table.Th>
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
                  handleCancel={handleCancel}
                  form={formEdit}
                />
              ),
            )}
          </Table.Tbody>
        </Table>
      </form>

      <form
        onSubmit={formAdd.onSubmit(async () => {
          await handleSubmitAdd();
        })}
      >
        <Paper shadow="x" withBorder p="sm">
          <Flex
            gap="md"
            justify="space-between"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Select
              placeholder="Выберите действие"
              data={dropdownCmdList}
              {...formAdd.getInputProps("command")}
            />
            <TextInput
              placeholder="Введите новую команду"
              {...formAdd.getInputProps("alias")}
            />
            <Select
              placeholder="Уровень доступа"
              data={accessLevel}
              {...formAdd.getInputProps("access_level")}
            />
            <ActionIcon
              type="submit"
              variant="filled"
              aria-label="Delete"
              ml="5px"
            >
              <IconPlus
                style={{ width: "150%", height: "150%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Flex>
        </Paper>
      </form>
    </>
  );
};
