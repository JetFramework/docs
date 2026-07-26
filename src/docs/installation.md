# Installation Guide

Installing Jet is simple and straightforward.

---

## Step-by-Step Installation

Clone the Jet repository from GitHub and install it in editable mode using `pip`:

```bash
git clone https://github.com/CodeGear/jet.git
cd jet
pip install -e .
```

This installs the `jet` command CLI locally on your machine.

---

## Verifying Installation

Verify that the CLI command is available by running:

```bash
jet --version
```

---

## Running Your First App

Create an `app.py` file with the following contents:

```python
from jet import *

app = Jet()

def home(request):
    return Response.html("<h1>Hello from Jet!</h1>")

app.route("/", home)

if __name__ == "__main__":
    serve(app)
```

Start the development server with auto-reload:

```bash
jet run
```

Visit `http://localhost:3000` to see your application, and `http://localhost:3000/docs` to view the auto-generated Swagger UI.
