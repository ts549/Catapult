'use client';
import {
  Box,
  Button,
  Flex,
  Group,
  Input,
  LoadingOverlay,
  Modal,
  Text,
  Title,
  rem,
} from '@mantine/core';
import { IconCirclePlus, IconFileUpload, IconVideo } from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';
import { Fragment, useRef, useState } from 'react';
import QuizItem from '../../../components/QuizItem';
import { useLocalStorage } from '@mantine/hooks';
import { Select, TextInput } from '@mantine/core';
import classes from './ContainedInput.module.css';
import { useDisclosure } from '@mantine/hooks';

function BaseDemo() {
  const [opened, { open, close }] = useDisclosure(false);

  const openRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useLocalStorage({
    key: 'user-data',
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });
  const [quizName, setQuizName] = useState('');
  const [numMC, setNumMC] = useState('');
  const [numTF, setNumTF] = useState('');
  const [numSA, setNumSA] = useState('');
  const [numVA, setNumVA] = useState('');

  const [folderName, setFolderName] = useState('');

  const submitFile = async () => {
    setIsLoading(true);
    const body = new FormData();
    body.append('type', 'video');
    body.append('file', file[0]);
    body.append('multiple_choice', numMC);
    body.append('true_false', numTF);
    body.append('short_answer', numSA);
    body.append('variations', numVA);

    const data = await fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      headers: {},
      body: body,
    });

    const res = await data.json();

    setUser({
      ...user,
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

  const createFolder = () => {
    if (!folderName) return;

    const data = { ...user };
    data[folderName] = [];
    setUser(data);
    setFolderName('');
    close();
  };

  return (
    <>
      <div className="px-8 py-4 w-full">
        <Title order={2} mb={12}>
          Create Quiz
        </Title>
        <div className="relative">
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
                </>
              )}
            </Group>
          </Dropzone>
          {file && file?.length > 0 && (
            <div className="w-full h-auto mt-10 mb-10 flex flex-col justify-center items-center gap-1">
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
                  data={[
                    '0',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                  ]}
                  placeholder="Pick one"
                  label="Multiple Choice"
                  classNames={[classes, 'w-full']}
                  onChange={(value) => {
                    setNumMC(value);
                  }}
                />
                <Select
                  comboboxProps={{ withinPortal: true }}
                  data={[
                    '0',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                  ]}
                  placeholder="Pick one"
                  label="True/False"
                  classNames={[classes, 'w-full']}
                  onChange={(value) => {
                    setNumTF(value);
                  }}
                />
                <Select
                  comboboxProps={{ withinPortal: true }}
                  data={[
                    '0',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                  ]}
                  placeholder="Pick one"
                  label="Short answer"
                  classNames={[classes, 'w-full']}
                  onChange={(value) => {
                    setNumSA(value);
                  }}
                />
                <Select
                  comboboxProps={{ withinPortal: true }}
                  data={['0', '1', '2', '3', '4']}
                  placeholder="Pick one"
                  label="Variations"
                  classNames={[classes, 'w-full']}
                  onChange={(value) => {
                    setNumVA(value);
                  }}
                />
              </div>
              <Button mt={16} fullWidth onClick={submitFile}>
                Generate Questions
              </Button>
            </div>
          )}
        </div>

        <Flex direction="column" mt={36} mb={12} gap="sm">
          <Title order={2}>Quizzes</Title>
          <Button
            className="max-w-[120px]"
            leftSection={<IconCirclePlus size={14} />}
            variant="default"
            size="compact-xs"
            onClick={open}
          >
            Add folder
          </Button>
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
                  item={draft}
                  lightColor={'#FEEAEA'}
                  darkColor={'#FF0000'}
                />
              </Fragment>
            ))}
          </Flex>
        </Box>

        {user &&
          Object.keys(user)
            ?.filter((f) => f !== 'drafts')
            ?.sort((a, b) => a.localeCompare(b))
            ?.map((folder) => (
              <Box
                my="xl"
                w="100%"
                p="lg"
                href="/"
                bg="#D3EFFC"
                style={{
                  borderLeft: 4,
                  borderColor: '#0B99FF',
                  borderStyle: 'solid',
                }}
              >
                <Title order={3}>{folder}</Title>
                <Flex mt={12} direction="row" gap="lg" wrap={'wrap'}>
                  {user[folder]?.map((draft) => (
                    <Fragment key={draft.id}>
                      <QuizItem
                        item={draft}
                        lightColor={'#D3EFFC'}
                        darkColor={'#0B99FF'}
                      />
                    </Fragment>
                  ))}
                </Flex>
              </Box>
            ))}
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title="Choose a folder name"
        centered
      >
        <Input
          placeholder="Folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.currentTarget.value)}
        />
        <Button mt={12} fullWidth onClick={createFolder}>
          Create
        </Button>
      </Modal>
    </>
  );
}

export default BaseDemo;
