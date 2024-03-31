'use client';
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Input,
  LoadingOverlay,
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
  // const [value, setValue] = useState('');
  const openRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useLocalStorage({
    key: 'user-data',
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });
  // const [showDetails, setShowDetails] = useState(false);
  const [quizName, setQuizName] = useState('');
  const [numMC, setNumMC] = useState('');
  const [numTF, setNumTF] = useState('');
  const [numSA, setNumSA] = useState('');
  const [numVA, setNumVA] = useState('');

  const submitFile = async () => {
    setIsLoading(true);
    const body = new FormData();
    body.append('file', file[0]);
    body.append('multiple_choice', numMC);
    body.append('true_false', numTF);
    body.append('short_answer', numSA);
    body.append('variations', 2);

    const data = await fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      headers: {},
      body: body,
    });

    const res = await data.json();

    setUser({
      drafts: [
        {
          id: res?.id,
          title: quizName,
          variations: res?.questions.map((v) => JSON.parse(v)),
          num_questions: parseInt(numMC) + parseInt(numTF) + parseInt(numSA),
          time_prediction:
            (parseInt(numMC) + parseInt(numTF) + parseInt(numSA)) * 1.5,
          lastEdited: new Date(),
        },
        ...(user ? user.drafts : []),
      ],
    });

    setFile(null);
    setQuizName('');
    setNumMC('');
    setNumTF('');
    setNumSA('');
    setIsLoading(false);
  };

  return (
    <div className="px-8 py-4 w-full">
      <Title order={2} mb={12}>
        Create Quiz
      </Title>
      <div className="">
        <LoadingOverlay visible={isLoading} />
        <Dropzone
          // loading={isLoading}
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
                {/* <Button
                style={{ pointerEvents: 'all' }}
                onClick={() => {
                  setShowDetails(true);
                }}
              >
                Submit
              </Button> */}
              </>
            )}
          </Group>
        </Dropzone>
        {file && file?.length > 0 ? (
          <div className="w-full h-auto mt-10 mb-10 flex flex-col justify-center items-center gap-1">
            {/* <div className="w-[90%] h-[50px] flex flex-row items-center gap-3">
              <Folder size={48} strokeWidth={0.5} color={'black'} />
              <div>Select folder...</div>
            </div> */}
            <div className="w-full h-auto">
              <TextInput
                label="Quiz Name"
                placeholder="Name"
                classNames={classes}
                onChange={(event) => {
                  setQuizName(event.target.value);
                }}
              />
            </div>
            <div className="w-full h-[90px] flex flex-row items-center gap-5">
              <Select
                comboboxProps={{ withinPortal: true }}
                data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                placeholder="Pick one"
                label="Multiple Choice"
                classNames={classes}
                onChange={(value) => {
                  setNumMC(value);
                }}
              />
              <Select
                comboboxProps={{ withinPortal: true }}
                data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                placeholder="Pick one"
                label="True/False"
                classNames={classes}
                onChange={(value) => {
                  setNumTF(value);
                }}
              />
              <Select
                comboboxProps={{ withinPortal: true }}
                data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                placeholder="Pick one"
                label="Short answer"
                classNames={classes}
                onChange={(value) => {
                  setNumSA(value);
                }}
              />
              <Select
                comboboxProps={{ withinPortal: true }}
                data={['0', '1', '2', '3', '4']}
                placeholder="Pick one"
                label="Variations"
                classNames={classes}
                onChange={(value) => {
                  setNumVA(value);
                }}
              />
              {/* <div className="w-[230px] h-[50px] bg-[#adadad] right-0 m-auto gap-2 rounded-full items-center justify-center flex ml-5">
                <ClockHour4 size={32} strokeWidth={1} color={'black'} />~
                {numMC &&
                  numTF &&
                  numSA &&
                  (parseInt(numMC) + parseInt(numTF) + parseInt(numSA)) *
                    1.5}{' '}
                mins
              </div> */}
            </div>
            <Button mt={16} fullWidth onClick={submitFile}>
              Generate Questions
            </Button>
          </div>
        ) : (
          <div />
        )}

        <Flex direction="row" justify="space-between" mt={36} mb={12}>
          <Title order={2}>Quizzes</Title>

          {/* <Input
            placeholder="Search for quizzes"
            rightSection={<IconSearch size={16} />}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          /> */}
        </Flex>
      </div>

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
              <QuizItem item={draft} />
            </Fragment>
          ))}
        </Flex>
      </Box>
    </div>
  );
}

export default BaseDemo;