# 🌍 Minecraft Bedrock Seed Finder

A web application to discover and share amazing Minecraft Bedrock seeds!

## Features

- 🔍 **Search Seeds** - Find seeds by name or seed number
- 🏷️ **Filter by Features** - Filter seeds by spawn quality, villages, and structures
- 📋 **Seed Details** - View spawn coordinates, difficulty, and features
- 📋 **Copy to Clipboard** - Easy one-click copying of seed values

## How to Use

1. **Search** - Enter a seed name or ID in the search box
2. **Filter** - Check the filter boxes to narrow down results
3. **Click** - Click any seed card to copy the seed to your clipboard
4. **Paste** - Paste the seed in your Minecraft Bedrock world creation screen

## Getting Started

Simply open `index.html` in your web browser to start exploring seeds!

### Local Development

```bash
# No build process needed!
# Just open index.html in your browser
# Or serve it locally:
python -m http.server 8000
# Then visit http://localhost:8000
```

## Adding Your Own Seeds

Edit `script.js` and add seeds to the `seedDatabase` array:

```javascript
{
    id: 7,
    seed: "YOUR_SEED_NUMBER",
    name: "Your Seed Name",
    description: "Description of what makes this seed special",
    features: ["Feature 1", "Feature 2"],
    coordinates: "X, Y, Z",
    difficulty: "Easy/Medium/Hard"
}
```

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling and animations
- **JavaScript (Vanilla)** - Interactive functionality
- **GitHub Pages** - Free hosting

## Tips for Finding Great Seeds

- Look for spawns near water sources
- Check for villages and structures nearby
- Explore different biomes
- Watch for rare biome combinations
- Test seeds in creative mode first

## Contributing

Feel free to fork this repo and add more seeds! Create a pull request with your additions.

## Disclaimer

This project is fan-made and not affiliated with Minecraft or Microsoft. Minecraft is a trademark of Microsoft Corporation.

---

Happy exploring! 🎮
