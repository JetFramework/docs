# Quick Start

Welcome to the Jet documentation! This page will give you an introduction to 80% of the Jet concepts that you will use on a daily basis.

>### Here you will learn
> * How to create a Jet application
> * How to create and connect routes
> * How to capture route parameters
> * How to render pages and templates
> * How to work with Request and Response objects
> * How to serve static files
> * How to run the built-in development server
## Creating an Application

Every Jet project starts with a single object: `Jet()`. Create it, then attach routes to it.

```python
from jet import *

app = Jet()

serve(app)
```

That's it — this is a complete, runnable Jet application. Save it as `app.py` and run:

```bash
jet run
```

## Routes

Routes connect a URL path to a Python function. Jet calls this function a **handler**.

```python
def login(request):
    return Response.html("<h1>Login page</h1>")

app.route("/login", login)
```

A handler receives a `Request` object and must return a `Response` — or a plain string, dict, or list, which Jet converts for you automatically.

```python
def ping(request):
    return {"status": "ok"}   # Jet turns this into a JSON response

app.route("/ping", ping)
```

## Route Parameters

Wrap a segment in `<angle brackets>` to capture it as a parameter. Captured values are available on `request.params`.

```python
def user_profile(request):
    user_id = request.params["id"]
    return Response.json({"user": user_id})

app.route("/user/<id>", user_profile)
```

## Pages

Most routes just render a template — `app.page()` is a shortcut for exactly that.

```python
app.page("/", "index.html")
```

This looks for `templates/index.html` and renders it automatically, passing along the current `request` and any route parameters. If you need to pass your own variables, render explicitly instead:

```python
def home(request):
    return Response.html(
        Template("index.html").render(title="Jet", tagline="Fast. Simple. Python.")
    )

app.route("/", home)
```

## Templates

Jet templates compile down to real Python, so you get real expressions and real control flow — no separate template language to learn.

```html
<h1>Hello, <%jet name %>!</h1>

<%jet: for item in items %>
    <li><%jet item.upper() %></li>
<%jet: end %>

<%jet: if user_is_admin %>
    <span>Admin Panel</span>
<%jet: else %>
    <span>Welcome</span>
<%jet: end %>
```

Anything between `<%jet ... %>` is a Python **expression** to output. Anything after `<%jet: ... %>` is a Python **statement** — `if`, `for`, `while`, or `with` — and must be closed with `<%jet: end %>`.

## Request and Response

The `Request` object gives you everything about the incoming request:

```python
def submit(request):
    print(request.method)      # "POST"
    print(request.query)       # {"page": "2"}
    print(request.form())      # form-encoded body
    print(request.json())      # JSON body
    print(request.cookies)     # {"session": "abc123"}

    return Response.redirect("/thanks")
```

The `Response` object gives you a few clear ways to build a reply:

```python
Response.html("<h1>Hi</h1>")
Response.json({"ok": True})
Response.redirect("/login")
Response.file("static/logo.png")
```

## Static Files

Anything placed in the `static/` folder is served automatically — no route needed.

```
project/
└── static/
    └── logo.png
```

```html
<img src="/static/logo.png">
```

## Running the Dev Server

`serve(app)` starts Jet's built-in development server — with auto-reload, colored request logging, and a startup banner.

```python
if __name__ == "__main__":
    serve(app)
```

```bash
jet run
```

## Auto Documentation

Every Jet app automatically gets an interactive API explorer at `/docs`, backed by `/openapi.json` — generated from your routes with zero configuration.

## Putting It All Together

```python
from jet import *

app = Jet()

def login(request):
    return Response.html("<h1>Login page</h1>")

def user_profile(request):
    return Response.json({"user": request.params["id"]})

app.page("/", "index.html")
app.route("/login", login)
app.route("/user/<id>", user_profile)

if __name__ == "__main__":
    serve(app)
```

That covers routes, pages, templates, request/response, and the dev server — the concepts you'll reach for in nearly every Jet project. From here, the [full documentation](./README.md) goes deeper into each piece.
