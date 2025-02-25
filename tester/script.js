document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.getElementById("theme-toggle");

    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    // Set toggle position based on theme
    if (savedTheme === "dark") {
        toggleSwitch.checked = true;
    }

    // Event listener to switch theme
    toggleSwitch.addEventListener("change", () => {
        const newTheme = toggleSwitch.checked ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
});
