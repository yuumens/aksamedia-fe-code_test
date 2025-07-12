(function () {
  const STORAGE_KEY = "theme";

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    const body = document.body;

    // Hapus class tema yang ada
    root.classList.remove("light", "dark");
    body.classList.remove("light", "dark");

    let effectiveTheme = theme;

    if (theme === "system" || !theme) {
      effectiveTheme = getSystemTheme();
    }

    // Tambahkan class tema
    root.classList.add(effectiveTheme);
    body.classList.add(effectiveTheme);

    // Untuk Tailwind CSS
    if (effectiveTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Set attribute untuk CSS selector alternatif
    root.setAttribute("data-theme", effectiveTheme);
    body.setAttribute("data-theme", effectiveTheme);
  }

  // Terapkan tema sebelum halaman render
  const storedTheme = getStoredTheme() || "system";
  applyTheme(storedTheme);

  // Listen untuk perubahan system theme jika menggunakan system
  if (storedTheme === "system") {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", function () {
      applyTheme("system");
    });
  }
})();
