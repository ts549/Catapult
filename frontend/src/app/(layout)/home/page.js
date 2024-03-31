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
import { Fragment, useEffect, useRef, useState } from 'react';
import QuizItem from '../../../components/QuizItem';
import { useLocalStorage } from '@mantine/hooks';
import { Folder } from 'tabler-icons-react';
import { Select, TextInput } from '@mantine/core';
import classes from './ContainedInput.module.css';
import { ClockHour4 } from 'tabler-icons-react';

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
  const [showDetails, setShowDetails] = useState(false);

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

    // console.log(data);
    setIsLoading(false);
    setFile(null);
  };

  useEffect(() => {
    if (file?.length > 0) {
      setShowDetails(true);
    }
  }, [file]);

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
              <Button
                style={{ pointerEvents: 'all' }}
                onClick={() => {
                  setShowDetails(true);
                }}
              >
                Submit
              </Button>
            </>
          )}
        </Group>
      </Dropzone>
      {showDetails ? (
        <>
          <div className="w-full h-auto mt-10 flex flex-col justify-center items-center gap-1">
            <div className="w-[90%] h-[50px] flex flex-row items-center gap-3">
              <Folder size={48} strokeWidth={0.5} color={'black'} />
              <div>Select folder...</div>
            </div>
            <div className="w-[90%] h-auto">
              <TextInput
                label="Quiz Name"
                placeholder="Name"
                classNames={classes}
              />
            </div>
            <div className="w-[90%] h-[90px] flex flex-row items-center gap-5">
              <Select
                comboboxProps={{ withinPortal: true }}
                data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                placeholder="Pick one"
                label="Multiple Choice"
                classNames={classes}
              />
              <Select
                comboboxProps={{ withinPortal: true }}
                data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                placeholder="Pick one"
                label="True/False"
                classNames={classes}
              />
              <Select
                comboboxProps={{ withinPortal: true }}
                data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                placeholder="Pick one"
                label="Short answer"
                classNames={classes}
              />
              <div className="w-[230px] h-[50px] bg-[#adadad] right-0 m-auto gap-2 rounded-full items-center justify-center flex ml-5">
                <ClockHour4 size={32} strokeWidth={1} color={'black'} />
                ~15 mins
              </div>
            </div>
            <div className="w-[90%] h-[50px] mt-1">
              <button
                onClick={submitFile}
                className="w-full h-full bg-[#4e4e4e] text-white rounded-md"
              >
                Generate Questions
              </button>
            </div>
          </div>
          <TextInput
            label="Shipping address"
            placeholder="15329 Huston 21st"
            classNames={classes}
          />
          <div></div>
          <div></div>
          <div></div>
        </>
      ) : (
        <div />
      )}

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
