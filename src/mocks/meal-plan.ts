export const mockMealPlans = [
  {
    id: "1",
    patientId: "1",
    title: "Plano Semanal - Emagrecimento",
    startDate: new Date(),
    breakfast: "Ovos mexidos, pão integral, café preto",
    lunch: "Frango grelhado, arroz integral, legumes",
    dinner: "Peixe assado, salada verde",
    snacks: "Frutas e castanhas",
    notes: "Evitar carboidratos à noite",
    nutritionInfo: {
      calories: 2000,
      protein: 150,
      carbs: 200,
      fats: 70
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    patientId: "1",
    title: "Plano Mensal - Ganho de Massa",
    startDate: new Date(),
    breakfast: "Whey protein, banana, aveia",
    lunch: "Carne vermelha, arroz, feijão, legumes",
    dinner: "Omelete com queijo, salada",
    snacks: "Batata doce, frango grelhado",
    notes: "Aumentar proteína gradualmente",
    nutritionInfo: {
      calories: 2500,
      protein: 180,
      carbs: 250,
      fats: 80
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // ... outros planos mockados
]; 