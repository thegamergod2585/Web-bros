// Sample seed database - you can expand this or connect to a real API
const seedDatabase = [
    {
        id: 1,
        seed: "-8607000717645803559",
        name: "Peaceful Paradise",
        description: "Spawn near a beautiful valley with multiple biomes within walking distance",
        features: ["Good Spawn", "Multiple Biomes", "Village Nearby"],
        coordinates: "100, 64, 200",
        difficulty: "Peaceful"
    },
    {
        id: 2,
        seed: "123456789",
        name: "Desert Oasis",
        description: "Spawn in a vast desert with a pyramid and village",
        features: ["Good Spawn", "Desert Pyramid", "Near Villages"],
        coordinates: "50, 64, -100",
        difficulty: "Easy"
    },
    {
        id: 3,
        seed: "-1234567890",
        name: "Mountain Kingdom",
        description: "Massive mountain range with caves and ores everywhere",
        features: ["Many Structures", "Mountains", "Caves"],
        coordinates: "-200, 100, 300",
        difficulty: "Medium"
    },
    {
        id: 4,
        seed: "987654321",
        name: "Ocean Explorer",
        description: "Spawn on an island surrounded by ocean with multiple islands nearby",
        features: ["Island Spawn", "Ocean", "Shipwrecks"],
        coordinates: "0, 64, 0",
        difficulty: "Easy"
    },
    {
        id: 5,
        seed: "-5000",
        name: "Dark Forest",
        description: "Dense dark forest with ancient cities and mansions",
        features: ["Dark Forest", "Mansions", "Many Structures"],
        coordinates: "-500, 64, 500",
        difficulty: "Hard"
    },
    {
        id: 6,
        seed: "2025",
        name: "Jungle Adventure",
        description: "Lush jungle biome with temples and wildlife",
        features: ["Jungle", "Temples", "Wildlife"],
        coordinates: "300, 64, -300",
        difficulty: "Medium"
    }
];

// Load seeds on page load
document.addEventListener('DOMContentLoaded', () => {
    displaySeeds(seedDatabase);
});

function displaySeeds(seeds) {
    const container = document.getElementById('seedsContainer');
    
    if (seeds.length === 0) {
        container.innerHTML = '<div class="no-results">No seeds found. Try a different search!</div>';
        return;
    }

    container.innerHTML = seeds.map(seed => `
        <div class="seed-card" onclick="copySeed('${seed.seed}')">
            <h3>${seed.name}</h3>
            <div class="seed-value">${seed.seed}</div>
            <p><strong>Description:</strong> ${seed.description}</p>
            <p><strong>Difficulty:</strong> ${seed.difficulty}</p>
            <p><strong>Spawn Coords:</strong> ${seed.coordinates}</p>
            <div class="tags">
                ${seed.features.map(feature => `<span class="tag">${feature}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function searchSeeds() {
    const searchInput = document.getElementById('seedInput').value.toLowerCase();
    const filterSpawn = document.getElementById('filterSpawn').checked;
    const filterVillage = document.getElementById('filterVillage').checked;
    const filterStructures = document.getElementById('filterStructures').checked;

    let filtered = seedDatabase;

    // Filter by search term
    if (searchInput) {
        filtered = filtered.filter(seed =>
            seed.name.toLowerCase().includes(searchInput) ||
            seed.seed.includes(searchInput) ||
            seed.description.toLowerCase().includes(searchInput)
        );
    }

    // Filter by checkboxes
    if (filterSpawn || filterVillage || filterStructures) {
        filtered = filtered.filter(seed => {
            const hasSpawn = filterSpawn && seed.features.includes('Good Spawn');
            const hasVillage = filterVillage && seed.features.some(f => 
                f.includes('Village') || f.includes('village')
            );
            const hasStructures = filterStructures && seed.features.includes('Many Structures');

            return (filterSpawn && hasSpawn) || 
                   (filterVillage && hasVillage) || 
                   (filterStructures && hasStructures);
        });
    }

    displaySeeds(filtered);
}

function copySeed(seed) {
    navigator.clipboard.writeText(seed);
    alert(`Seed copied to clipboard:\n${seed}`);
}

// Search on Enter key
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('seedInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchSeeds();
        }
    });
});
