'use client';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

import Navbar from '../../components/Navbar/Navbar';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const path = usePathname();

  return (
    <div className="w-screen h-screen flex justify-center align-center">
      <div className="w-full h-[100%] flex flex-row">
        <Navbar />
        <div className="w-full h-[100%] bg-white overflow-y-auto">
          {path === '/home' && (
            <div className="w-[100%] h-[27%] flex justify-center items-center">
              <div className="flex w-[95%] h-[80%] bg-[#1F1F1F] rounded-l items-center justify-center">
                <span className="text-center text-white text-2xl font-bold">
                  Welcome back
                </span>
              </div>
            </div>
          )}
          <div className="w-[100%] h-[73%]">{children}</div>
        </div>
      </div>
    </div>
  );
}
