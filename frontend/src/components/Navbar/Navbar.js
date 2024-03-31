import './Navbar.css';
import { Group, NavLink, Title } from '@mantine/core';
import { IconHome2, IconGauge, IconSettings } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
  return (
    <div className="text-white w-[25%] h-[100%] bg-[#1f1f1f] flex flex-col px-4 py-8">
      <Group className="mx-auto" gap="sm" mb={60}>
        <Image src="/logo.png" alt="logo" width={36} height={36} />
        <Title className="" order={3}>
          Acumentor
        </Title>
      </Group>

      <Link href="/home" className="w-full">
        <NavLink
          label="Home"
          leftSection={<IconHome2 size="1.25rem" stroke={1.5} />}
        />
      </Link>
      <NavLink
        label="Profile"
        leftSection={<IconGauge size="1.25rem" stroke={1.5} />}
      />
      <NavLink
        label="Settings"
        leftSection={<IconSettings size="1.25rem" stroke={1.5} />}
      />
    </div>
  );
}

export default Navbar;
