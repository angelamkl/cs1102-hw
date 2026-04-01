const btn = document.getElementById("demoBtn");
const text = document.getElementById("demoText");

const recommendations = [
  "Recommended item: Wireless Earbuds",
  "Recommended item: Business Analytics Book",
  "Recommended item: Travel Backpack",
  "Recommended item: Online Finance Course"
];

btn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * recommendations.length);
  text.textContent = recommendations[randomIndex];
});