# Meal Planning Feature

## Overview
The meal planning feature provides personalized 3-day meal plans for each of the 5 health categories identified by our AI assessment system.

## Health Categories & Meal Plans

### 1. Malnutrition (BMI < 16)
**Daily Calories:** 2800-3000 kcal
**Focus:** High-calorie, nutrient-dense foods
**Key Features:**
- 5 meals per day (3 main + 2 snacks)
- Emphasis on healthy fats and proteins
- Frequent small meals every 2-3 hours
- Includes protein supplements

### 2. Not Healthy (BMI 16-18.5 or BMI > 30)
**Daily Calories:** 2200-2400 kcal
**Focus:** Balanced nutrition with protein emphasis
**Key Features:**
- Protein-rich meals for muscle building
- Healthy fats in every meal
- Whole foods focus
- Strength training recommendations

### 3. Normal (BMI 25-29.9)
**Daily Calories:** 1800-2000 kcal
**Focus:** Portion control and whole foods
**Key Features:**
- Balanced macronutrients
- Reduced processed foods
- Vegetable-forward meals
- Moderate exercise integration

### 4. Healthy (BMI 18.5-24.9)
**Daily Calories:** 1800-2000 kcal
**Focus:** Maintenance and variety
**Key Features:**
- Mediterranean-style meals
- Diverse fruits and vegetables
- Mindful eating practices
- Regular physical activity

### 5. Very Healthy (Optimal BMI for age)
**Daily Calories:** 1900-2100 kcal
**Focus:** Micronutrient diversity
**Key Features:**
- Nutrient-dense superfoods
- Experimental healthy recipes
- Athletic performance support
- Advanced nutrition optimization

## Features

### Daily Meal Structure
Each day includes:
- **Breakfast** - Energy-starting meal
- **Morning Snack** - Mid-morning nutrition
- **Lunch** - Main midday meal
- **Afternoon Snack** - Energy sustainer
- **Dinner** - Evening nutrition
- **Calorie Target** - Daily intake goal

### Nutrition Tips
Every meal plan includes:
- 5 personalized nutrition tips
- Water intake recommendations (2-3L per day)
- Lifestyle guidance
- Professional consultation reminders

### User Experience
- **3-Day Rotation:** Users can view 3 different days of meal plans
- **Easy Navigation:** Switch between days with button controls
- **Visual Design:** Color-coded cards for each meal
- **Mobile Responsive:** Works perfectly on all devices

## How It Works

1. **Complete Health Assessment** → User enters profile data
2. **AI Categorization** → System calculates BMI and determines health category
3. **Save Assessment** → Data stored in localStorage
4. **View Meal Plan** → Click "View My Meal Plan" button
5. **Browse Days** → Switch between Day 1, 2, and 3
6. **Follow Recommendations** → Implement suggested meals

## Technical Implementation

- **Data Storage:** localStorage for persistent user data
- **Routing:** Next.js app router (/meal-plan)
- **State Management:** React hooks (useState, useEffect)
- **Styling:** Tailwind CSS with custom gradients
- **Components:** Custom shadcn/ui components

## Future Enhancements
- Shopping list generator
- Recipe details with cooking instructions
- Calorie tracking integration
- Meal swap options
- PDF export functionality
