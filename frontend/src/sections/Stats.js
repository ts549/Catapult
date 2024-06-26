import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import purdue from '../img/purdue_logo.png';
import stats_logo_1 from'../img/stats_logo_1.png';
import stats_logo_2 from'../img/stats_logo_2.png';
import stats_logo_3 from'../img/stats_logo_3.png';
import stats_logo_4 from'../img/stats_logo_4.png';
import stats_logo_5 from'../img/stats_logo_5.png';
import book from '../img/book.webp'
import { User } from 'tabler-icons-react';


function Stats() {
    gsap.registerPlugin(ScrollTrigger);
    const leftSlideRef = useRef(null);
    const rightSlideRef = useRef(null);
    const fadeRef = useRef(null);

    useEffect(() => {
        var Elem = leftSlideRef.current;
        gsap.fromTo(Elem, {translateX: -500}, {translateX: 0, duration: 1, scrollTrigger: {
            trigger: Elem,
            start: "top-=330 top",
            toggleActions: "play none reverse none",
            end: "bottom-=500 bottom"
        }});
    }, []);

    useEffect(() => {
        var Elem = rightSlideRef.current;
        gsap.fromTo(Elem, {translateX: 1000}, {translateX: 0, duration: 1, scrollTrigger: {
            trigger: Elem,
            start: "top-=370 top",
            toggleActions: "play none reverse none",
            end: "bottom-=200 bottom"
        }});
    }, []);

    useEffect(() => {
        var Elem = fadeRef.current;
        gsap.fromTo(Elem, {opacity: 0}, {opacity: 1, duration: 1, scrollTrigger: {
            trigger: Elem,
            start: "top-=500 top",
            toggleActions: "play none reverse none",
            end: "bottom-=200 bottom"
        }});
    }, []);

  return (
    <div className='w-screen h-screen bg-[#18181c] flex flex-col overflow-hidden gap-10'>
        <div className="w-full h-[25%] mt-[5%] text-white flex flex-col justify-center items-center ml-8 gap-10">
            <div className="mr-[40%] font-medium text-xl overflow-hidden">
                <div ref={leftSlideRef}>Join thousands of educators worldwide.</div>
            </div>
            <div className='overflow-hidden'>
                <div ref={rightSlideRef} className="flex flex-row gap-6 ml-8">
                    <Image src={stats_logo_1} className="w-[120px] h-[100px]" />
                    <Image src={stats_logo_2} className="w-[120px] h-[100px]" />
                    <Image src={stats_logo_3} className="w-[120px] h-[100px]" />
                    <Image src={stats_logo_4} className="w-[120px] h-[100px]" />
                    <Image src={stats_logo_5} className="w-[120px] h-[100px]" />
                    <Image src={book} className="w-[120px] h-[100px]" />
                </div>
            </div>
        </div>
        <div ref={fadeRef} className="w-full h-[65%] mb-[5%] text-white flex flex-row justify-center items-center">
            <div className="w-[40%] h-[80%] p-5 flex flex-col justify-center items-center gap-10">
                <div className="text-5xl text-[#d9dada]">Current Users: </div>
                <div className='flex flex-row justify-center items-center gap-5'>
                    <User
                        size={48}
                        strokeWidth={2}
                        color={'#FFFFFF'}
                    />
                    <div className="text-5xl text-[#d9dada]">1,800</div>
                </div>
            </div>
            <div className="w-[1px] h-[80%] bg-[#808282]" />
            <div className="w-[40%] h-[80%] p-10 flex flex-col justify-center items-center gap-8">
                <div className="text-5xl text-[#d9dada]">95%</div>
                <div className="text-xl text-[#d9dada]">Of users were satisfied with the results!</div>
            </div>
        </div>
    </div>
  );
}

export default Stats;
