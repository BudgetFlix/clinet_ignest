use ssh2::Session;
use std::net::TcpStream;
use std::path::Path;
use std::fs;
use uuid::Uuid;
use serde_json::json;
use tauri::command;

#[command]
pub fn upload_sftp_job(file_path: String, name: String, video_type: String, password: String) -> Result<(), String> {
    
    let job_id = Uuid::new_v4().to_string();
    let folder_name = format!("job_{}", job_id);

    let file_name = Path::new(&file_path)
        .file_name()
        .unwrap()
        .to_string_lossy()
        .to_string();

    let meta = json!({
        "name": name,
        "type": video_type.to_uppercase(),
        "id": job_id,
        "videos": {
            "1": file_name
        }
    });

    let meta_string = meta.to_string();

    let tcp = TcpStream::connect("100.113.7.79:22")
        .map_err(|e| e.to_string())?;

    let mut sess = Session::new().map_err(|e| e.to_string())?;    sess.set_tcp_stream(tcp);
    sess.handshake().map_err(|e| e.to_string())?;

    sess.userauth_password("deploy", &password)
        .map_err(|e| e.to_string())?;

    let sftp = sess.sftp().map_err(|e| e.to_string())?;

    let remote_dir = format!("/srv/budgetflix/media/inbox/new/{}", folder_name);
    sftp.mkdir(Path::new(&remote_dir), 0o755)
        .map_err(|e| e.to_string())?;

    let meta_path = format!("{}/meta.json", remote_dir);
    let mut remote_meta = sftp
        .create(Path::new(&meta_path))
        .map_err(|e| e.to_string())?;

    use std::io::Write;
    remote_meta
        .write_all(meta_string.as_bytes())
        .map_err(|e| e.to_string())?;

    let data = fs::read(&file_path).map_err(|e| e.to_string())?;

    let remote_video_path = format!("{}/{}", remote_dir, file_name);
    let mut remote_file = sftp
        .create(Path::new(&remote_video_path))
        .map_err(|e| e.to_string())?;

    remote_file
        .write_all(&data)
        .map_err(|e| e.to_string())?;

    Ok(())
}