'use client';
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Input,
  Stack,
  Text,
  Title,
  rem,
} from '@mantine/core';
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconSearch,
  IconDotsVertical,
  IconAlarm,
  IconChevronCompactRight,
  IconChevronRight,
} from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';

function BaseDemo(props) {
  const [value, setValue] = useState('Clear me');

  return (
    <div className="px-8 py-4 w-full">
      <Title order={2} mb={12}>
        Create Quiz
      </Title>

      <Dropzone
        // className="w-full"
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-blue-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-red-6)',
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: 'var(--mantine-color-dimmed)',
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>

      <Flex direction="row" justify="space-between" mt={36} mb={12}>
        <Title order={2}>Quizzes</Title>

        <Input
          placeholder="Search for quizzes"
          rightSection={<IconSearch size={16} />}
        />
      </Flex>

      <Box
        my="xl"
        w="100%"
        p="lg"
        href="/"
        bg="#FEEAEA"
        style={{ borderLeft: 4, borderColor: 'red', borderStyle: 'solid' }}
      >
        <Title order={3}>Drafts</Title>
        <Flex mt={12} direction="row" gap="lg" wrap={'wrap'}>
          <QuizItem title="Quiz 1" questions={10} minutes={10} />
          <QuizItem title="Quiz 1" questions={10} minutes={10} />
          <QuizItem title="Quiz 1" questions={10} minutes={10} />
          <QuizItem title="Quiz 1" questions={10} minutes={10} />
        </Flex>
      </Box>
    </div>
  );
}

export default BaseDemo;

const QuizItem = ({ title, questions, minutes }) => {
  return (
    <div className="flex flex-col p-4 bg-white rounded-sm min-w-[230px]">
      <Text fw={500} size="xl">
        {title}
      </Text>

      <Group gap="sm" mt={10} mb={120}>
        <Badge
          leftSection={
            <IconDotsVertical style={{ width: rem(12), height: rem(12) }} />
          }
          color="red"
          variant="default"
          bg="#FEEAEA"
          style={{ border: 1, borderColor: 'red', borderStyle: 'solid' }}
        >
          {questions} Questions
        </Badge>

        <Badge
          leftSection={
            <IconAlarm style={{ width: rem(12), height: rem(12) }} />
          }
          color="red"
          variant="default"
          bg="#FEEAEA"
          style={{ border: 1, borderColor: 'red', borderStyle: 'solid' }}
        >
          ~{minutes} Minutes
        </Badge>
      </Group>
      <Flex direction="row" justify="space-between">
        <Text size="xs">Last edited at 10:49 PM</Text>
        <Group gap={0}>
          <Text size="xs">Edit</Text>
          <IconChevronRight size={16} />
        </Group>
      </Flex>
    </div>
  );
};
