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
        <div className="p-6 max-w-xl mx-auto space-y-4">

            {/* FILE PATH */}
            <input
                type="text"
                placeholder="Fájl elérési út (pl. C:\\video.mp4)"
                value={form.filePath}
                onChange={(e) =>
                    setForm({ ...form, filePath: e.target.value })
                }
                className="w-full p-2 rounded bg-gray-800 text-white"
            />

            {/* FILE NAME */}
            <input
                type="text"
                placeholder="Mentési név"
                value={form.fileName}
                onChange={(e) =>
                    setForm({ ...form, fileName: e.target.value })
                }
                className="w-full p-2 rounded bg-gray-800 text-white"
            />

            {/* TYPE */}
            <select
                value={form.type}
                onChange={(e) =>
                    setForm({ ...form, type: e.target.value as "movie" })
                }
                className="w-full p-2 rounded bg-gray-800 text-white"
            >
                <option value="movie">Film</option>
            </select>

            <input
                type="password"
                placeholder="SFTP jelszó"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white"
            />


            <button
                onClick={handleUpload}
                className="bg-blue-500 px-4 py-2 rounded text-white"
            >
                Upload
            </button>

            {/* DEBUG */}
            <pre className="text-xs p-2 rounded">
                {JSON.stringify(form, null, 2)}
            </pre>
        </div>
    );
}