import { IoIosArrowDown } from "react-icons/io";

export default function SelectTagArrow() {
    return (
        <div className="pointer-events-none absolute bottom-2 right-2 flex items-center">
            <IoIosArrowDown size={20} />
        </div>
    )
}