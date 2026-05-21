use ssh2::Session;
use std::fs;
use std::io::Write;
use std::net::TcpStream;
use std::path::Path;

use reqwest::Client;
use serde_json::json;
use tauri::command;
use uuid::Uuid;

#[command]
pub async fn upload_sftp_job(
    file_path: String,
    title: String,
    video_type: String,
    password: String,
) -> Result<(), String> {

    // =========================
    // JOB
    // =========================

    let job_id = Uuid::new_v4().to_string();

    let folder_name = format!("job_{}", job_id);

    let file_name = Path::new(&file_path)
        .file_name()
        .ok_or("Invalid file name")?
        .to_string_lossy()
        .to_string();

    // =========================
    // SSH CONNECT
    // =========================

    let tcp = TcpStream::connect("100.113.7.79:22")
        .map_err(|e| e.to_string())?;

    let mut sess = Session::new()
        .map_err(|e| e.to_string())?;

    sess.set_tcp_stream(tcp);

    sess.handshake()
        .map_err(|e| e.to_string())?;

    sess.userauth_password("deploy", &password)
        .map_err(|e| e.to_string())?;

    // =========================
    // SFTP
    // =========================

    let sftp = sess.sftp()
        .map_err(|e| e.to_string())?;

    let remote_dir = format!(
        "/srv/budgetflix/media/inbox/new/{}",
        folder_name
    );

    sftp.mkdir(Path::new(&remote_dir), 0o755)
        .map_err(|e| e.to_string())?;

    // =========================
    // VIDEO UPLOAD
    // =========================

    let data = fs::read(&file_path)
        .map_err(|e| e.to_string())?;

    let remote_video_path = format!(
        "{}/{}",
        remote_dir,
        file_name
    );

    let mut remote_file = sftp
        .create(Path::new(&remote_video_path))
        .map_err(|e| e.to_string())?;

    remote_file
        .write_all(&data)
        .map_err(|e| e.to_string())?;

    // =========================
    // API REQUEST
    // =========================

    let body = json!({
        "jobID": job_id,
        "title": title,
        "type": video_type.to_uppercase(),
        "videos": {
            "1": file_name
        }
    });

    let client = Client::new();

    let response = client
        .put("http://100.113.7.79/api/upload")
        .basic_auth("deploy", Some(password))
        .json(&body)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    if !response.status().is_success() {
        return Err(format!(
            "API request failed: {}",
            response.status()
        ));
    }

    Ok(())
}