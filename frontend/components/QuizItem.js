'use client';
import { Badge, Flex, Group, Text, rem } from '@mantine/core';
import {
  IconDotsVertical,
  IconAlarm,
  IconChevronRight,
} from '@tabler/icons-react';

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

export default QuizItem;
