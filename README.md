# NutriHealth - Malnutrition Detection System

<div align="center">

  **AI-Powered Nutrition & Health Assessment Platform**

  [Live Demo](https://same-xioxavpgtjy-latest.netlify.app) | [Documentation](#features)

</div>

## Overview

NutriHealth is an intelligent web application that helps users detect malnutrition risks and provides personalized nutrition recommendations. Using AI-powered health assessment based on BMI calculations and age factors, the system categorizes users into 5 health levels and delivers customized meal plans and dietary advice.

## Features

### 🔐 Authentication System
- Secure sign in/sign up functionality
- User session management with localStorage
- Password-protected accounts

### 👤 Health Profile Management
- Personal information input (Name, Age, Height, Weight)
- Persistent data storage
- Easy profile updates

### 🤖 AI Health Assessment
The system intelligently categorizes users into 5 health levels:
- **Very Healthy** - Optimal BMI for age group
- **Healthy** - Normal BMI range
- **Normal** - Slightly above ideal
- **Not Healthy** - Concerning BMI levels
- **Malnutrition** - Severe underweight (BMI < 16)

### 📊 Personalized Recommendations
Each health category provides:
- Detailed health assessment explanation
- 5-7 specific, actionable diet and lifestyle recommendations
- Color-coded visual feedback
- Customized advice based on BMI and health status

### 🍽️ Comprehensive Meal Plans
- **3-day meal plans** for each health category (15 total meal plans)
- **5 meals per day**: Breakfast, Morning Snack, Lunch, Afternoon Snack, Dinner
- Detailed nutrition tips and guidelines
- Water intake recommendations (2-3L per day)
- Daily calorie targets
- Category-specific dietary strategies

### 🧭 Navigation System
- Easy page switching between Profile and Meal Plan
- Responsive navigation bar
- Quick access to all features

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (customized)
- **State Management**: React Hooks + localStorage
- **Package Manager**: Bun
- **Deployment**: Netlify (Dynamic site)

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/qubic-777k/nutrihealth-malnutrition-detector.git
cd nutrihealth-malnutrition-detector
```

2. Install dependencies
```bash
bun install
# or
npm install
```

3. Run the development server
```bash
bun dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
bun run build
bun start
```

## Project Structure

```
malnutrition-detector/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Authentication page
│   │   ├── profile/
│   │   │   └── page.tsx          # Profile & health assessment
│   │   └── meal-plan/
│   │       └── page.tsx          # Meal planning page
│   ├── components/
│   │   ├── Navigation.tsx        # Global navigation
│   │   └── ui/                   # UI components
│   └── lib/
│       └── utils.ts              # Utility functions
├── .same/                        # Project documentation
├── netlify.toml                  # Deployment config
└── package.json
```

## How to Use

1. **Sign Up**: Create an account with email and password
2. **Enter Profile**: Input your name, age, height (cm), and weight (kg)
3. **Get Assessment**: Click "Analyze My Health" to receive your health report
4. **View Meal Plan**: Access your personalized 3-day nutrition guide
5. **Follow Recommendations**: Implement the suggested diet and lifestyle changes

## Health Categories Explained

### Malnutrition (BMI < 16)
- **Focus**: High-calorie, nutrient-dense foods
- **Daily Calories**: 2800-3000 kcal
- **Strategy**: Frequent small meals, healthy fats, protein supplements

### Not Healthy (BMI 16-18.5 or BMI > 30)
- **Focus**: Balanced nutrition with protein emphasis
- **Daily Calories**: 2200-2400 kcal
- **Strategy**: Muscle building, whole foods, portion awareness

### Normal (BMI 25-29.9)
- **Focus**: Portion control and whole foods
- **Daily Calories**: 1800-2000 kcal
- **Strategy**: Reduce processed foods, increase vegetables

### Healthy (BMI 18.5-24.9)
- **Focus**: Maintenance and variety
- **Daily Calories**: 1800-2000 kcal
- **Strategy**: Mediterranean diet, diverse nutrients

### Very Healthy (Optimal BMI for age)
- **Focus**: Micronutrient diversity
- **Daily Calories**: 1900-2100 kcal
- **Strategy**: Superfoods, performance nutrition

## Live Demo

Visit the live application: [https://same-xioxavpgtjy-latest.netlify.app](https://same-xioxavpgtjy-latest.netlify.app)

## Future Enhancements

- Progress tracking with charts for weight/BMI changes over time
- Shopping list generator based on meal plans
- Recipe details with cooking instructions
- Calorie and water intake tracker
- Educational content about nutrition
- PDF export for meal plans
- Mobile app version

## License

This project is created for educational and health awareness purposes.

## Disclaimer

This application provides general nutritional guidance based on BMI calculations. For personalized medical advice, especially if you have specific health conditions or dietary restrictions, please consult with a registered dietitian or healthcare professional.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with [Same](https://same.new)** - AI-powered web development platform
"# Nutrition-Healh" 
"# Nutrition-Healh" 
