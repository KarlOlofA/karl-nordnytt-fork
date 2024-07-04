import Link from "next/link";

export function Spinner(){
    return (
        <div
            className="h-2 w-8 inline-block rounded-full border-4 border-r-black border-solid animate-spin"
            role={"status"}>
        </div>
    )
}
