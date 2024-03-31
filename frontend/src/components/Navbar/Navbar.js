'use client';
import './Navbar.css';
import { Flex, Group, NavLink, Title } from '@mantine/core';
import { IconHome2, IconGauge, IconSettings } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

function Navbar() {
  const path = usePathname();

  return (
    <div className="text-white min-w-[275px] w-[20%] h-[100%] bg-[#1f1f1f] flex flex-col px-4 py-8">
      <div className="flex flex-row items-end gap-x-2 mb-8">
        <Image src="/logo.png" alt="logo" width={48} height={48} />
        <Title className="" order={3}>
          acumentor
        </Title>
      </div>

      <Link href="/home" className="w-full">
        <NavLink
          active={path === '/home'}
          label="Home"
          leftSection={<IconHome2 size="1.25rem" stroke={1.5} autoContrast />}
        />
      </Link>
      <NavLink
        label="Profile"
        leftSection={<IconGauge size="1.25rem" stroke={1.5} />}
        styles={{ '&:hover': { backgroundColor: 'red' } }}
      />
      <NavLink
        label="Settings"
        leftSection={<IconSettings size="1.25rem" stroke={1.5} />}
      />
    </div>
  );
}

export default Navbar;
