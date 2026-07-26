# World's Fruit Name API

Welcome to the **World's Fruit Name** sample dataset and API endpoint documentation. This guide demonstrates how to build a high-throughput fruit classification and search microservice using MicroJet.

---

## Endpoint Overview

The World's Fruit Name API provides real-time access to global botanical data, fruit taxonomies, and nutrition benchmarks.

```python
from microjet import MicroJet, Router
from pydantic import BaseModel
from typing import List, Optional

app = MicroJet(title="World Fruit Taxonomy API")
router = Router(prefix="/fruits")

FRUIT_DATABASE = [
    {"id": 1, "name": "Dragon Fruit", "latin": "Hylocereus undatus", "origin": "Central America", "vitamin_c_mg": 20.5},
    {"id": 2, "name": "Mangosteen", "latin": "Garcinia mangostana", "origin": "Southeast Asia", "vitamin_c_mg": 7.2},
    {"id": 3, "name": "Durian", "latin": "Durio zibethinus", "origin": "Malaysia & Indonesia", "vitamin_c_mg": 19.7},
    {"id": 4, "name": "Passion Fruit", "latin": "Passiflora edulis", "origin": "South America", "vitamin_c_mg": 30.0},
    {"id": 5, "name": "Rambutan", "latin": "Nephelium lappaceum", "origin": "Southeast Asia", "vitamin_c_mg": 4.9}
]

class FruitFilter(BaseModel):
    min_vitamin_c: Optional[float] = 0.0
    search: Optional[str] = ""

@router.get("/")
async def list_fruits(min_vitamin_c: float = 0.0, search: str = ""):
    results = [
        f for f in FRUIT_DATABASE 
        if f["vitamin_c_mg"] >= min_vitamin_c and search.lower() in f["name"].lower()
    ]
    return {"count": len(results), "fruits": results}

app.include_router(router)
```

---

## Endpoint Request

Try querying the endpoint directly using the code snippet below or sending test requests.

```bash
curl -X GET "https://api.microjet.dev/fruits?min_vitamin_c=10.0&search=dragon" \
     -H "Accept: application/json"
```

### Response Payload

```json
{
  "count": 1,
  "fruits": [
    {
      "id": 1,
      "name": "Dragon Fruit",
      "latin": "Hylocereus undatus",
      "origin": "Central America",
      "vitamin_c_mg": 20.5
    }
  ]
}
```
