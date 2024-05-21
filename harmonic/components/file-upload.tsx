"use client"

import { X } from "lucide-react";
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
                <Image src={value} alt="Upload" className="rounded-full" fill /> 
                <button onClick={() => onChange("")} type="button"
                className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm">
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