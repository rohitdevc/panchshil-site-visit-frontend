import LineBreak from "./LineBreak"

type PageProps = {
    section_heading: string;
    section_value: string;
}

export default function PreviewBlock({section_heading, section_value}: PageProps) {
    return (
        section_heading && section_value && (
        <div className="flex flex-col gap-5">
            <div className="w-full flex flex-col lg:flex-row gap-2">
                <h3 className="uppercase text-[#b29a75] tracking-[0.2em] w-full lg:w-1/2">{section_heading}</h3>
                <p className="text-white w-full lg:w-1/2">{section_value}</p>
            </div>
            <LineBreak />
        </div>
        )
    )
}