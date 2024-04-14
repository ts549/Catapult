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
              <div className="text-center flex flex-col w-[95%] h-[80%] bg-[#E0F1D9] rounded-l items-center justify-center px-8">
                <span className="text-black text-3xl font-bold">
                  Welcome back!
                </span>
                <span className="text-lg">What will you create today?</span>
              </div>
            </div>
          )}
          <div className="w-[100%] h-[73%]">{children}</div>
        </div>
      </div>
    </div>
  );
}
