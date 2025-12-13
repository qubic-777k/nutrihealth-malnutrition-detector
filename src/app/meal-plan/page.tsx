"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

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
    waterIntake: "2-2.5 liters per day (sip slowly throughout the day)",
    tips: [
      "Prioritize nutrient-density: Choose foods rich in proteins and healthy fats (avocado, nuts, whole milk) to maximize calories in smaller portions.",
      "Frequency matters: Eat small meals every 2-3 hours instead of 3 large meals to prevent bloating and ensure steady energy absorption.",
      "Hydration strategy: Avoid drinking large amounts of water right before meals to prevent feeling full too quickly.",
      "Protein fortification: Add powdered milk, protein powder, or nut butters to smoothies, oats, and soups for an extra protein boost.",
      "Medical consultation: Regularly consult with a dietitian to monitor refeeding syndrome risks and adjust caloric intake gradually.",
    ],
    plans: [
      {
        day: "Day 1",
        breakfast: "Oatmeal cooked with whole milk, banana slices, honey, almond butter, and chia seeds",
        morningSnack: "Full-fat Greek yogurt with granola, mixed berries, and a drizzle of honey",
        lunch: "Grilled chicken breast with quinoa, half an avocado, olive oil dressing, and roasted vegetables",
        afternoonSnack: "High-protein smoothie (protein powder, banana, peanut butter, whole milk)",
        dinner: "Pan-seared Salmon fillet with mashed sweet potato (with butter) and sautéed spinach",
        calories: "2800-3000",
      },
      {
        day: "Day 2",
        breakfast: "Scrambled eggs (3) with cheddar cheese, whole grain toast with smashed avocado, and orange juice",
        morningSnack: "Trail mix with cashews, walnuts, dried cranberries, and dark chocolate chips",
        lunch: "Beef stir-fry with brown rice, sesame seeds, cashews, and mixed vegetables cooked in coconut oil",
        afternoonSnack: "Cottage cheese bowl with honey, walnuts, and sliced peaches",
        dinner: "Whole wheat pasta with hearty meat sauce, parmesan cheese, and a side Caesar salad",
        calories: "2800-3000",
      },
      {
        day: "Day 3",
        breakfast: "Whole wheat pancakes topped with maple syrup, butter, and a side of scrambled eggs",
        morningSnack: "Banana slices with almond butter and a glass of whole milk",
        lunch: "Turkey club sandwich on whole grain bread with cheese, mayo, avocado, and cream of vegetable soup",
        afternoonSnack: "Energy protein bar and a handful of mixed nuts",
        dinner: "Grilled pork chops with buttery mashed potatoes, gravy, and steamed green beans",
        calories: "2800-3000",
      },
      {
        day: "Day 4",
        breakfast: "Breakfast burrito with eggs, black beans, cheese, avocado, and salsa",
        morningSnack: "Apple slices dipped in peanut butter and a glass of milk",
        lunch: "Chicken pasta salad with pesto, mozzarella pearls, and cherry tomatoes",
        afternoonSnack: "Hard-boiled eggs (2) and a handful of crackers",
        dinner: "Beef stew with potatoes, carrots, and a dinner roll with butter",
        calories: "2800-3000",
      },
      {
        day: "Day 5",
        breakfast: "French toast made with whole grain bread, topped with berries and whipped cream",
        morningSnack: "Cheese stick and a handful of almonds",
        lunch: "Tuna melt sandwich with cheddar cheese and a side of potato salad",
        afternoonSnack: "Mango smoothie made with coconut milk and protein powder",
        dinner: "Roast chicken thighs with skin-on, quinoa pilaf, and roasted broccoli",
        calories: "2800-3000",
      },
      {
        day: "Day 6",
        breakfast: "Omelette with spinach, mushrooms, ham, and swiss cheese",
        morningSnack: "Full-fat yogurt with pumpkin seeds and dried apricots",
        lunch: "Burger on a whole wheat bun with avocado, cheese, lettuce, and sweet potato fries",
        afternoonSnack: "Hummus with pita bread and olive oil",
        dinner: "Shrimp scampi with linguine and garlic bread",
        calories: "2800-3000",
      },
      {
        day: "Day 7",
        breakfast: "Bagel with cream cheese and smoked salmon",
        morningSnack: "Smoothie with avocado, spinach, banana, and apple juice",
        lunch: "Meatloaf with gravy, mashed cauliflower, and peas",
        afternoonSnack: "Dark chocolate and a glass of whole milk",
        dinner: "Baked macaroni and cheese with broccoli and diced chicken",
        calories: "2800-3000",
      },
    ],
  },
  "Not Healthy": {
    waterIntake: "2-3 liters per day",
    tips: [
      "Macronutrient balance: Aim to increase protein intake to 1.5g per kg of body weight to support tissue repair.",
      "Fat selection: Replace trans fats and processed oils with healthy fats like olive oil, avocado, and nuts.",
      "Whole foods focus: Gradually reduce processed foods and replace them with nutrient-dense whole grains and vegetables.",
      "Muscle building: Combine this diet with resistance/strength training to build muscle mass rather than just fat.",
      "Consistent timing: Establish regular meal times to regulate blood sugar levels and metabolism.",
    ],
    plans: [
      {
        day: "Day 1",
        breakfast: "Greek yogurt parfait with granola, mixed berries, and honey",
        morningSnack: "Apple slices with natural peanut butter",
        lunch: "Grilled chicken salad with quinoa, avocado, nuts, and olive oil vinaigrette",
        afternoonSnack: "Hummus with whole wheat pita and carrot sticks",
        dinner: "Baked cod with brown rice, roasted Brussels sprouts, and olive oil",
        calories: "2200-2400",
      },
      {
        day: "Day 2",
        breakfast: "Whole grain toast topped with scrambled eggs, avocado slices, and cherry tomatoes",
        morningSnack: "Mixed nuts (unsalted) and dried cranberries",
        lunch: "Hearty lentil soup with a slice of whole grain bread and a green side salad",
        afternoonSnack: "Protein smoothie with banana, spinach, and almond milk",
        dinner: "Turkey meatballs served with whole wheat pasta and marinara sauce",
        calories: "2200-2400",
      },
      {
        day: "Day 3",
        breakfast: "Veggie omelette with peppers, onions, cheese, and a side of whole grain toast",
        morningSnack: "Cottage cheese with fresh pineapple chunks",
        lunch: "Tuna salad wrap with whole wheat tortilla and mixed greens",
        afternoonSnack: "Energy balls made with oats, dates, and almond butter",
        dinner: "Grilled lean steak with a baked sweet potato and steamed broccoli",
        calories: "2200-2400",
      },
      {
        day: "Day 4",
        breakfast: "Overnight oats with chia seeds, maple syrup, and blueberries",
        morningSnack: "Hard-boiled egg and an orange",
        lunch: "Chicken and vegetable stir-fry with brown rice",
        afternoonSnack: "Greek yogurt with flaxseeds",
        dinner: "Baked salmon with quinoa and asparagus",
        calories: "2200-2400",
      },
      {
        day: "Day 5",
        breakfast: "Smoothie bowl with spinach, banana, protein powder, and topped with granola",
        morningSnack: "Pear slices with a handful of walnuts",
        lunch: "Turkey burger (no bun) with a large side salad and vinaigrette",
        afternoonSnack: "Edamame beans (steamed)",
        dinner: "Grilled shrimp skewers with couscous and roasted peppers",
        calories: "2200-2400",
      },
      {
        day: "Day 6",
        breakfast: "Whole wheat bagel with avocado and poached egg",
        morningSnack: "Berry protein shake",
        lunch: "Bean burrito bowl with brown rice, salsa, and guacamole",
        afternoonSnack: "Rice cakes with almond butter",
        dinner: "Roast chicken with root vegetables (carrots, parsnips)",
        calories: "2200-2400",
      },
      {
        day: "Day 7",
        breakfast: "Scrambled tofu with turmeric and spinach on toast",
        morningSnack: "Banana and a few brazil nuts",
        lunch: "Grilled fish tacos with cabbage slaw and corn tortillas",
        afternoonSnack: "Vegetable sticks with guacamole",
        dinner: "Beef Bolognese with zucchini noodles or whole wheat pasta",
        calories: "2200-2400",
      },
    ],
  },
  "Normal": {
    waterIntake: "2-2.5 liters per day",
    tips: [
      "Balanced Plate: Maintain a balanced macronutrient distribution (approx. 40% carbs, 30% protein, 30% fats).",
      "Quality over quantity: Focus on whole, unprocessed foods to maintain stable energy levels throughout the day.",
      "Portion control: Be mindful of portion sizes to maintain your current healthy weight without feeling deprived.",
      "Active lifestyle: Support this diet with regular physical activity (cardio and strength) 3-4 times a week.",
      "Consistency is key: Try not to skip meals, as this helps maintain a healthy metabolism.",
    ],
    plans: [
      {
        day: "Day 1",
        breakfast: "Steel-cut oatmeal with fresh berries, walnuts, and a drizzle of honey",
        morningSnack: "Carrot sticks with 2 tbsp of hummus",
        lunch: "Grilled chicken breast with mixed greens, cucumber, and balsamic dressing",
        afternoonSnack: "One medium apple with a small handful of almonds",
        dinner: "Baked salmon with a side of quinoa and steamed asparagus",
        calories: "1800-2000",
      },
      {
        day: "Day 2",
        breakfast: "Greek yogurt with sliced banana and a tablespoon of chia seeds",
        morningSnack: "One orange and a small handful of cashews",
        lunch: "Turkey and avocado wrap with whole wheat tortilla and vegetable soup",
        afternoonSnack: "Celery sticks with almond butter",
        dinner: "Lean beef strips with roasted sweet potato and green beans",
        calories: "1800-2000",
      },
      {
        day: "Day 3",
        breakfast: "Two-egg omelette with spinach, mushrooms, and a slice of whole grain toast",
        morningSnack: "Fresh pear with string cheese",
        lunch: "Quinoa bowl with chickpeas, roasted vegetables, and tahini dressing",
        afternoonSnack: "Rice cakes with cottage cheese",
        dinner: "Grilled chicken with brown rice and stir-fried vegetables",
        calories: "1800-2000",
      },
      {
        day: "Day 4",
        breakfast: "Whole grain toast with peanut butter and banana slices",
        morningSnack: "Hard-boiled egg",
        lunch: "Spinach salad with grilled shrimp, feta cheese, and vinaigrette",
        afternoonSnack: "A peach and a few walnuts",
        dinner: "Vegetarian chili with kidney beans and a side of brown rice",
        calories: "1800-2000",
      },
      {
        day: "Day 5",
        breakfast: "Berry smoothie made with water or almond milk and protein powder",
        morningSnack: "Cucumber slices with tzatziki dip",
        lunch: "Chicken sandwich on whole wheat bread with lettuce and tomato",
        afternoonSnack: "Small box of raisins and sunflower seeds",
        dinner: "Baked cod with mashed cauliflower and peas",
        calories: "1800-2000",
      },
      {
        day: "Day 6",
        breakfast: "Scrambled eggs with diced peppers and onions",
        morningSnack: "Fruit salad (melon, berries, grapes)",
        lunch: "Lentil soup with a whole grain roll",
        afternoonSnack: "Yogurt with a sprinkle of granola",
        dinner: "Grilled turkey burgers with a side salad and sweet potato wedges",
        calories: "1800-2000",
      },
      {
        day: "Day 7",
        breakfast: "Pancakes made with oat flour topped with fresh strawberries",
        morningSnack: "A plum and pistachios",
        lunch: "Caesar salad with grilled chicken (light dressing)",
        afternoonSnack: "Baby carrots and guacamole",
        dinner: "Stir-fried tofu with broccoli, snap peas, and brown rice",
        calories: "1800-2000",
      },
    ],
  },
  "Healthy": {
    waterIntake: "2-3 liters per day",
    tips: [
      "Sustain and optimize: Maintain your current excellent eating patterns while exploring new healthy foods.",
      "Eat the rainbow: Focus on variety in fruits and vegetables to ensure a wide intake of phytonutrients and antioxidants.",
      "Mindful Eating: Practice eating slowly and without distractions to better recognize hunger and fullness cues.",
      "Holistic health: Pair your nutrition with regular exercise and stress management techniques.",
      "Sleep hygiene: Ensure you get adequate sleep (7-9 hours) to support optimal metabolism and recovery.",
    ],
    plans: [
      {
        day: "Day 1",
        breakfast: "Smoothie bowl with mixed berries, banana, spinach, topped with granola and seeds",
        morningSnack: "Fresh seasonal fruit salad",
        lunch: "Mediterranean salad with grilled chicken, feta, olives, and whole grain pita",
        afternoonSnack: "Veggie sticks (bell peppers, cucumber) with guacamole",
        dinner: "Grilled fish tacos with red cabbage slaw and black beans side",
        calories: "1800-2000",
      },
      {
        day: "Day 2",
        breakfast: "Whole grain toast with smashed avocado, poached eggs, and cherry tomatoes",
        morningSnack: "Mixed berries with a dollop of Greek yogurt",
        lunch: "Buddha bowl with tofu, brown rice, edamame, shredded carrots, and dressing",
        afternoonSnack: "Handful of almonds and an apple",
        dinner: "Lean turkey breast with roasted Mediterranean vegetables and quinoa",
        calories: "1800-2000",
      },
      {
        day: "Day 3",
        breakfast: "Overnight oats prepared with almond milk, chia seeds, and fresh mango",
        morningSnack: "Cucumber slices with tzatziki",
        lunch: "Chicken and vegetable stir-fry with brown rice (light soy sauce)",
        afternoonSnack: "Dark chocolate square (70%+) with strawberries",
        dinner: "Baked cod with lemon, herbs, Mediterranean vegetables, and couscous",
        calories: "1800-2000",
      },
      {
        day: "Day 4",
        breakfast: "Spinach and mushroom egg white frittata",
        morningSnack: "Grapefruit half",
        lunch: "Lentil salad with tomatoes, cucumber, parsley, and lemon dressing",
        afternoonSnack: "Rice cake with almond butter",
        dinner: "Grilled salmon with bok choy and wild rice",
        calories: "1800-2000",
      },
      {
        day: "Day 5",
        breakfast: "Chia pudding made with coconut milk and topped with kiwi",
        morningSnack: "Boiled egg",
        lunch: "Turkey and hummus wrap with plenty of greens",
        afternoonSnack: "Bell pepper strips",
        dinner: "Stuffed bell peppers with ground turkey, black beans, and corn",
        calories: "1800-2000",
      },
      {
        day: "Day 6",
        breakfast: "Whole wheat waffles with fresh blueberries and yogurt",
        morningSnack: "A handful of pumpkin seeds",
        lunch: "Shrimp and avocado salad with citrus dressing",
        afternoonSnack: "Orange slices",
        dinner: "Roasted vegetable pasta with marinara sauce",
        calories: "1800-2000",
      },
      {
        day: "Day 7",
        breakfast: "Scrambled eggs with smoked salmon and chives",
        morningSnack: "Green smoothie (kale, apple, lemon)",
        lunch: "Quinoa salad with roasted chickpeas and sweet potato",
        afternoonSnack: "Walnuts and dried apricots",
        dinner: "Grilled chicken skewers with tzatziki and Greek salad",
        calories: "1800-2000",
      },
    ],
  },
  "Very Healthy": {
    waterIntake: "2.5-3 liters per day",
    tips: [
      "Elite Nutrition: Continue your excellent habits, focusing on nutrient timing around workouts if applicable.",
      "Culinary adventure: Experiment with new healthy recipes and exotic vegetables to keep meals exciting.",
      "Micronutrient focus: Ensure diversity in your diet to cover all vitamin and mineral needs naturally.",
      "Body cues: Listen closely to your body's hunger and fullness cues to maintain your ideal composition.",
      "Performance fuel: Choose complex carbs before activity and protein afterwards for recovery.",
    ],
    plans: [
      {
        day: "Day 1",
        breakfast: "Protein pancakes (oats, egg whites, protein powder) with fresh berries",
        morningSnack: "Green smoothie with kale, green apple, ginger, and lemon",
        lunch: "Poke bowl with raw tuna, brown rice, edamame, avocado, and seaweed salad",
        afternoonSnack: "Apple slices with almond butter",
        dinner: "Herb-crusted chicken breast with roasted rainbow carrots and sweet potato",
        calories: "1900-2100",
      },
      {
        day: "Day 2",
        breakfast: "Acai bowl topped with granola, unsweetened coconut flakes, and tropical fruits",
        morningSnack: "Trail mix with pumpkin seeds and dried goji berries",
        lunch: "Quinoa salad with grilled shrimp, mango chunks, and citrus dressing",
        afternoonSnack: "Beet and carrot sticks with homemade hummus",
        dinner: "Grilled salmon fillet with steamed asparagus and wild rice pilaf",
        calories: "1900-2100",
      },
      {
        day: "Day 3",
        breakfast: "Veggie scramble with eggs, bell peppers, onions, mushrooms, and whole grain toast",
        morningSnack: "Chia seed pudding made with almond milk and raspberries",
        lunch: "Mediterranean wrap with grilled vegetables, falafel, and tahini sauce",
        afternoonSnack: "Greek yogurt with a drizzle of honey and walnuts",
        dinner: "Lean steak strips with chimichurri sauce, roasted Brussels sprouts, and quinoa",
        calories: "1900-2100",
      },
      {
        day: "Day 4",
        breakfast: "Smoked salmon and avocado on rye crispbread",
        morningSnack: "Celery sticks with cashew butter",
        lunch: "Kale salad with roasted chickpeas, lemon tahini dressing, and hemp seeds",
        afternoonSnack: "Protein shake with berries",
        dinner: "Baked trout with almond slivers and green beans",
        calories: "1900-2100",
      },
      {
        day: "Day 5",
        breakfast: "Tofu scramble with nutritional yeast, spinach, and tomatoes",
        morningSnack: "A handful of macadamia nuts",
        lunch: "Grilled chicken breast with tabouleh salad",
        afternoonSnack: "Sliced pear with ricotta cheese",
        dinner: "Turkey chili with beans and a side of cornbread",
        calories: "1900-2100",
      },
      {
        day: "Day 6",
        breakfast: "Poached eggs over sautéed kale and mushrooms",
        morningSnack: "Fresh papaya slices with lime juice",
        lunch: "Sushi roll (brown rice, avocado, cucumber, salmon)",
        afternoonSnack: "Edamame beans",
        dinner: "Roasted duck breast with red cabbage and roasted potatoes",
        calories: "1900-2100",
      },
      {
        day: "Day 7",
        breakfast: "Oatmeal with flaxseeds, blueberries, and a scoop of protein powder",
        morningSnack: "Cottage cheese with cherry tomatoes",
        lunch: "Vietnamense fresh spring rolls (shrimp, herbs, vermicelli) with peanut dip",
        afternoonSnack: "Dark chocolate and almonds",
        dinner: "Grilled mahi-mahi with mango salsa and black rice",
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
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <span>🍽️</span>
                    {userCategory} Meal Plan
                  </CardTitle>
                  <CardDescription>
                    Customized nutrition plan based on your health assessment
                  </CardDescription>
                </div>
                
                <Link href="/chat">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 shadow-md transition-all hover:scale-105">
                    <MessageCircle className="w-4 h-4" />
                    Chat With Doctor
                  </Button>
                </Link>

              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Daily Nutrition Tips</h3>
                  <ul className="space-y-2">
                    {currentMealPlan.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-emerald-600 mt-0.5 shrink-0">✓</span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-emerald-200">
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold">💧 Water Intake:</span> {currentMealPlan.waterIntake}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
                  {currentMealPlan.plans?.map((plan, index) => (
                    <Button
                      key={index}
                      variant={selectedDay === index ? "default" : "outline"}
                      onClick={() => setSelectedDay(index)}
                      className={`flex-shrink-0 transition-all ${selectedDay === index ? "bg-emerald-600 hover:bg-emerald-700" : "hover:text-emerald-600 hover:border-emerald-200"}`}
                    >
                      {plan.day}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Breakfast", meal: currentMealPlan.plans[selectedDay]?.breakfast, icon: "🌅" },
                { title: "Morning Snack", meal: currentMealPlan.plans[selectedDay]?.morningSnack, icon: "☕" },
                { title: "Lunch", meal: currentMealPlan.plans[selectedDay]?.lunch, icon: "🌞" },
                { title: "Afternoon Snack", meal: currentMealPlan.plans[selectedDay]?.afternoonSnack, icon: "🥤" },
                { title: "Dinner", meal: currentMealPlan.plans[selectedDay]?.dinner, icon: "🌙" },
                { title: "Daily Calories", meal: `Target: ${currentMealPlan.plans[selectedDay]?.calories} kcal`, icon: "📊" },
              ].map((item, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.meal || "Not specified"}</p>
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