
const emojis = [
    {e:"😀",n:"Grinning Face",c:"Smileys"},
    {e:"😂",n:"Face with Tears of Joy",c:"Smileys"},
    {e:"🥰",n:"Smiling Face with Hearts",c:"Smileys"},
    {e:"😍",n:"Heart Eyes",c:"Smileys"},
    {e:"😎",n:"Cool Face",c:"Smileys"},
    {e:"😭",n:"Crying Face",c:"Smileys"},
    {e:"🤔",n:"Thinking Face",c:"Smileys"},
    {e:"🥳",n:"Party Face",c:"Smileys"},
    {e:"🤩",n:"Star Eyes",c:"Smileys"},
    {e:"😴",n:"Sleeping Face",c:"Smileys"},
    {e:"😡",n:"Angry Face",c:"Smileys"},
    {e:"🥺",n:"Pleading Face",c:"Smileys"},

    {e:"👀",n:"Eyes",c:"People"},
    {e:"👋",n:"Waving Hand",c:"People"},
    {e:"👏",n:"Clapping Hands",c:"People"},
    {e:"💪",n:"Flexed Biceps",c:"People"},
    {e:"🙌",n:"Raising Hands",c:"People"},
    {e:"🧑",n:"Person",c:"People"},
    {e:"👨",n:"Man",c:"People"},
    {e:"👩",n:"Woman",c:"People"},
    {e:"🧑‍🤝‍🧑",n:"People Holding Hands",c:"People"},

    {e:"❤️",n:"Red Heart",c:"Hearts"},
    {e:"🩷",n:"Pink Heart",c:"Hearts"},
    {e:"💜",n:"Purple Heart",c:"Hearts"},
    {e:"💙",n:"Blue Heart",c:"Hearts"},
    {e:"💚",n:"Green Heart",c:"Hearts"},
    {e:"💔",n:"Broken Heart",c:"Hearts"},
    {e:"💕",n:"Two Hearts",c:"Hearts"},
    {e:"💖",n:"Sparkling Heart",c:"Hearts"},

    {e:"😘",n:"Blowing a Kiss",c:"Romance"},
    {e:"💋",n:"Kiss Mark",c:"Romance"},
    {e:"💑",n:"Couple with Heart",c:"Romance"},
    {e:"💏",n:"Kiss",c:"Romance"},
    {e:"🌹",n:"Rose",c:"Romance"},
    {e:"💍",n:"Ring",c:"Romance"},

    {e:"🐶",n:"Dog",c:"Animals"},
    {e:"🐱",n:"Cat",c:"Animals"},
    {e:"🦁",n:"Lion",c:"Animals"},
    {e:"🐼",n:"Panda",c:"Animals"},
    {e:"🦋",n:"Butterfly",c:"Animals"},
    {e:"🐬",n:"Dolphin",c:"Animals"},

    {e:"🍕",n:"Pizza",c:"Food"},
    {e:"🍔",n:"Burger",c:"Food"},
    {e:"🍟",n:"Fries",c:"Food"},
    {e:"🍩",n:"Donut",c:"Food"},
    {e:"🍫",n:"Chocolate",c:"Food"},
    {e:"🍓",n:"Strawberry",c:"Food"},

    {e:"🌈",n:"Rainbow",c:"Nature"},
    {e:"🌸",n:"Cherry Blossom",c:"Nature"},
    {e:"🌻",n:"Sunflower",c:"Nature"},
    {e:"🌙",n:"Moon",c:"Nature"},
    {e:"☀️",n:"Sun",c:"Nature"},

    {e:"🎉",n:"Party Popper",c:"Activities"},
    {e:"🎮",n:"Video Game",c:"Activities"},
    {e:"⚽",n:"Football",c:"Activities"},
    {e:"🎸",n:"Guitar",c:"Activities"},
    {e:"🏆",n:"Trophy",c:"Activities"},

    {e:"🚗",n:"Car",c:"Travel"},
    {e:"✈️",n:"Airplane",c:"Travel"},
    {e:"🚀",n:"Rocket",c:"Travel"},
    {e:"🏖️",n:"Beach",c:"Travel"},

    {e:"🔥",n:"Fire",c:"Symbols"},
    {e:"✨",n:"Sparkles",c:"Symbols"},
    {e:"💯",n:"Hundred Points",c:"Symbols"},
    {e:"⭐",n:"Star",c:"Symbols"},
    {e:"🎀",n:"Ribbon",c:"Symbols"}
];

const categories = [
    "All", "Smileys", "People", "Hearts",
    "Romance", "Animals", "Food", "Nature",
    "Activities", "Travel", "Symbols"
];

let currentCategory = "All";
let selectedEmoji = null;

const grid = document.getElementById("emojiGrid");
const categoryBox = document.getElementById("categories");
const search = document.getElementById("search");

// Create category buttons
categories.forEach(category => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.textContent = category;

    if (category === "All") btn.classList.add("active");

    btn.addEventListener("click", () => {
        currentCategory = category;

        document.querySelectorAll(".category-btn")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
        displayEmojis();
    });

    categoryBox.appendChild(btn);
});

// Display emoji library
function displayEmojis() {
    grid.innerHTML = "";

    const query = search.value.toLowerCase();

    const filtered = emojis.filter(item => {
        const matchesCategory =
            currentCategory === "All" ||
            item.c === currentCategory;

        const matchesSearch =
            item.n.toLowerCase().includes(query) ||
            item.e.includes(query);

        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.textContent = "No emojis found. Try another search!";
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = "emoji-card";

        const emoji = document.createElement("span");
        emoji.textContent = item.e;

        const name = document.createElement("small");
        name.textContent = item.n;

        card.append(emoji, name);

        card.addEventListener("click", () => {
            selectedEmoji = item;
            document.getElementById("selectedPreview").textContent = item.e;
            document.getElementById("selectedName").textContent = item.n;
        });

        grid.appendChild(card);
    });
}

search.addEventListener("input", displayEmojis);

// Copy selected emoji or face
async function copyText(value) {
    try {
        await navigator.clipboard.writeText(value);
        return true;
    } catch (error) {
        const area = document.createElement("textarea");
        area.value = value;
        document.body.appendChild(area);
        area.select();

        const success = document.execCommand("copy");
        area.remove();
        return success;
    }
}

document.getElementById("copyEmoji").addEventListener("click", async () => {
    if (!selectedEmoji) {
        alert("Please select an emoji first!");
        return;
    }

    const success = await copyText(selectedEmoji.e);
    alert(success ? "Emoji copied! 🎉" : "Copy failed. Please try again.");
});


// ADVANCED FACE CREATOR

const customFace = document.getElementById("customFace");

const skinTone = document.getElementById("skinTone");
const brows = document.getElementById("brows");
const eyeStyle = document.getElementById("eyeStyle");
const noseStyle = document.getElementById("noseStyle");
const mouthStyle = document.getElementById("mouthStyle");
const faceDecoration = document.getElementById("faceDecoration");

function updateFace() {

    customFace.style.backgroundColor = skinTone.value;

    document.getElementById("faceEyebrows").textContent =
        brows.value;

    document.getElementById("faceEyes").textContent =
        eyeStyle.value;

    document.getElementById("faceNose").textContent =
        noseStyle.value;

    document.getElementById("faceMouth").textContent =
        mouthStyle.value;
const accessory = document.getElementById("faceAccessory");

accessory.textContent = faceDecoration.value;

if (
    faceDecoration.value === "👓" ||
    faceDecoration.value === "🕶️"
) {
    accessory.classList.add("wear-on-face");
} else {
    accessory.classList.remove("wear-on-face");
}
   }

// Update face whenever an option changes

[
    skinTone,
    brows,
    eyeStyle,
    noseStyle,
    mouthStyle,
    faceDecoration
].forEach(control => {
    control.addEventListener("change", updateFace);
});

// Random face generator

document.getElementById("randomFace")
.addEventListener("click", () => {

    [
        skinTone,
        brows,
        eyeStyle,
        noseStyle,
        mouthStyle,
        faceDecoration
    ].forEach(control => {

        const randomIndex = Math.floor(
            Math.random() * control.options.length
        );

        control.selectedIndex = randomIndex;
    });

    updateFace();
});

// Reset face

document.getElementById("resetFace")
.addEventListener("click", () => {

    skinTone.selectedIndex = 0;
    brows.selectedIndex = 0;
    eyeStyle.selectedIndex = 0;
    noseStyle.selectedIndex = 0;
    mouthStyle.selectedIndex = 0;
    faceDecoration.selectedIndex = 0;

    updateFace();
});

// Copy face components

document.getElementById("copyFace")
.addEventListener("click", async () => {

    const face =
        brows.value +
        eyeStyle.value +
        noseStyle.value +
        mouthStyle.value +
        faceDecoration.value;

    try {
        await navigator.clipboard.writeText(face);
        alert("Your face components have been copied!");
    } catch (error) {
        alert("Please allow clipboard access and try again.");
    }
});

updateFace();
