// Types
export interface Patient {
    id: string;
    name: string;
    email: string;
    age: number;
    weight: number; // in kg
    height: number; // in cm
    goal?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface FoodOption {
    name: string;
    quantity: string;
}

export interface NutritionInfo {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
}

export interface MealPlan {
    id: string;
    patientId: string;
    title: string;
    startDate: Date;
    breakfast: string;
    breakfastOptions?: FoodOption[];
    lunch: string;
    lunchOptions?: FoodOption[];
    dinner: string;
    dinnerOptions?: FoodOption[];
    snacks: string;
    snackOptions?: FoodOption[];
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    nutritionInfo?: NutritionInfo;
}

// Mock data
let patients: Patient[] = [
    {
        id: "p1",
        name: "Emma Thompson",
        email: "emma@example.com",
        age: 34,
        weight: 65,
        height: 168,
        goal: "Weight loss",
        notes: "Allergic to nuts, prefers vegetarian options",
        createdAt: new Date("2023-10-15"),
        updatedAt: new Date("2023-10-15"),
    },
    {
        id: "p2",
        name: "Michael Chen",
        email: "michael@example.com",
        age: 42,
        weight: 78,
        height: 175,
        goal: "Muscle gain",
        notes: "Trains 4 times a week, needs high protein",
        createdAt: new Date("2023-09-22"),
        updatedAt: new Date("2023-11-05"),
    },
    {
        id: "p3",
        name: "Sophia Rodriguez",
        email: "sophia@example.com",
        age: 28,
        weight: 62,
        height: 164,
        goal: "Balanced nutrition",
        notes: "Works night shifts, needs meal timing advice",
        createdAt: new Date("2023-11-10"),
        updatedAt: new Date("2023-11-10"),
    },
    {
        id: "p4",
        name: "David Williams",
        email: "david@example.com",
        age: 55,
        weight: 92,
        height: 182,
        goal: "Diabetes management",
        notes: "Type 2 diabetes, needs low GI diet",
        createdAt: new Date("2023-08-05"),
        updatedAt: new Date("2023-10-30"),
    },
    {
        id: "p5",
        name: "Olivia Johnson",
        email: "olivia@example.com",
        age: 31,
        weight: 58,
        height: 160,
        goal: "Pregnancy nutrition",
        notes: "Second trimester, iron deficiency",
        createdAt: new Date("2023-10-25"),
        updatedAt: new Date("2023-11-15"),
    },
];

let mealPlans: MealPlan[] = [
    {
        id: "mp1",
        patientId: "p1",
        title: "Weight Loss Plan - Week 1",
        startDate: new Date("2023-10-16"),
        breakfast: "Greek yogurt with berries and a sprinkle of granola. Green tea.",
        breakfastOptions: [
            { name: "Greek yogurt", quantity: "150g" },
            { name: "Mixed berries", quantity: "100g" },
            { name: "Granola", quantity: "30g" },
            { name: "Green tea", quantity: "1 cup" }
        ],
        lunch: "Quinoa salad with mixed vegetables and grilled chicken. Water with lemon.",
        lunchOptions: [
            { name: "Quinoa", quantity: "100g cooked" },
            { name: "Mixed vegetables", quantity: "150g" },
            { name: "Grilled chicken breast", quantity: "120g" },
            { name: "Olive oil dressing", quantity: "1 tbsp" }
        ],
        dinner: "Baked salmon with steamed broccoli and brown rice. Herbal tea.",
        dinnerOptions: [
            { name: "Salmon fillet", quantity: "150g" },
            { name: "Steamed broccoli", quantity: "100g" },
            { name: "Brown rice", quantity: "80g cooked" },
            { name: "Lemon wedge", quantity: "1 slice" }
        ],
        snacks: "Apple slices with a small amount of almond butter. Carrot sticks.",
        snackOptions: [
            { name: "Apple", quantity: "1 medium" },
            { name: "Almond butter", quantity: "15g" },
            { name: "Carrot sticks", quantity: "100g" }
        ],
        notes: "Focus on portion control and staying hydrated throughout the day.",
        createdAt: new Date("2023-10-15"),
        updatedAt: new Date("2023-10-15"),
    },
    {
        id: "mp2",
        patientId: "p1",
        title: "Weight Loss Plan - Week 4",
        startDate: new Date("2023-11-06"),
        breakfast: "Overnight oats with chia seeds and sliced banana. Green tea.",
        breakfastOptions: [
            { name: "Rolled oats", quantity: "50g" },
            { name: "Chia seeds", quantity: "15g" },
            { name: "Banana", quantity: "1 medium" },
            { name: "Almond milk", quantity: "200ml" },
            { name: "Green tea", quantity: "1 cup" },
            { name: "Honey", quantity: "1 tsp" }
        ],
        lunch: "Mediterranean bowl with hummus, falafel, and mixed greens. Water.",
        lunchOptions: [
            { name: "Falafel", quantity: "4 pieces (120g)" },
            { name: "Hummus", quantity: "60g" },
            { name: "Mixed greens", quantity: "100g" },
            { name: "Cherry tomatoes", quantity: "8 pieces" },
            { name: "Cucumber", quantity: "1/2 medium" },
            { name: "Whole wheat pita", quantity: "1/2 piece" }
        ],
        dinner: "Vegetable stir-fry with tofu and a small portion of brown rice. Herbal tea.",
        dinnerOptions: [
            { name: "Firm tofu", quantity: "150g" },
            { name: "Mixed bell peppers", quantity: "100g" },
            { name: "Broccoli", quantity: "80g" },
            { name: "Carrots", quantity: "50g" },
            { name: "Brown rice", quantity: "60g cooked" },
            { name: "Soy sauce", quantity: "1 tbsp" },
            { name: "Ginger", quantity: "1 tsp grated" }
        ],
        snacks: "Mixed berries and a small handful of walnuts. Cucumber slices.",
        snackOptions: [
            { name: "Mixed berries", quantity: "120g" },
            { name: "Walnuts", quantity: "20g" },
            { name: "Cucumber", quantity: "1 medium" },
            { name: "Greek yogurt", quantity: "100g" },
            { name: "Dark chocolate", quantity: "15g (2 squares)" }
        ],
        notes: "Increased protein and reduced carbs. Monitor energy levels.",
        createdAt: new Date("2023-11-05"),
        updatedAt: new Date("2023-11-05"),
    },
    {
        id: "mp3",
        patientId: "p2",
        title: "Muscle Gain Plan - Month 1",
        startDate: new Date("2023-09-23"),
        breakfast: "Protein smoothie with banana, spinach, and protein powder. 3 scrambled eggs with whole grain toast.",
        lunch: "Grilled chicken breast with sweet potato and mixed vegetables. Protein shake.",
        dinner: "Lean beef stir-fry with brown rice and vegetables. Glass of milk.",
        snacks: "Greek yogurt with honey. Protein bar. Handful of mixed nuts.",
        notes: "Aim for 2g of protein per kg of body weight daily. Increase water intake.",
        createdAt: new Date("2023-09-22"),
        updatedAt: new Date("2023-09-22"),
    },
    {
        id: "mp4",
        patientId: "p2",
        title: "Muscle Gain Plan - Month 2",
        startDate: new Date("2023-10-23"),
        breakfast: "6 egg whites with 2 whole eggs, oatmeal with banana and honey. Coffee.",
        lunch: "Turkey and avocado wrap with whole grain tortilla. Large mixed salad with olive oil. Protein shake.",
        dinner: "Grilled salmon with quinoa and roasted vegetables. Glass of milk.",
        snacks: "Cottage cheese with pineapple. Trail mix with dried fruits and nuts. Protein bar.",
        notes: "Increased overall calories. Added more complex carbs post-workout.",
        createdAt: new Date("2023-10-22"),
        updatedAt: new Date("2023-11-05"),
    },
    {
        id: "mp5",
        patientId: "p3",
        title: "Balanced Nutrition Plan",
        startDate: new Date("2023-11-11"),
        breakfast: "Whole grain toast with avocado and poached eggs. Coffee or tea.",
        lunch: "Quinoa bowl with mixed vegetables, chickpeas, and feta cheese. Water.",
        dinner: "Baked chicken with roasted vegetables and a small portion of whole grain pasta. Herbal tea.",
        snacks: "Apple and a small handful of almonds. Greek yogurt.",
        notes: "Prepare meals in advance for night shifts. Focus on consistent meal timing.",
        createdAt: new Date("2023-11-10"),
        updatedAt: new Date("2023-11-10"),
    },
    {
        id: "mp6",
        patientId: "p4",
        title: "Diabetes Management - Initial Plan",
        startDate: new Date("2023-08-06"),
        breakfast: "Steel-cut oatmeal with cinnamon and sliced almonds. No added sugar. Black coffee.",
        lunch: "Grilled chicken salad with olive oil and vinegar dressing. Whole grain crackers. Water.",
        dinner: "Baked fish with steamed non-starchy vegetables and a small portion of quinoa. Herbal tea.",
        snacks: "Small apple with a thin spread of peanut butter. Celery sticks.",
        notes: "Focus on low GI foods. Avoid processed sugars and monitor blood glucose levels.",
        createdAt: new Date("2023-08-05"),
        updatedAt: new Date("2023-08-05"),
    },
    {
        id: "mp7",
        patientId: "p4",
        title: "Diabetes Management - Adjusted Plan",
        startDate: new Date("2023-10-31"),
        breakfast: "Greek yogurt with a small amount of berries and chia seeds. Black coffee.",
        lunch: "Turkey and vegetable soup with a small whole grain roll. Water.",
        dinner: "Grilled chicken with a large portion of roasted non-starchy vegetables. Small portion of sweet potato. Herbal tea.",
        snacks: "Hard-boiled egg. Cucumber slices with hummus.",
        notes: "Further reduced carbohydrate portion sizes. Added more protein to meals. Continue monitoring glucose levels.",
        createdAt: new Date("2023-10-30"),
        updatedAt: new Date("2023-10-30"),
    },
    {
        id: "mp8",
        patientId: "p5",
        title: "Pregnancy Nutrition Plan",
        startDate: new Date("2023-10-26"),
        breakfast: "Spinach and cheese omelet with whole grain toast. Orange juice with prenatal vitamin.",
        lunch: "Lentil soup with a side salad and whole grain bread. Water with lemon.",
        dinner: "Grilled salmon with quinoa and steamed vegetables. Milk.",
        snacks: "Apple with cheese. Yogurt with granola. Trail mix.",
        notes: "Focus on iron-rich foods. Take prenatal vitamins with orange juice to enhance iron absorption.",
        createdAt: new Date("2023-10-25"),
        updatedAt: new Date("2023-11-15"),
    },
];

// Services for CRUD operations
export const patientService = {
    // Get all patients
    getAll: () => [...patients],

    // Search patients
    search: (query: string) => {
        const lowerQuery = query.toLowerCase();
        return patients.filter(
            (patient) =>
                patient.name.toLowerCase().includes(lowerQuery) ||
                patient.goal?.toLowerCase().includes(lowerQuery) ||
                patient.notes?.toLowerCase().includes(lowerQuery)
        );
    },

    // Get patient by ID
    getById: (id: string) => patients.find((patient) => patient.id === id),

    // Create new patient
    create: (patient: Omit<Patient, "id" | "createdAt" | "updatedAt">) => {
        const newPatient: Patient = {
            id: `p${patients.length + 1}`,
            ...patient,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        patients = [...patients, newPatient];
        return newPatient;
    },

    // Update patient
    update: (id: string, data: Partial<Omit<Patient, "id" | "createdAt">>) => {
        patients = patients.map((patient) =>
            patient.id === id
                ? { ...patient, ...data, updatedAt: new Date() }
                : patient
        );
        return patients.find((patient) => patient.id === id);
    },

    // Delete patient
    delete: (id: string) => {
        patients = patients.filter((patient) => patient.id !== id);
        // Also delete associated meal plans
        mealPlans = mealPlans.filter((plan) => plan.patientId !== id);
        return true;
    },
};

export const mealPlanService = {
    // Get all meal plans
    getAll: () => [...mealPlans],

    // Get meal plans for a patient
    getByPatientId: (patientId: string) =>
        mealPlans.filter((plan) => plan.patientId === patientId),

    // Get meal plan by ID
    getById: (id: string) => mealPlans.find((plan) => plan.id === id),

    // Create new meal plan
    create: (plan: Omit<MealPlan, "id" | "createdAt" | "updatedAt">) => {
        const newPlan: MealPlan = {
            id: `mp${mealPlans.length + 1}`,
            ...plan,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        mealPlans = [...mealPlans, newPlan];
        return newPlan;
    },

    // Update meal plan
    update: (id: string, data: Partial<Omit<MealPlan, "id" | "createdAt">>) => {
        mealPlans = mealPlans.map((plan) =>
            plan.id === id ? { ...plan, ...data, updatedAt: new Date() } : plan
        );
        return mealPlans.find((plan) => plan.id === id);
    },

    // Delete meal plan
    delete: (id: string) => {
        mealPlans = mealPlans.filter((plan) => plan.id !== id);
        return true;
    },
};

