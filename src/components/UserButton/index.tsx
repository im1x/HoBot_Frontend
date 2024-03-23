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
import {authApi} from "../../services/AuthService.ts";
import {useSelector} from "react-redux";
import {selectUserState} from "../../store/reducers/UserSlice.ts";

const UserButton = () => {
  const userStore = useSelector(selectUserState);
  const [logout] = authApi.useLogoutMutation();
  const [wipe] = authApi.useWipeMutation();

  const handleLogout = () => {
    logout().then(() => {
      localStorage.removeItem("token");
      window.location.reload();
    });
  }

    const handleWipe = () => {
      wipe().then(() => {
        localStorage.removeItem("token");
        window.location.reload();
      });
  }

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
      onConfirm: () => handleWipe(),
    });

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton className={classes.user}>
            <Group>
              <Avatar
                src={userStore?.user?.avatar_url}
                radius="xl"
              />

              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {userStore?.user?.channel}
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
            onClick={handleLogout}
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
