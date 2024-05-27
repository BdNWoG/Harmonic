"use client"

import { FileIcon, X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";

interface FileUploadProps {
    onChange: (url?: String) => void;
    value: String;
    endpoint: "messageFile" | "serverImage"; 
}

export const FileUpload = ({
    onChange, value, endpoint
}: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    if (value && fileType != "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image fill src={value} alt="Upload" className="rounded-full" /> 
                <button onClick={() => onChange("")} type="button"
                className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm">
                    <X className="h-4 w-4"/>
                </button>
            </div>
        )
    }

    if (value && fileType == "pdf") {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400"/>
                <a href={value} target="_blank" rel="noopener noreferrer" 
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline">
                    {value}
                </a>
                <button onClick={() => onChange("")} type="button"
                className="absolute -right-2 -top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm">
                    <X className="h-4 w-4"/>
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {console.log(error)}}
        />
    )
}