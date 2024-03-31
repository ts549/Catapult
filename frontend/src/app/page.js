'use client';
import { Container, Text, Button, Group } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import './HeroTitle.css';
import { TypeAnimation } from 'react-type-animation';
import Stats from '../sections/Stats';
import Prices from '../sections/Prices';

export default function HeroTitle() {
  return (
    <div>
      <div className="bg-[#111112] h-screen w-screen items-center justify-center overflow-hidden">
        <Container size={700} className={'inner w-[80%] h-[80%]'}>
          <h1 className={'title'}>
            Streamline quizzes in an{' '}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              inherit
            >
              <TypeAnimation
                preRenderFirstString={true}
                sequence={[
                  'efficient',
                  2000,
                  'automated',
                  2000,
                  'adaptable',
                  2000,
                ]}
                speed={20}
                cursor={false}
                repeat={Infinity}
              />
            </Text>{' '}
            way
          </h1>

          <Text className={'description'} color="dimmed">
            Build fully functional accessible web applications with ease – Mantine
            includes more than 100 customizable components and hooks to cover you
            in any situation
          </Text>

          <Group className={'controls'}>
            <Button
              size="xl"
              className={'control'}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
            >
              Get started
            </Button>

            <Button
              component="a"
              href="https://github.com/mantinedev/mantine"
              size="xl"
              variant="default"
              className={'control'}
              leftSection={<GithubIcon size={20} />}
            >
              GitHub
            </Button>
          </Group>
        </Container>
      </div>
      <Stats />
      <Prices />
    </div>
  );
}
