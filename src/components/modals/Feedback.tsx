import {Button, Center, Textarea} from "@mantine/core";
import { useState } from "react";
import {commonApi} from "../../services/CommonService.ts";
import {notifications} from "@mantine/notifications";
import {IconCheck, IconX} from "@tabler/icons-react";

const Feedback = () => {
  const [text, setText] = useState("")
  const [sendFeedback] = commonApi.useSendFeedbackMutation()

  const handleSubmit = () => {
    sendFeedback(text).then((res) => {
      console.log(res);
      if ("error" in res) {
        notifications.show({
          message: "Ошибка отправки",
          color: "red",
          icon: <IconX />,
        });
      } else {
        notifications.show({
          message: "Отправлено",
          color: "green",
          icon: <IconCheck />,
        });
        setText("");
      }
    })
  }
  return (
    <>
      <Textarea resize="vertical" placeholder="Напишите нам! Что угодно 😀" size="md" value={text} onChange={(e) => setText(e.target.value)}/>
      <Center mt="md">
        <Button disabled={text === ""} onClick={handleSubmit}>Отправить</Button>
      </Center>
    </>
  )
}

export default Feedback;
