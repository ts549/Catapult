import { Badge, Flex, Group, Text, rem } from '@mantine/core';
import {
  IconDotsVertical,
  IconAlarm,
  IconChevronRight,
} from '@tabler/icons-react';

const QuizItem = ({ title, questions, minutes, lastEdited }) => {
  return (
    <div className="flex flex-col p-4 bg-white rounded-sm min-w-[250px]">
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
        <Text size="xs">Last edited at {getTimeFormat(lastEdited)}</Text>
        <Group gap={0}>
          <Text size="xs">Edit</Text>
          <IconChevronRight size={16} />
        </Group>
      </Flex>
    </div>
  );
};

export default QuizItem;

const getTimeFormat = (date) => {
  // Get hours and minutes
  const newDate = new Date(date);

  var hours = newDate.getHours();
  var minutes = newDate.getMinutes();

  // Convert hours to 12-hour format and determine AM or PM
  var meridiem = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours) as 12 AM

  // Pad minutes with leading zero if necessary
  minutes = minutes < 10 ? '0' + minutes : minutes;

  // Concatenate hours, minutes, and meridiem
  var timeString = hours + ':' + minutes + ' ' + meridiem;

  return timeString;
};
