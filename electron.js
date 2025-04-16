console.log("Starting Electron main process...");

import { app, BrowserWindow } from 'electron';   // Use import instead of require
import path from 'path';
import http from 'http';

let mainWindow;

// Helper to wait until Vite dev server is ready
function waitForViteServer(url, attempts = 20, interval = 500) {
  return new Promise((resolve, reject) => {
    let tries = 0;
    const check = () => {
      http.get(url, () => resolve())
        .on('error', () => {
          if (++tries < attempts) {
            setTimeout(check, interval);
          } else {
            reject(new Error('Vite dev server not reachable'));
          }
        });
    };
    check();
  });
}

async function createWindow() {
  await waitForViteServer('http://localhost:5173');

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL('http://localhost:5173');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow().catch(err => {
    console.error('Failed to create window:', err);
    app.quit();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
