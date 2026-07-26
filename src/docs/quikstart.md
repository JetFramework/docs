# Quick Start Guide

Get up and running with Jet in under 2 minutes.

---

## 1. Minimal Application

Here is a minimal Jet web application:

```python
from jet import *

app = Jet()

def login(request):
    return Response.html("<h1>Login page</h1>")

app.page("/", "index.html")
app.route("/login", login)

if __name__ == "__main__":
    serve(app)
```

---

## 2. Explanation

- `app = Jet()` initializes your Jet framework instance.
- `app.page("/", "index.html")` maps the root `/` path to render the HTML template `templates/index.html`.
- `app.route("/login", login)` binds the path `/login` to the Python handler function `login`.
- `serve(app)` boots up the server.

---

## 3. Running with `jet run`

Execute the following command in your terminal:

```bash
jet run
```

This starts the built-in development server with:
- **Auto-reload**: Automatically reloads when code changes
- **Request logging**: Displays incoming requests and status codes
- **Startup banner**: Shows host and port information
- **Auto documentation**: Automatically mounts `/docs` (interactive Swagger UI) and `/openapi.json`
