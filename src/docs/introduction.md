# Introduction to Jet

**Jet** is a lightweight, Python-first web framework developed by **Code Gear**.

---

## Core Principles

Jet is engineered around three core principles:

1. **Simple**: Jet avoids unnecessary magic. Every API is readable by beginners while remaining powerful enough to grow — no decorator-based routing, no hidden abstractions, no invented terminology.
2. **Function-Based**: Routes are just Python functions. Write `app.route("/login", login)` and pass a handler — no decorators, no boilerplate classes.
3. **Configuration-Driven**: Jet follows one principle — configuration describes the application, application code describes application behavior. `config.py` and `app.py` stay cleanly separated.

---

## Documentation Overview

The documentation covers:

- **Routing and Pages**: `app.page("/", "index.html")` & `app.route("/login", login)`
- **Templates**: `<%jet %>` syntax
- **Request and Response objects**: `Response.html()`, `Response.json()`, etc.
- **Static Files and Uploads**
- **Auto Documentation**: `/docs` (interactive Swagger UI) & `/openapi.json`
- **The `jet` CLI**: `jet run` dev server with auto-reload

---

## Example

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
