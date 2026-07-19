import { GoArrowRight, GoArrowLeft } from "react-icons/go";

type BottomNavProps = {
    step: number;
    updateCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function BottomNav({step, updateCurrentStep}: BottomNavProps) {
    return (
        <div className="flex gap-5 justify-between mt-10">
            <button type="button" className={`group flex justify-center items-center gap-5 text-[15px] text-white transition-colors sm:text-[17px] uppercase cursor-pointer ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`} onClick={() => updateCurrentStep(step)}>
                <GoArrowLeft size={20} /> Back
            </button>
            <button type="submit" className="group inline-flex h-[52px] items-center gap-5 border border-[#9a7951] px-5 text-[15px] text-white transition-colors hover:bg-white/10 sm:h-[58px] sm:px-6 sm:text-[17px] uppercase cursor-pointer">Continue <GoArrowRight size={20} /></button>
        </div>
    )
}