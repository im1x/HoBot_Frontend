import {Avatar, Group, UnstyledButton, Text, rem} from "@mantine/core";
import {IconChevronRight} from "@tabler/icons-react";
import classes from './UserButton.module.css';

const Index = () => {
  return (
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

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  )
}

export default Index;
