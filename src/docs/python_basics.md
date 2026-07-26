# Python Async Basics

MicroJet leverages Python 3.10+ native `asyncio` constructs to deliver non-blocking asynchronous event loops with zero-copy I/O operations.

---

## Asynchronous Paradigms

In Python, asynchronous programming allows your microservices to handle thousands of concurrent I/O operations (such as database queries and HTTP API requests) without spawning thousands of heavy OS threads.

```python
import asyncio
import time
from microjet import MicroJet

app = MicroJet()

async def fetch_database_query(query_id: int):
    # Non-blocking async sleep simulating database I/O
    await asyncio.sleep(0.01)
    return {"query_id": query_id, "status": "COMPLETED"}

@app.get("/async-demo/{id:int}")
async def async_endpoint(id: int):
    start_time = time.perf_counter()
    
    # Execute 3 concurrent async tasks simultaneously
    results = await asyncio.gather(
        fetch_database_query(id),
        fetch_database_query(id + 1),
        fetch_database_query(id + 2)
    )
    
    elapsed_ms = (time.perf_counter() - start_time) * 1000
    return {
        "execution_time_ms": round(elapsed_ms, 2),
        "tasks_completed": len(results),
        "results": results
    }
```

---

## Key Best Practices

1. **Avoid Blocking Functions**: Do not use `time.sleep()` or synchronous database drivers inside `async def` route handlers. Always use async primitives like `asyncio.sleep()` and `aiohttp`/`httpx`.
2. **Task Concurrency**: Use `asyncio.gather()` to run independent queries in parallel.
3. **Sub-millisecond Performance**: MicroJet keeps event loops light by minimizing heap allocations during request parsing.
