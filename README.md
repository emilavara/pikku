# 🐜 pikku

**The tiny CMS that stays out of your way.**  
No database. No auth. No config. Just JSON.

---

## ⚡ What is Pikku?

**Pikku** is a super-lightweight content management system for developers who want the power of structured content — without the overhead of full-stack complexity.

It's designed to run **during development**, saving data as flat `.json` files you can version control, ship statically, or feed into your frontend however you like.

> Tiny enough to forget.  
> Powerful enough to build with.

---

## ✨ Features

- 🧾 **File-based** — One JSON file per collection
- 🎛 **Custom schemas** — Define fields in the UI
- ⚡ **Fast as hell** — No ORM, no serialization, just instant reads
- 🧘 **No setup** — Works out of the box in dev
- 💅 **Scoped UI** — Dashboard styles don’t leak into your frontend
- 🚀 **Frontend-agnostic... (Soon™)** — Use with any stack: Svelte, Next, Astro, etc.
- 🧱 **Composable** — Import data like this:

```js
import pikku from '$lib/pikkuClient.js'

const posts = await pikku.find({
    collection: 'posts',
    where: {
        published: { equals: true },
        title: { contains: 'summer' }
    }
})
```

---

## 🛠 File Structure (default)

```
/src/
  /routes/
    +page.svelte         ← your frontend
    /pikku/              ← the CMS dashboard
    /api/pikku/          ← read/write JSON APIs

/static/
  /data/
    posts.json           ← your collections
    products.json
```

---

## 🚧 How It Works

- Each **collection** is a single JSON file.
- Each collection has a `config` (fields) and `data` (entries).
- All editing happens through the `/pikku` dashboard.
- In production, JSON is read-only and treated as static content.

---

## 🧪 Example Collection File

```json
// /static/data/posts.json
{
  "config": {
    "fields": [
      { "name": "title", "type": "text" },
      { "name": "published", "type": "checkbox" }
    ]
  },
  "data": [
    {
      "id": "abc123",
      "title": "Hello world",
      "published": true
    }
  ]
}
```

---

## 🧠 Why Pikku?

Because sometimes you don't want:
- A full-blown CMS
- A running database
- Token auth, sessions, middleware
- Serverless cold starts

You just want a little UI that edits some `.json`.

---

## 🤖 Use Cases

- Side projects
- Landing pages
- Design systems with editable content
- Static sites with occasional dynamic config
- Prototypes, one-pagers, internal tools

---

## 🚀 Getting Started

```bash
git clone your-project
cd your-project
npm install
npm run dev
```

Then visit: `http://localhost:5173/pikku`

---

## 📦 Coming soon

- More field types
- Drag & drop field editor
- Entry-level hooks
- Import/export tools
- Deployment-friendly read-only UI

---

## ❤️ Credits

Built with SvelteKit, frustration, and love.  
The name _Pikku_ means "small" in Finnish.

---

## 🐜 Pikku: small on purpose.
