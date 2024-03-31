function Prices() {
    return (
        <div className='w-screen h-screen bg-[#111112] flex flex-col justify-center items-center overflow-hidden gap-10'>
            <div className="h-[80%] w-[95%] flex flex-col justify-center items-center gap-8">
                <div className="h-[20%] w-full flex flex-col justify-center items-center gap-6">
                    <div className="w-auto h-auto text-white text-3xl font-medium">
                        Choose a plan that works for you
                    </div>
                    <div className="w-auto h-auto text-md text-[#d9dada]">
                        Get an individual plan with features that you need, or create a team instead!
                    </div>
                </div>
                <div className="h-[80%] w-full flex flex-row justify-center items-center gap-10">
                    <div className="w-[23%] h-[85%] bg-[#d9dada] rounded-lg" />
                    <div className="w-[23%] h-[85%] bg-[#d9dada] rounded-lg" />
                    <div className="w-[23%] h-[85%] bg-[#d9dada] rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export default Prices;