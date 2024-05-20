document.addEventListener("DOMContentLoaded", function() {
    const numberOfCoinsSelect = document.getElementById("numberOfCoins");
    const resultsContainer = document.getElementById("results");

    const values = ["e", "w", "f", "a"];
    const valueToFullName = { "e": "earth", "w": "water", "f": "fire", "a": "air" };
    const valueToImage = { "e": "leaf.png", "w": "drop.png", "f": "flame.png", "a": "wind.png" };

    for (let i = 1; i <= 30; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        numberOfCoinsSelect.appendChild(option);
    }

    numberOfCoinsSelect.addEventListener("change", function() {
        const numCoins = parseInt(numberOfCoinsSelect.value);
        const result = runSimulation(numCoins);
        displayResults(result);
    });

    function runSimulation(numCoins) {
        const combinationCount = {};

        for (let i = 0; i < numCoins; i++) {
            const front = values[Math.floor(Math.random() * values.length)];
            const back = values[Math.floor(Math.random() * values.length)];
            const coin = front <= back ? `${front}-${back}` : `${back}-${front}`;
            combinationCount[coin] = (combinationCount[coin] || 0) + 1;
        }

        return Object.entries(combinationCount).sort((a, b) => a[0].localeCompare(b[0]));
    }

    function displayResults(result) {
        resultsContainer.innerHTML = "";
        result.forEach(([combination, count]) => {
            const parts = combination.split("-");
            const resultItem = document.createElement("div");
            resultItem.className = "result-item";

            const frontImg = document.createElement("img");
            frontImg.src = valueToImage[parts[0]];
            resultItem.appendChild(frontImg);

            const backImg = document.createElement("img");
            backImg.src = valueToImage[parts[1]];
            resultItem.appendChild(backImg);

            const text = document.createElement("span");
            text.textContent = `${valueToFullName[parts[0]]}-${valueToFullName[parts[1]]}: ${count}`;
            resultItem.appendChild(text);

            resultsContainer.appendChild(resultItem);
        });
    }

    // Initialize with the default number of coins
    numberOfCoinsSelect.value = 24;
    const initialResult = runSimulation(24);
    displayResults(initialResult);
});
