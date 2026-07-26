/**
 * Dynamic Favicon Loader and Handler
 * 
 * Ensures the default Jet icon is active by default, and automatically switches
 * if a custom favicon.ico or icon file is uploaded to the public directory or server.
 */

export const DEFAULT_JET_ICON = "https://i.ibb.co/LDdqnb1L/6fb40491-3b3c-4c88-a692-e5231bd773e2-1.png";

export function updateFavicon(url: string) {
  const links = document.querySelectorAll("link[rel~='icon']");
  links.forEach((el) => el.remove());

  const link = document.createElement("link");
  link.rel = "icon";
  link.href = url;
  document.head.appendChild(link);

  const shortcutLink = document.createElement("link");
  shortcutLink.rel = "shortcut icon";
  shortcutLink.href = url;
  document.head.appendChild(shortcutLink);

  const appleLink = document.createElement("link");
  appleLink.rel = "apple-touch-icon";
  appleLink.href = url;
  document.head.appendChild(appleLink);
}

export function initFaviconManager() {
  // 1. Check if there is a user-saved favicon in localStorage
  const savedFavicon = localStorage.getItem("custom_favicon_url");
  if (savedFavicon) {
    updateFavicon(savedFavicon);
    return;
  }

  // 2. Set default Jet icon first
  updateFavicon(DEFAULT_JET_ICON);

  // 3. Check if /favicon.ico or /favicon.png was uploaded to the server
  const candidates = ["/favicon.ico", "/favicon.png", "/favicon.svg"];
  
  candidates.forEach((path) => {
    fetch(path, { method: "HEAD", cache: "no-store" })
      .then((res) => {
        const contentType = res.headers.get("content-type") || "";
        // If it returns OK and is NOT the text/html SPA fallback index.html page
        if (res.ok && !contentType.includes("text/html") && !contentType.includes("text/plain")) {
          const img = new Image();
          img.onload = () => {
            if (img.width > 0 && img.height > 0) {
              updateFavicon(`${path}?v=${Date.now()}`);
            }
          };
          img.src = `${path}?v=${Date.now()}`;
        }
      })
      .catch(() => {
        // Ignore fetch errors, keep fallback active
      });
  });
}
