const tips = [
    "Drink at least 2 liters of water daily.",
    "Avoid screens 1 hour before sleep.",
    "Take short walks during the day.",
    "Eat more fruits and vegetables.",
    "Practice deep breathing to reduce stress.",
    "Sleep at least 7-8 hours each night."
];

document.getElementById('tip').textContent =
    tips[Math.floor(Math.random() * tips.length)];
