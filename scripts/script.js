const themeToggle = document.querySelector(".theme-toggle");
const chosenTheme = window.localStorage && window.localStorage.getItem("theme");
const chosenThemeIsDark = chosenTheme == "dark";
const chosenThemeIsLight = chosenTheme == "light";

function detectOSColorTheme() {
    if (chosenThemeIsDark) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else if (chosenThemeIsLight) {
        document.documentElement.setAttribute("data-theme", "light");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
}

function switchTheme() {
    if (chosenThemeIsDark) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
    detectOSColorTheme();
    window.location.reload();
}

if (themeToggle) {
    themeToggle.addEventListener("click", switchTheme, false);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => e.matches && detectOSColorTheme());
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => e.matches && detectOSColorTheme());
    detectOSColorTheme();
} else {
    localStorage.removeItem("theme");
}

const menuTrigger = document.querySelector(".menu-trigger");
const menu = document.querySelector(".menu");
const mobileQuery = getComputedStyle(document.body).getPropertyValue("--phoneWidth");

const isMobile = () => window.matchMedia(mobileQuery).matches;

const isMobileMenu = () => {
    if (menuTrigger) {
        menuTrigger.classList.toggle("hidden", !isMobile());
    }
    if (menu) {
        menu.classList.toggle("hidden", isMobile());
    }
};

if (menuTrigger) {
    menuTrigger.addEventListener("click", () => {
        if (menu) {
            menu.classList.toggle("hidden");
        }
    });
}

window.addEventListener("resize", isMobileMenu);


isMobileMenu();
