import Link from 'next/link';
import './Navbar.css';

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
      <div className="w-[80%] h-[50%] ml-5 mt-[50px] flex flex-col gap-3">
        <div className="flex flex-row gap-5">
          <div className="w-[30px] h-[30px] bg-[#d9d9d9]" />
          <Link href="">Home</Link>
        </div>
        <div className="flex flex-row gap-5">
          <div className="w-[30px] h-[30px] bg-[#d9d9d9]" />
          <Link href="">Profile</Link>
        </div>
        <div className="flex flex-row gap-5">
          <div className="w-[30px] h-[30px] bg-[#d9d9d9]" />
          <Link href="">System</Link>
        </div>
        <div className="flex flex-row gap-5">
          <div className="w-[30px] h-[30px] bg-[#d9d9d9]" />
          <Link href="">Log Out</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
