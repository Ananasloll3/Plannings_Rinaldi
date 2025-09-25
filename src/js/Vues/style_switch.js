
const themeLink = document.getElementById("theme-css");
const choixStyle = document.getElementById("choix-style");

// Charger le dernier thème choisi (si enregistré)
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  themeLink.setAttribute("href", savedTheme);
  choixStyle.value = savedTheme;
}

// Changer le thème quand l'utilisateur sélectionne
choixStyle.addEventListener("change", (e) => {
  const newTheme = e.target.value;
  themeLink.setAttribute("href", newTheme);
  localStorage.setItem("theme", newTheme); // Sauvegarde
});

