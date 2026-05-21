<div align="center">

# Media Uploader

Desktop-first media upload tool for the BudgetFlix media workflow.

Built with a fast React interface, a native Tauri shell, and backend-side upload handling for SFTP-based media ingestion.

<br />

![Version](https://img.shields.io/badge/version-0.1.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/status-early_development-f59e0b?style=for-the-badge)

<br />

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tauri](https://img.shields.io/badge/Tauri-24C8DB?style=for-the-badge&logo=tauri&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)
![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

---

## Overview

**Media Uploader** is a native desktop application designed to move media files into the BudgetFlix upload pipeline.

The current version focuses on a simple, direct upload flow: choose a local video path, provide a title and type, authenticate with the deployment password, upload the file through SFTP, then register the upload job through the backend API.

The project is still in early development, but it is structured as the foundation for a larger media operations tool with dashboards, queues, automation, monitoring, and processing features.

---

## What It Does Today

- Runs as a native desktop app through **Tauri 2**
- Provides a React-based upload form
- Accepts local media file paths
- Uploads videos to a remote SFTP inbox
- Creates unique upload job IDs
- Sends upload metadata to the BudgetFlix API
- Uses a Rust command layer for desktop/backend integration
- Includes Tailwind CSS and DaisyUI for UI styling

---

## Tech Stack

| Layer | Tools |
| --- | --- |
| Desktop shell | Tauri |
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS, DaisyUI |
| Native/backend layer | Rust |
| Upload transport | SFTP / SSH |
| API communication | Reqwest |
| Future services | Go |

---

## Project Structure

```txt
media-uploader/
+-- src/
|   +-- App.tsx
|   +-- main.tsx
|   +-- pages/
|   |   +-- MovieForm.tsx
|   +-- layout/
|   +-- components/
+-- src-tauri/
|   +-- src/
|   |   +-- lib.rs
|   |   +-- main.rs
|   |   +-- sftp.rs
|   +-- Cargo.toml
|   +-- tauri.conf.json
+-- public/
+-- package.json
+-- README.md
```

---

## Getting Started

### Requirements

- Node.js
- npm
- Rust toolchain
- Tauri prerequisites for your operating system

### Install Dependencies

```bash
npm install
```

### Run Frontend Development Server

```bash
npm run dev
```

### Run Desktop App

```bash
npm run tauri dev
```

### Build Frontend

```bash
npm run build
```

### Build Desktop App

```bash
npm run tauri build
```

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Type-checks and builds the frontend |
| `npm run preview` | Serves the production frontend build locally |
| `npm run tauri` | Runs Tauri CLI commands |

---

## Upload Flow

```mermaid
flowchart LR
    A["User enters video details"] --> B["React form calls Tauri command"]
    B --> C["Rust creates upload job ID"]
    C --> D["File is uploaded through SFTP"]
    D --> E["Metadata is sent to BudgetFlix API"]
    E --> F["Upload job is ready for processing"]
```

---

## Roadmap

- Drag-and-drop media selection
- Upload progress tracking
- Better validation and error feedback
- Queue view for multiple upload jobs
- Dashboard for upload activity
- Media metadata editing
- Server health monitoring
- FFmpeg-based processing hooks
- Thumbnail generation
- Multi-server configuration
- Settings screen for remote endpoints and credentials

---

## Development Status

| Field | Value |
| --- | --- |
| Version | `0.1.0` |
| Stage | Early development |
| Main focus | Upload pipeline foundation |
| Platform | Desktop |

---

## Notes

This project is part of the BudgetFlix tooling ecosystem. It is currently intended for internal development and controlled upload workflows.
