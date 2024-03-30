'use client';
import { Box, Flex, Group, Input, Text, Title, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconSearch } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';
import QuizItem from '../../../../components/QuizItem';

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
