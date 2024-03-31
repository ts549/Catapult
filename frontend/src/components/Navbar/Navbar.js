import './Navbar.css';
import { NavLink } from '@mantine/core';
import { IconHome2, IconGauge, IconSettings } from '@tabler/icons-react';
import Link from 'next/link';

function Navbar() {
  return (
    <div className="w-[20%] h-[100%] bg-[#ababab] flex flex-col items-center">
      <div
        id="logo"
        className="w-[80%] h-[10%] mt-[30px] flex flex-row gap-3 items-center"
      >
        <div className="w-[60px] h-[40px] bg-white" />
        <div className="w-[200px] h-[30px] p-1 bg-white">logo in text form</div>
      </div>

      <Link href="/home" className="w-full">
        <NavLink
          label="Home"
          pl={40}
          leftSection={<IconHome2 size="1.25rem" stroke={1.5} />}
        />
      </Link>
      <NavLink
        label="Profile"
        pl={40}
        leftSection={<IconGauge size="1.25rem" stroke={1.5} />}
      />
      <NavLink
        label="Settings"
        pl={40}
        leftSection={<IconSettings size="1.25rem" stroke={1.5} />}
      />
    </div>
  );
}

export default Navbar;
