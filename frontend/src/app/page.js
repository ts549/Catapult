import { Container, Text, Button, Group } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import './HeroTitle.css';

export default function HeroTitle() {
  return (
    <div className="bg-[#1F1F1F] h-screen w-screen items-center justify-center">
      <Container size={700} className={'inner'}>
        <h1 className={'title'}>
          A{' '}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            inherit
          >
            fully featured
          </Text>{' '}
          React components and hooks library
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
  );
}
