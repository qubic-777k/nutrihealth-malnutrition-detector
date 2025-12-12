"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";

interface MealPlan {
  day: string;
  breakfast: string;
  morningSnack: string;
  lunch: string;
  afternoonSnack: string;
  dinner: string;
  calories: string;
}

const mealPlans: Record<string, { plans: MealPlan[]; tips: string[]; waterIntake: string }> = {
  "Malnutrition": {
    waterIntake: "2-2.5 liters per day",
    tips: [
      "Eat small, frequent meals every 2-3 hours",
      "Focus on calorie-dense, nutrient-rich foods",
      "Add healthy fats to every meal",
      "Consider liquid nutrition supplements",
      "Consult with a dietitian for personalized guidance",
    ],
    plans: [
      {
        day: "Day 1",
        breakfast: "Oatmeal with whole milk, banana, honey, almond butter, and chia seeds",
        morningSnack: "Greek yogurt with granola and mixed berries",
        lunch: "Grilled chicken breast with quinoa, avocado, olive oil dressing, and roasted vegetables",
        afternoonSnack: "Smoothie with protein powder, banana, peanut butter, and whole milk",
        dinner: "Salmon fillet with sweet potato, butter, and sautéed spinach",
        calories: "2800-3000",
      },
      {
        day: "Day 2",
        breakfast: "Scrambled eggs (3) with cheese, whole grain toast with avocado, and orange juice",
        morningSnack: "Trail mix with nuts, dried fruits, and dark chocolate",
        lunch: "Beef stir-fry with brown rice, cashews, and mixed vegetables in coconut oil",
        afternoonSnack: "Cottage cheese with honey and walnuts",
        dinner: "Pasta with meat sauce, parmesan cheese, and Caesar salad with dressing",
        calories: "2800-3000",
      },
      {
        day: "Day 3",
        breakfast: "Whole wheat pancakes with maple syrup, butter, and scrambled eggs",
        morningSnack: "Banana with almond butter and whole milk",
        lunch: "Turkey sandwich on whole grain bread with cheese, mayo, avocado, and vegetable soup",
        afternoonSnack: "Protein bar and mixed nuts",
        dinner: "Grilled pork chops with mashed potatoes, gravy, and green beans with butter",
        calories: "2800-3000",
      },
    ],
  },
  "Not Healthy": {
    waterIntake: "2-3 liters per day",
    tips: [
      "Increase protein intake to 1.5g per kg of body weight",
      "Include healthy fats in every meal",
      "Eat nutrient-dense whole foods",
      "Add strength training to build muscle mass",
      "Monitor portion sizes to gradually increase intake",
    ],
    plans: [
      {
        day: "Day 1",
        breakfast: "Greek yogurt parfait with granola, mixed berries, and honey",
        morningSnack: "Apple slices with peanut butter",
        lunch: "Grilled chicken salad with quinoa, avocado, nuts, and olive oil vinaigrette",
        afternoonSnack: "Hummus with whole wheat pita and vegetables",
        dinner: "Baked cod with brown rice, roasted Brussels sprouts, and olive oil",
        calories: "2200-2400",
      },
      {
        day: "Day 2",
        breakfast: "Whole grain toast with scrambled eggs, avocado, and tomatoes",
        morningSnack: "Mixed nuts and dried cranberries",
        lunch: "Lentil soup with whole grain bread and side salad",
        afternoonSnack: "Protein smoothie with banana and spinach",
        dinner: "Turkey meatballs with whole wheat pasta and marinara sauce",
        calories: "2200-2400",
      },
      {
        day: "Day 3",
        breakfast: "Omelette with vegetables, cheese, and whole grain toast",
        morningSnack: "Cottage cheese with pineapple",
        lunch: "Tuna salad wrap with whole wheat tortilla and mixed greens",
        afternoonSnack: "Energy balls with oats, dates, and almond butter",
        dinner: "Grilled steak with sweet potato and steamed broccoli",
        calories: "2200-2400",
      },
    ],
  },
  "Normal": {
    waterIntake: "2-2.5 liters per day",
    tips: [
      "Maintain balanced macronutrients (40% carbs, 30% protein, 30% fats)",
      "Focus on whole, unprocessed foods",
      "Control portion sizes",
      "Include regular physical activity",
      "Stay consistent with meal timing",
    ],
    plans: [
      {
        day: "Day 1",
        breakfast: "Steel-cut oatmeal with berries, walnuts, and a drizzle of honey",
        morningSnack: "Carrot sticks with hummus",
        lunch: "Grilled chicken breast with mixed greens, cherry tomatoes, cucumber, and balsamic dressing",
        afternoonSnack: "Apple with a handful of almonds",
        dinner: "Baked salmon with quinoa and steamed asparagus",
        calories: "1800-2000",
      },
      {
        day: "Day 2",
        breakfast: "Greek yogurt with sliced banana and a tablespoon of chia seeds",
        morningSnack: "Orange and a small handful of cashews",
        lunch: "Turkey and avocado wrap with whole wheat tortilla and side of vegetable soup",
        afternoonSnack: "Celery with almond butter",
        dinner: "Lean beef with roasted sweet potato and green beans",
        calories: "1800-2000",
      },
      {
        day: "Day 3",
        breakfast: "Two-egg omelette with spinach, mushrooms, and whole grain toast",
        morningSnack: "Pear with string cheese",
        lunch: "Quinoa bowl with chickpeas, roasted vegetables, and tahini dressing",
        afternoonSnack: "Rice cakes with cottage cheese",
        dinner: "Grilled chicken with brown rice and stir-fried vegetables",
        calories: "1800-2000",
      },
    ],
  },
  "Healthy": {
    waterIntake: "2-3 liters per day",
    tips: [
      "Maintain current eating patterns",
      "Focus on variety in fruits and vegetables",
      "Stay active with regular exercise",
      "Practice mindful eating",
      "Get adequate sleep for optimal metabolism",
    ],
    plans: [
      {
        day: "Day 1",
        breakfast: "Smoothie bowl with mixed berries, banana, spinach, topped with granola and seeds",
        morningSnack: "Fresh fruit salad",
        lunch: "Mediterranean salad with grilled chicken, feta, olives, and whole grain pita",
        afternoonSnack: "Veggie sticks with guacamole",
        dinner: "Grilled fish tacos with cabbage slaw and black beans",
        calories: "1800-2000",
      },
      {
        day: "Day 2",
        breakfast: "Whole grain toast with avocado, poached eggs, and tomatoes",
        morningSnack: "Mixed berries with Greek yogurt",
        lunch: "Buddha bowl with tofu, brown rice, edamame, and various vegetables",
        afternoonSnack: "Handful of nuts and an apple",
        dinner: "Lean turkey breast with roasted vegetables and quinoa",
        calories: "1800-2000",
      },
      {
        day: "Day 3",
        breakfast: "Overnight oats with almond milk, chia seeds, and fresh fruit",
        morningSnack: "Cucumber slices with tzatziki",
        lunch: "Chicken and vegetable stir-fry with brown rice",
        afternoonSnack: "Dark chocolate square with strawberries",
        dinner: "Baked cod with Mediterranean vegetables and couscous",
        calories: "1800-2000",
      },
    ],
  },
  "Very Healthy": {
    waterIntake: "2.5-3 liters per day",
    tips: [
      "Continue your excellent nutrition habits",
      "Experiment with new healthy recipes",
      "Focus on micronutrient diversity",
      "Maintain regular physical activity",
      "Listen to your body's hunger and fullness cues",
    ],
    plans: [
      {
        day: "Day 1",
        breakfast: "Protein pancakes with fresh berries and a drizzle of pure maple syrup",
        morningSnack: "Green smoothie with kale, apple, and ginger",
        lunch: "Poke bowl with tuna, brown rice, edamame, avocado, and seaweed",
        afternoonSnack: "Apple slices with almond butter",
        dinner: "Herb-crusted chicken with roasted rainbow vegetables and sweet potato",
        calories: "1900-2100",
      },
      {
        day: "Day 2",
        breakfast: "Acai bowl topped with granola, coconut, and tropical fruits",
        morningSnack: "Trail mix with seeds and dried fruits",
        lunch: "Quinoa salad with grilled shrimp, mango, and citrus dressing",
        afternoonSnack: "Beet and carrot sticks with hummus",
        dinner: "Grilled salmon with asparagus and wild rice pilaf",
        calories: "1900-2100",
      },
      {
        day: "Day 3",
        breakfast: "Veggie scramble with eggs, peppers, onions, mushrooms, and whole grain toast",
        morningSnack: "Chia pudding with berries",
        lunch: "Mediterranean wrap with grilled vegetables, falafel, and tahini sauce",
        afternoonSnack: "Greek yogurt with honey and walnuts",
        dinner: "Lean steak with chimichurri sauce, roasted Brussels sprouts, and quinoa",
        calories: "1900-2100",
      },
    ],
  },
};

export default function MealPlanPage() {
  const router = useRouter();
  const [userCategory, setUserCategory] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.push("/");
      return;
    }

    // Get user's health category from localStorage
    const profileData = localStorage.getItem(`profile_${currentUser}`);
    const assessmentData = localStorage.getItem(`assessment_${currentUser}`);

    if (assessmentData) {
      const assessment = JSON.parse(assessmentData);
      setUserCategory(assessment.category);
    }
  }, [router]);

  const currentMealPlan = userCategory && mealPlans[userCategory];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Your Meal Plan</h1>
            <p className="text-slate-600 mt-1">Personalized nutrition guide for optimal health</p>
          </div>

        {!currentMealPlan ? (
          <Card className="border-0 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 mb-4">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">No Meal Plan Available</h2>
              <p className="text-slate-600 mb-6">
                Please complete your health assessment first to get a personalized meal plan.
              </p>
              <Button onClick={() => router.push("/profile")}>
                Go to Profile
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl">🍽️</span>
                  {userCategory} Meal Plan
                </CardTitle>
                <CardDescription>
                  Customized nutrition plan based on your health assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Daily Nutrition Tips</h3>
                  <ul className="space-y-2">
                    {currentMealPlan.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-emerald-600 mt-0.5">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-emerald-200">
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold">💧 Water Intake:</span> {currentMealPlan.waterIntake}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                  {currentMealPlan.plans.map((plan, index) => (
                    <Button
                      key={index}
                      variant={selectedDay === index ? "default" : "outline"}
                      onClick={() => setSelectedDay(index)}
                      className="flex-shrink-0"
                    >
                      {plan.day}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Breakfast", meal: currentMealPlan.plans[selectedDay].breakfast, icon: "🌅" },
                { title: "Morning Snack", meal: currentMealPlan.plans[selectedDay].morningSnack, icon: "☕" },
                { title: "Lunch", meal: currentMealPlan.plans[selectedDay].lunch, icon: "🌞" },
                { title: "Afternoon Snack", meal: currentMealPlan.plans[selectedDay].afternoonSnack, icon: "🥤" },
                { title: "Dinner", meal: currentMealPlan.plans[selectedDay].dinner, icon: "🌙" },
                { title: "Daily Calories", meal: `Target: ${currentMealPlan.plans[selectedDay].calories} kcal`, icon: "📊" },
              ].map((item, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{item.icon}</span>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.meal}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Important Note</h3>
                    <p className="text-sm text-white/90 leading-relaxed">
                      This meal plan is a general guide based on your health category. For personalized nutrition advice,
                      especially if you have specific health conditions or dietary restrictions, please consult with a
                      registered dietitian or healthcare professional.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
