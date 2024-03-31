'use client';
import {
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Input,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import {
  IconCheck,
  IconEdit,
  IconLineDashed,
  IconMenu,
  IconMenu2,
  IconPlus,
  IconX,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

function page({ params }) {
  const [user, setUser] = useLocalStorage({
    key: 'user-data',
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });

  const data = user?.drafts.find((draft) => draft.id === params.id);

  const [title, setTitle] = useState(data?.title);
  const [variation, setVariation] = useState(0);

  // const questions = JSON.parse(
  //   '{"questions":[{"question":"What is the capital of France?","choices":["Paris","London","Berlin","Madrid"],"answer":"Paris","question_type":"MULTIPLE_CHOICE"},{"question":"The sun rises in the west. (True/False)","answer":"False","question_type":"TRUE_FALSE"},{"question":"What is the largest planet in our solar system?","answer":"Jupiter","question_type":"SHORT_ANSWER"}]}'
  // ).questions;

  const questions = data?.variations[variation]?.questions;

  useEffect(() => {
    if (!user) return;
    setTitle(data?.title);
  }, [user]);

  return (
    <div className="flex flex-col p-8 h-full w-full">
      <Flex direction="row" justify="space-between">
        <Title order={2}>Edit Quiz</Title>
        <Input
          className="input-right-alight"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          style={{ fontWeight: 700, fontSize: '1.25rem' }}
          variant="unstyled"
          rightSection={<IconEdit size={16} />}
        />
      </Flex>
      <Divider my="md" />
      <Group gap="xl" mb={45}>
        <Text fw={500} size="xl">
          Variations
        </Text>
        {data?.variations?.map((_, i) => (
          <>
            <Center
              className={`w-10 rounded-full aspect-square text-lg hover:cursor-pointer ${
                variation === i
                  ? 'bg-black text-white'
                  : 'border border-black bg-white text-black'
              }`}
              onClick={() => setVariation(i)}
            >
              {i + 1}
            </Center>
          </>
        ))}
        {/* <Center className="w-10 rounded-full aspect-square text-lg border border-black">
          <IconPlus />
        </Center> */}
      </Group>
      <Flex direction="column" gap="xl">
        {questions?.map((question, i) => (
          <Question question={question} index={i} />
        ))}
      </Flex>
      <Flex direction="row" justify="center" py={40}>
        <Button size="md">Save Changes</Button>
      </Flex>
    </div>
  );
}

export default page;

const Question = ({ question, index }) => {
  let choices = null;

  if (question?.question_type === 'MULTIPLE_CHOICE') {
    choices = question.choices;
  } else if (question?.question_type === 'TRUE_FALSE') {
    choices = ['True', 'False'];
  }

  return (
    <Flex direction="row" gap="xl">
      <IconMenu2 />
      <Flex direction="column" className="w-full">
        <Text>
          {index + 1}. {question.question}
        </Text>
        {choices?.map((choice) => (
          <Flex mt={20}>
            <Center
              className={`h-[80%] aspect-square rounded-full ${
                question?.answer === choice ? 'bg-green-400' : 'bg-[#D9D9D9]'
              }`}
              mr={20}
            >
              {question?.answer === choice ? (
                <IconCheck size={16} />
              ) : (
                <IconX size={16} />
              )}
            </Center>
            <Input
              className="w-full"
              value={choice}
              rightSection={<IconEdit size={16} />}
              radius={0}
            />
          </Flex>
        ))}

        {choices === null && (
          <Flex mt={20}>
            <Center
              className={`h-[28.8px] w-[28.8px] aspect-square rounded-full bg-[#D9D9D9]`}
              mr={20}
            >
              <IconLineDashed size={16} />
            </Center>
            <Textarea
              className="w-full"
              value={question?.answer}
              disabled
              radius={0}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
