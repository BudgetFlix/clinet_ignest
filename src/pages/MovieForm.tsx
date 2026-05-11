import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";





export default function UploadForm() {
    const [form, setForm] = useState({
        filePath: "",
        fileName: "",
        type: "MOVIE",
    });

    const [password, setPassword] = useState("");

    async function handleUpload() {
        try {
            await invoke("upload_sftp_job", {
                filePath: form.filePath,
                name: form.fileName,
                videoType: form.type,
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

                <fieldset className="fieldset w-120 p-4 space-y-2">
                    <legend className="fieldset-legend text-3xl">Video feltoltes</legend>

                    {/* FILE PATH */}
                    <label className="label text-xl">Kivant video kivalasztasa </label>
                    <input type="text" className="input input-lg w-full" placeholder="pl.: C://"
                        value={form.filePath}
                        onChange={(e) =>
                            setForm({ ...form, filePath: e.target.value })}

                    />

                    {/* FILE NAME */}
                    <label className="label text-xl">Mentési név</label>
                    <input type="text" className="input input-lg w-full" placeholder="test_1"
                        value={form.fileName}
                        onChange={(e) =>
                            setForm({ ...form, fileName: e.target.value })}
                    />

                    {/* TYPE */}
                    <label className="label text-xl">Típus</label>
                    <select name="type" id="type" className="select select-lg w-full "
                        value={form.type}
                        onChange={(e) =>
                            setForm({ ...form, type: e.target.value })}

                    >
                        <option value="MOVIE">Film</option>
                    </select>

                    {/* PASSWORD */}
                    <label className="label text-xl">Jelszó</label>
                    <input type="text" placeholder="ne adjak otletet" className="input input-lg w-full"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)}

                    />

                    <button className="btn btn-xl mt-5"
                        onClick={handleUpload}
                    > Feltoltes </button>
                </fieldset>

                {/* DEBUG */}
                <div className="mockup-code ">
                    <pre className="text-xs p-2">
                        {JSON.stringify(form, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
}