# HoBot Frontend

![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-AGPL--3.0-blue.svg)

Modern web interface for HoBot - a feature-rich chat bot for VK Video Live streamers.

## 📖 About

🤖HoBot is a comprehensive bot for VK Video Live that enhances streaming experience by providing interactive features for both streamers and viewers. This repository contains the frontend application that allows streamers to manage and configure the bot through an intuitive web interface.

## ✨ Features

### 🎵 YouTube Music Requests

- Viewers can request music to be played on the stream

- Configurable request limitations and restrictions

- Moderator controls for playback (skip, volume adjustment, pause)

- Real-time song information and queue status in chat

- Dedicated page for viewing past and upcoming songs

### 📊 Polling System

Two types of voting:

- **Single Choice:** Vote for one option from multiple choices

- **Rating:** Calculate average rating from chat (e.g., rate a movie)

### ⚙️ Custom Commands

- Create informational commands with custom text output

- Flexible command configuration

- Useful for displaying streamer's social media links and other information

### 🚀 Additional Features

- Flexible settings for all commands

- User feedback system

- Real-time communication via WebSocket

- JWT-based authentication

- VK Video Live integration

> **⚠️ Important:** For proper bot operation, it requires moderator rights. Grant rights with the command: `/mod channel <BOT_NAME>`

## 🔗 Related Repository

Backend: [HoBot_Backend](https://github.com/im1x/HoBot_Backend)

## 🛠️ Technology Stack

- **Framework:** React 19.1
- **Language:** TypeScript
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **UI Library:** Mantine UI
- **Real-time Communication:** Socket.io
- **Routing:** React Router
- **Animations:** GSAP, Motion
- **Media Player:** React Player

## 📦 Configuration

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://your-backend-url/api/
VITE_WS_URL=http://your-websocket-url/
```

**Environment Variables:**

- `VITE_API_URL` - Backend API URL (must end with `/`)
- `VITE_WS_URL` - WebSocket server URL for real-time features

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production

## 🔧 Development

The project uses Vite's development proxy configuration for local development:

- API requests to `/api` are proxied to `http://127.0.0.1:3001`
- WebSocket connections to `/socket.io` are proxied to `http://127.0.0.1:3002`

These settings can be modified in `vite.config.ts`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 🔗 Related Projects

- **Backend:** [HoBot_Backend](https://github.com/im1x/HoBot_Backend)

## 🆘 Support

If you encounter any issues or have questions:

1. Check existing [Issues](../../issues)

2. Create a new issue with detailed information

3. Use the feedback feature within the application

## 📄 License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ for VK Video Live streamers by [Im1x](https://github.com/im1x)
