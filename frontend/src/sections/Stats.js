function Stats() {
  return (
    <div className='w-screen h-screen bg-[#18181c] flex flex-col overflow-hidden gap-10'>
        <div className="w-full h-[25%] mt-[5%] text-white flex flex-col justify-center items-center ml-8 gap-5">
            <div className="mr-[40%]">Join more than 100 thousand educators worldwide.</div>
            <div className="flex flex-row gap-10 ml-8">
                <div className="bg-white w-[100px] h-[100px]" />
                <div className="bg-white w-[100px] h-[100px]" />
                <div className="bg-white w-[100px] h-[100px]" />
                <div className="bg-white w-[100px] h-[100px]" />
                <div className="bg-white w-[100px] h-[100px]" />
                <div className="bg-white w-[100px] h-[100px]" />
            </div>
        </div>
        <div className="w-full h-[65%] mb-[5%] text-white flex flex-row justify-center items-center">
            <div className="w-[40%] h-[80%] p-5 flex flex-col justify-center items-center gap-10">
                <div className="text-5xl text-[#d9dada]">18,000</div>
                <div className="text-[#d9dada]">Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text</div>
            </div>
            <div className="w-[1px] h-[80%] bg-[#808282]" />
            <div className="w-[40%] h-[80%] p-10 flex flex-col justify-center items-center gap-10">
                <div className="text-5xl text-[#d9dada]">87%</div>
                <div className="text-[#d9dada]">Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text</div>
            </div>
        </div>
    </div>
  );
}

export default Stats;
