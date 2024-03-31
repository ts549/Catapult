'use client';
import { Container, Text, Button, Group } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import './HeroTitle.css';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import Stats from '../sections/Stats';
import Prices from '../sections/Prices';
import { Title } from '@mantine/core';
import Image from 'next/image';

export default function HeroTitle() {
  return (
    <div>
      <div className="bg-[#111112] h-screen w-screen items-center justify-center overflow-hidden">
        <div className="absolute flex flex-row gap-x-2 justify-center items-center ml-2 mt-2">
          <Image src="/logo.png" alt="logo" width={48} height={48} />
          <Title className="text-white" order={3}>
            acumentor
          </Title>
        </div>
        <Container size={700} className={'inner w-[80%] h-[80%]'}>
          <h1 className={'title'}>
            Streamline quizzes in an{' '}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: '#a2fdd2', to: 'cyan' }}
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
            Build fully functional accessible web applications with ease –
            Mantine includes more than 100 customizable components and hooks to
            cover you in any situation
          </Text>
          <Group className={'controls'}>
            <Link href="/home">
              <Button
                size="xl"
                className={'control'}
                variant="gradient"
                gradient={{ from: '#a2fdd2', to: 'cyan' }}
              >
                Get started
              </Button>
            </Link>
          </Group>
        </Container>
      </div>
      <Stats />
      <Prices />
    </div>
  );
}
