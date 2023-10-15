// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {useToggle, useDisclosure} from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import {authApi} from "../services/AuthService.ts";
import {IRegistration} from "../models/Registration.ts";
import {store} from "../store/store.ts";
import {setUserAndAuth} from "../store/reducers/UserSlice.ts";
import {useEffect} from "react";
const Login = () => {
  const [registerUser, { data: newUser, isSuccess: regIsSuccess }] = authApi.useRegisterMutation();
  const [loginUser, { data: user, isSuccess: loginIsSuccess , error:LoginError}] = authApi.useLoginMutation();
  const [type, typeToggle] = useToggle(['login', 'register']);
  const [passVisible, { toggle: passToggle }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      login: '',
      password: '',
      passwordConfirm: '',
      terms: false,
    },

    validate: {
      login: (val) => val.length < 3 ? 'Логин должен содержать хотя бы 3 символа': null,
      password: (val) => val.length < 6 ? 'Пароль должен содержать хотя бы 6 символов' : null,
      passwordConfirm: (val, values) => type === 'register' && val !== values.password ? 'Пароли не совпадают' : null,
    },
  });

  useEffect(() => {
    if (type === 'register' && regIsSuccess) {
      store.dispatch(setUserAndAuth(newUser));
    } else if (loginIsSuccess) {
      store.dispatch(setUserAndAuth(user));
    }
  }, [user, newUser]);

  const handleSubmit = async () => {
    console.log("--------------- handleSubmit");
    const formValues = {
      login: form.values.login,
      password: form.values.password,
    } as IRegistration

    if (type === 'register') {
      await registerUser(formValues);
    } else {
      await loginUser(formValues);

    }

  };


  return (
    <>
      <Paper className="max-w-sm mx-auto" radius="md" p="xl" withBorder>
        <Text size="lg" fw={500} mb="lg">
          {type === 'register' ? 'Регистрация' : 'Вход'}
        </Text>

        {(LoginError && 'status' in LoginError) &&
          <Text size="sm">Error: {JSON.stringify(LoginError.data)}</Text>
        }

        <form onSubmit={form.onSubmit(async () => {await handleSubmit()})}>
          <Stack>
            <TextInput
              required
              label="Логин"
              placeholder="Ваше имя"
              {...form.getInputProps('login')}
              //value={form.values.login}
              //onChange={(event) => form.setFieldValue('login', event.currentTarget.value)}
              radius="md"
            />

            <PasswordInput
              required
              label="Пароль"
              placeholder="Ваш пароль"
              {...form.getInputProps('password')}
              /*value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}*/
              visible={passVisible}
              onVisibilityChange={passToggle}
              radius="md"
            />

            {type === 'register' && (
              <div>
                <PasswordInput
                  required
                  label="Подтвердите пароль"
                  placeholder="Подтвердите Ваш пароль"
                  {...form.getInputProps('passwordConfirm')}
                  /*value={form.values.passwordConfirm}
                  onChange={(event) => form.setFieldValue('passwordConfirm', event.currentTarget.value)}*/
                  visible={passVisible}
                  onVisibilityChange={passToggle}
                  radius="md"
                />
                <Checkbox mt="xl"
                  label="Я принимаю условия пользовательского соглашения"
                  checked={form.values.terms}
                  onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                />
              </div>
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => {typeToggle(); form.reset()}} size="xs">
              {type === 'register'
                ? 'Уже есть аккаунт? Войти'
                : "Нет аккаунта? Зарегистрироваться"}
            </Anchor>
            <Button disabled={type === 'register' && !form.values.terms} type="submit" radius="xl">
              {type === 'register' ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </Group>
        </form>
      </Paper>
  </>

);
};

export default Login;
