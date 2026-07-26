# Routing and Pages

Routing in Jet is simple, explicit, and function-based.

---

## Function-Based Routes

In Jet, routes are just Python functions passed to `app.route()`:

```python
from jet import *

app = Jet()

def profile(request):
    user_id = request.params.get("id")
    return Response.json({"user_id": user_id, "status": "active"})

app.route("/profile", profile)
```

No mandatory decorators or boilerplate classes required.

---

## Page Rendering

Render HTML templates located in `templates/` using `app.page()`:

```python
app.page("/", "index.html")
app.page("/about", "about.html")
```

---

## Templates (`<%jet %>` Syntax)

Templates in `templates/` support Jet's tag syntax:

```html
<!DOCTYPE html>
<html>
<body>
    <h1>Welcome</h1>
    <%jet if request.user %>
        <p>Hello <%jet request.user.name %></p>
    <%jet endif %>
</body>
</html>
```

---

## Configuration-Driven Setup

Keep settings cleanly separated in `config.py`:

```python
# config.py
PORT = 3000
DEBUG = True
```

```python
# app.py
from jet import *
import config

app = Jet(config=config)
```
