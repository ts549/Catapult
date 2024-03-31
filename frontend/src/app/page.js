'use client';
import { Container, Text, Button, Group } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import './HeroTitle.css';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
// Efficient, automated, adaptable
//

export default function HeroTitle() {
  return (
    <div className="bg-[#1F1F1F] h-screen w-screen items-center justify-center">
      <Container size={700} className={'inner'}>
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
          <Link href="/home">
            <Button
              size="xl"
              className={'control'}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
            >
              Get started
            </Button>
          </Link>
        </Group>
      </Container>
    </div>
  );
}
