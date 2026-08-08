# WorldofKits — Run doc

Plain static site: `index.html` + `style.css` + `app.js` + `products.js` (+ `images/`). No build step, no dependencies, no package manager.

## How to reproduce the artifacts

Nothing to build or copy. The site is served directly from the worktree files.

## How to run the server

Serve the project root with any static file server. Example (Python 3):

```bash
cd C:\Users\rosar\Desktop\worldofkits\WordOfKits
python -m http.server 8391 > .freebuff/preview.log 2>&1 &
```

Then verify: `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8391/index.html` → expect `200`.

Port: 8391 (the de-facto preview port for this project; change only if occupied).
