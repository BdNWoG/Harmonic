"use client"

import { X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
    onChange: (url?: String) => void;
    value: String;
    endpoint: "messageFile" | "serverImage"; 
}

export const FileUpload = ({
    onChange, value, endpoint
}: FileUploadProps) => {
    return (
        <UploadDropzone endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {console.log(error)}}
        />
    )
}