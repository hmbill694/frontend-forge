const randomWords = [
    "maple",
    "father",
    "gnarly",
    "yuge",
    "ringo",
    "purple",
    "large",
    "bigtime",
    "icey",
    "ingo",
    "aquatic",
    "hole",
    "wood",
    "elm",
    "berch",
    "oak",
    "spruce",
    "marble",
    "granite",
    "basalt",
    "areas",
    "oopsy",
    "magma",
    "lava",
    "freedom",
    "velvet",
    "deer",
    "bear",
    "goat",
    "chicken",
    "horse",
    "cow"
]

export const generateDocName = () => {
    const min = Math.ceil(0);
    const max = Math.floor(randomWords.length - 1);

    const words = Array.from({ length: 3 }, () => randomWords[Math.floor(Math.random() * (max - min + 1) + min)] ?? "fiddle")
    return words.join("-")
}