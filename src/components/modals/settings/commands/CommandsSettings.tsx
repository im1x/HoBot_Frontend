import { settingsApi } from "../../../../services/SettingsService.ts";
import {
  ActionIcon,
  Divider,
  Flex,
  Paper,
  Select,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { SettingsCommand } from "../../../../models/response/SettingsResponse.ts";
import React, { useCallback, useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import CommandTable from "./CommandTable.tsx";

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
      payload: "",
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
    { value: "2", label: "Владелец" },
  ];

  useEffect(() => {
    if (commandsReq) {
      setCommands(commandsReq);
    }
  }, [commandsReq]);

  const handleSubmitAdd = async () => {
    const updatedValues = {
      ...formAdd.getValues(),
      access_level: parseInt(formAdd.getValues().access_level?.toString() || "0"),
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
    setEditAlias("");
  };

  const handleFormEdit = (event: React.FormEvent) => {
    event.preventDefault();
    const index = commands.findIndex((cmd) => cmd.alias === editAlias);
    const updatedCommands = [...commands];

    if (
      formEdit.getValues().alias === updatedCommands[index].alias &&
      formEdit.getValues().access_level?.toString() ===
        updatedCommands[index].access_level?.toString() &&
      formEdit.getValues().payload === updatedCommands[index].payload
    ) {
      setEditAlias("");
      return;
    }

    updatedCommands[index] = formEdit.getValues();
    updatedCommands[index].access_level = parseInt(
      updatedCommands[index].access_level?.toString() || "0",
    );
    updatedCommands[index].payload = formEdit.getValues().payload || "";

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

  const isCommonCommandExists = () => {
    return commands?.some((command) => command.payload === "") ?? false;
  };

  const isTextCommandExists = () => {
    return commands?.some((command) => command.payload !== "") ?? false;
  };

  const headers1 = [
    { title: "Описание", width: "40%" },
    { title: "Команда", width: "15%" },
    { title: "Уровень доступа", width: "40%" },
    { title: "Действия", width: "5%" },
  ];

  const headers2 = [
    { title: "Описание", width: "40%" },
    { title: "Команда", width: "15%" },
    { title: "Текст", width: "40%" },
    { title: "Действия", width: "5%" },
  ];

  return (
    <>
      {isCommonCommandExists() && (
        <>
          <Divider
            size="lg"
            label={<Text size="lg">Основные команды</Text>}
            labelPosition="center"
          />
          <CommandTable
            headers={headers1}
            commands={commands
              .filter((command) => command.payload === "")
              .sort((a, b) => a.alias.localeCompare(b.alias))}
            editAlias={editAlias}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            form={formEdit}
            onSubmit={handleFormEdit}
            handleCancel={handleCancel}
          />
        </>
      )}

      {isTextCommandExists() && (
        <>
          <Divider
            mt="xl"
            size="lg"
            label={<Text size="lg">Текстовые команды</Text>}
            labelPosition="center"
          />
          <CommandTable
            headers={headers2}
            commands={commands
              .filter((command) => command.payload !== "")
              .sort((a, b) => a.alias.localeCompare(b.alias))}
            editAlias={editAlias}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            form={formEdit}
            onSubmit={handleFormEdit}
            handleCancel={handleCancel}
          />
        </>
      )}

      <form
        onSubmit={formAdd.onSubmit(async () => {
          await handleSubmitAdd();
        })}
      >
        <Paper mt="xl" shadow="x" withBorder p="sm">
          <Flex
            gap="md"
            justify="space-between"
            align="center"
            direction="row"
            wrap="nowrap"
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
            {formAdd.getValues().command === "Print_Text" ? (
              <Textarea
                placeholder="Текст"
                {...formAdd.getInputProps("payload")}
              />
            ) : (
              <Select
                placeholder="Уровень доступа"
                data={accessLevel}
                {...formAdd.getInputProps("access_level")}
              />
            )}
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
