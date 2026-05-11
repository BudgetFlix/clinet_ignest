import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";





export default function UploadForm() {
    const [form, setForm] = useState({
        filePath: "",
        fileName: "",
        type: "movie",
    });

    const [password, setPassword] = useState("");

    async function handleUpload() {
        try {
            await invoke("upload_sftp_job", {
                filePath: form.filePath,
                name: form.fileName,
                videoType: form.type, // ✅ helyes
                password: password,
            });

            console.log("Upload kész ✅");
        } catch (err) {
            console.error("Upload hiba ❌", err);
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-full"> 

            <div className=" p-6 max-w-xl mx-auto space-y-4">

                <form className="grid-cols-1 gap-3" >
                    <label className="text-3xl mb-3"> Videó  eleresi utja </label>
                   <input className="h-9 w-xl border-white rounded-md bg-foreground/10 text-base" placeholder="pl.: C:" />

                </form>

                

                {/* FILE PATH */}

                {/* FILE NAME */}


                {/* TYPE */}







                {/* DEBUG */}
                <pre className="text-xs p-2">
                    {JSON.stringify(form, null, 2)}
                </pre>
            </div>
        </div>
    );
}