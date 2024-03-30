'use client';
import {
  Box,
  Button,
  Flex,
  Group,
  Input,
  Text,
  Title,
  rem,
} from '@mantine/core';
import { IconSearch, IconFileUpload, IconVideo } from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';
import { Fragment, useRef, useState } from 'react';
import QuizItem from '../../../components/QuizItem';
import { useLocalStorage } from '@mantine/hooks';

function BaseDemo() {
  const [value, setValue] = useState('');
  const openRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useLocalStorage({
    key: 'user-data',
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });

  const submitFile = async () => {
    setIsLoading(true);
    const body = new FormData();
    body.append('file', file[0]);

    const data = await fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      headers: {},
      body: body,
    });

    const res = await data.json();

    console.log(res);

    setUser({
      drafts: [
        { ...res, lastEdited: new Date() },
        ...(user ? user.drafts : []),
      ],
    });

    console.log(data);
    setIsLoading(false);
    setFile(null);
  };

  return (
    <div className="px-8 py-4 w-full">
      <Title order={2} mb={12}>
        Create Quiz
      </Title>

      <Dropzone
        loading={isLoading}
        openRef={openRef}
        onDrop={(files) => {
          setFile([...files]);
          console.log('accepted files', files);
        }}
        multiple={false}
        accept={['video/mp4', 'video/*']}
        activateOnClick={!file}
      >
        <Group
          justify="center"
          gap="xl"
          mih={120}
          style={{ pointerEvents: 'none' }}
        >
          {!(file?.length > 0) && (
            <>
              <IconFileUpload
                style={{
                  width: rem(42),
                  height: rem(42),
                  color: 'var(--mantine-color-dimmed)',
                }}
                stroke={1.5}
              />
            </>
          )}

          {!(file?.length > 0) && (
            <div>
              <Text size="xl" inline>
                Drag videos or pdfs here or click to select files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Attach as many files as you like
              </Text>
            </div>
          )}
          {file && file?.length > 0 && (
            <>
              {file?.map((f) => (
                <Group>
                  <IconVideo
                    style={{
                      width: rem(20),
                      height: rem(20),
                      color: 'var(--mantine-color-dimmed)',
                    }}
                    stroke={1.5}
                  />
                  {file[0]?.name}
                </Group>
              ))}
              <Button style={{ pointerEvents: 'all' }} onClick={submitFile}>
                Sumbit
              </Button>
            </>
          )}
        </Group>
      </Dropzone>

      <Flex direction="row" justify="space-between" mt={36} mb={12}>
        <Title order={2}>Quizzes</Title>

        <Input
          placeholder="Search for quizzes"
          rightSection={<IconSearch size={16} />}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
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
          {user?.drafts?.map((draft) => (
            <Fragment key={draft.id}>
              <QuizItem
                id={draft.id}
                title={draft.file_name}
                lastEdited={draft.lastEdited}
                questions={10}
                minutes={10}
              />
            </Fragment>
          ))}
        </Flex>
      </Box>
    </div>
  );
}

export default BaseDemo;
