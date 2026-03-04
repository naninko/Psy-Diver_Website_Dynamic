# PSY-DIVER Dynamic Website

A CMS-enabled version of the PSY-DIVER website. Admins can add/delete news items and custom pages directly through the website UI — no code editing required.

---

## Project Structure

```
psy-diver-dynamic/
├── frontend/    ← React website (port 5173 in dev)
└── backend/     ← Node.js API server (port 3001)
```

---

## How to Run (Development)

You need **two terminal windows**.

### Terminal 1 — Backend

```bash
cd psy-diver-dynamic/backend
npm start
```

You should see: `PSY-DIVER backend running on http://localhost:3001`

### Terminal 2 — Frontend

```bash
cd psy-diver-dynamic/frontend
npm run dev
```

Open: **http://localhost:5173**

---

## Admin Access

1. Navigate to **http://localhost:5173/admin**
2. Enter the admin password (default: `psydiver2024`)
3. You are now logged in — a pink **+** button appears in the bottom-right corner of every page

### What admins can do (via the + button):

| Action | Description |
|--------|-------------|
| 📰 Neuigkeit hinzufügen | Add a news article (German + English) |
| 📄 Neue Seite erstellen | Create a new page that appears in navigation |
| 🔑 Passwort ändern | Change the admin password |
| 🚪 Abmelden | Log out |

### Adding a new page

When you create a new page, choose where it appears in the navigation:
- **"Über uns" Dropdown** — appears as a sub-item under the "Über uns" menu (e.g. Projektsteuergruppe, Wissenschaftliches Beirat)
- **Hauptnavigation** — appears as its own top-level tab in the navigation bar

The page is immediately visible to all visitors — no restart needed.

---

## Changing the Admin Password

### Via the website UI (recommended):
1. Log in as admin
2. Click the pink **+** button → **🔑 Passwort ändern**
3. Enter current password and new password

### Via the `.env` file (sets the initial password after restart):
Edit `backend/.env`:
```
ADMIN_PASSWORD=your-new-password
```
Note: Password changes made via the UI persist in memory. The `.env` value is only used when the backend server starts for the first time.

---

## Content Storage

All dynamic content is stored in:
```
backend/data/content.json
```

This file contains:
- All news items (with German + English text)
- All custom pages (with German + English content)

You can back this file up to preserve your content.

---

## Deployment

For production on Hetzner:

1. Build the frontend:
   ```bash
   cd frontend && npm run build
   ```
2. Serve the `frontend/dist/` folder via nginx/Apache
3. Run the backend with a process manager:
   ```bash
   cd backend && npm start
   ```
   Or use PM2: `pm2 start server.js --name psy-diver-backend`
4. Configure nginx to proxy `/api/` requests to `http://localhost:3001`

---

## Default Credentials

| Field | Value |
|-------|-------|
| Username | *(not needed — password only)* |
| Password | `psydiver2024` |

**Change the password after first login!**
