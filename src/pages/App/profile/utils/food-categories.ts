export const foodCategories = {
    protein: {
        color: "red-500",
        title: "Proteínas",
        examples: ["carne", "frango", "peixe", "ovos", "tofu"]
    },
    carbs: {
        color: "amber-500",
        title: "Carboidratos",
        examples: ["arroz", "pão", "macarrão", "batata", "mandioca"]
    },
    fats: {
        color: "blue-500",
        title: "Gorduras",
        examples: ["azeite", "óleo", "manteiga", "abacate"]
    },
    vegetables: {
        color: "green-500",
        title: "Vegetais",
        examples: ["alface", "brócolis", "cenoura", "espinafre"]
    },
    fruits: {
        color: "purple-500",
        title: "Frutas",
        examples: ["maçã", "banana", "laranja", "morango"]
    },
    dairy: {
        color: "teal-500",
        title: "Laticínios",
        examples: ["leite", "queijo", "iogurte"]
    },
    other: {
        color: "gray-500",
        title: "Outros",
        examples: []
    }
};

export const identifyFoodCategory = (foodName: string): keyof typeof foodCategories => {
    const lowerName = foodName.toLowerCase();

    for (const [category, info] of Object.entries(foodCategories)) {
        if (info.examples.some(example => lowerName.includes(example))) {
            return category as keyof typeof foodCategories;
        }
    }

    return "protein";
};