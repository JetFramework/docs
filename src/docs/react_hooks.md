# React Hooks Integration

Integrate MicroJet APIs seamlessly with frontend React applications using custom hooks, SWR, or React Query.

---

## Standard React Hook Pattern

Here is how to create a type-safe custom React hook to call MicroJet endpoints:

```typescript
import { useState, useEffect } from "react";

interface FruitItem {
  id: number;
  name: string;
  latin: string;
  vitamin_c_mg: number;
}

export function useMicroJetApi<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`https://api.microjet.dev${endpoint}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          setData(json);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}
```

---

## Example Usage Component

```tsx
import React from "react";
import { useMicroJetApi } from "./useMicroJetApi";

export function FruitList() {
  const { data, loading, error } = useMicroJetApi("/fruits");

  if (loading) return <div>Loading fruit data...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <ul>
      {data?.fruits.map((fruit: any) => (
        <li key={fruit.id}>
          <strong>{fruit.name}</strong> ({fruit.latin}) - {fruit.vitamin_c_mg}mg Vitamin C
        </li>
      ))}
    </ul>
  );
}
```
