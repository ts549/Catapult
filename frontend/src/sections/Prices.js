function Prices() {
  return (
    <div className="w-screen h-screen bg-[#111112] flex flex-col justify-center items-center overflow-hidden gap-10">
      <div className="h-[80%] w-[95%] flex flex-col justify-center items-center gap-8">
        <div className="h-[20%] w-full flex flex-col justify-center items-center gap-6">
          <div className="w-auto h-auto text-white text-3xl font-medium">
            Choose a plan that works for you
          </div>
          <div className="w-auto h-auto text-md text-[#d9dada]">
            Get an individual plan with features that you need, or create a team
            instead!
          </div>
        </div>
        <div className="h-[80%] w-full flex flex-row justify-center items-center gap-12 overflow-hidden">
          <div className="w-[23%] h-[85%] bg-[#d9dada] rounded-lg overflow-hidden">
            <div className="relative w-full h-[30%]">
              <div className="absolute w-full h-[1000%] bg-[#00be74] text-white flex justify-center pt-5 font-medium">
                Individual
              </div>
            </div>
            <div className="relative w-full h-[70%]">
              <div className="absolute ml-[-50%] mt-[-10%] w-[200%] h-[300%] bg-white rounded-full" />
            </div>
          </div>
          <div className="w-[23%] h-[85%] bg-[#d9dada] rounded-lg overflow-hidden">
            <div className="relative w-full h-[30%]">
              <div className="absolute w-full h-[1000%] bg-[#00467c] text-white flex justify-center pt-5 font-medium">
                Medium Institution
              </div>
            </div>
            <div className="relative w-full h-[70%]">
              <div className="absolute ml-[-50%] mt-[-10%] w-[200%] h-[300%] bg-white rounded-full flex flex-col items-center pt-6">
                <div className="font-bold text-3xl">$6.99</div>
                <div>/ month</div>
                <div className="font-medium p-1">OR</div>
                <div className="font-bold text-3xl">$30</div>
                <div>/ year</div>
                <button className=""></button>
              </div>
            </div>
          </div>
          <div className="w-[23%] h-[85%] bg-[#d9dada] rounded-lg overflow-hidden">
            <div className="relative w-full h-[30%]">
              <div className="absolute w-full h-[1000%] bg-[#562459] text-white flex justify-center pt-5 font-medium">
                Large Institution
              </div>
            </div>
            <div className="relative w-full h-[70%]">
              <div className="absolute ml-[-50%] mt-[-10%] w-[200%] h-[300%] bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prices;
