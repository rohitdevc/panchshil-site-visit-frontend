type PageProps = {
    error_message?: string;
}

export default function ErrorSpan({error_message}: PageProps) {
    return (
        <div className="error">
            <span className={`text-xs transition-all duration-200 ${error_message ? "opacity-100" : "opacity-0"}`}>{error_message}</span>
        </div>
    )
}