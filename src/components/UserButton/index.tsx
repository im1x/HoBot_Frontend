import {
  Avatar,
  Group,
  UnstyledButton,
  Text,
  rem,
  Menu,
} from "@mantine/core";
import {
  IconChevronRight,
  IconLogout,
  IconTrash,
} from "@tabler/icons-react";
import classes from "./UserButton.module.css";
import {modals} from "@mantine/modals";

const UserButton = () => {

  const openModalDeleteAccount = () =>
    modals.openConfirmModal({
      title: 'Удалить аккаунт?',
      centered: true,
      children: (
        <Text size="sm">
          Вы уверены, что хотите удалить аккаунт? Это удалит Ваши настройки и отключит бота от чата, но Вы сможете вернутся в любое время.
        </Text>
      ),
      labels: { confirm: 'Удалить аккаунт', cancel: "Не удалять" },
      confirmProps: { color: 'red' },
      onConfirm: () => console.log('Confirmed'),
    });

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton className={classes.user}>
            <Group>
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                radius="xl"
              />

              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  Harriette
                </Text>

                <Text c="dimmed" size="xs">
                  hspoonlicker
                </Text>
              </div>

              <IconChevronRight
                style={{ width: rem(14), height: rem(14) }}
                stroke={1.5}
              />
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          >
            Выход
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Внимание!</Menu.Label>
          <Menu.Item
            color="red"
            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
            onClick={openModalDeleteAccount}
          >
            Удалить аккаунт
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default UserButton;
