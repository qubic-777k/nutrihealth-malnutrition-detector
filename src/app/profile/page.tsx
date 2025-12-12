"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";

interface UserProfile {
  name: string;
  age: string;
  height: string;
  weight: string;
}

interface HealthAssessment {
  category: string;
  bmi: number;
  description: string;
  recommendations: string[];
  color: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    age: "",
    height: "",
    weight: "",
  });
  const [assessment, setAssessment] = useState<HealthAssessment | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.push("/");
      return;
    }

    // Load existing profile if any
    const savedProfile = localStorage.getItem(`profile_${currentUser}`);
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
    }

    // Load existing assessment if any
    const savedAssessment = localStorage.getItem(`assessment_${currentUser}`);
    if (savedAssessment) {
      setAssessment(JSON.parse(savedAssessment));
    } else if (savedProfile) {
      // Auto-calculate assessment if profile exists but no saved assessment
      const parsedProfile = JSON.parse(savedProfile);
      if (parsedProfile.height && parsedProfile.weight && parsedProfile.age) {
        calculateHealthAssessment(parsedProfile);
      }
    }
  }, [router]);

  const calculateHealthAssessment = (profileData: UserProfile) => {
    const heightInMeters = Number.parseFloat(profileData.height) / 100;
    const weightInKg = Number.parseFloat(profileData.weight);
    const age = Number.parseInt(profileData.age);

    const bmi = weightInKg / (heightInMeters * heightInMeters);

    let category = "";
    let description = "";
    let recommendations: string[] = [];
    let color = "";

    // AI-based categorization considering BMI and age
    if (bmi < 16) {
      category = "Malnutrition";
      color = "from-red-600 to-rose-600";
      description = "Your BMI indicates severe malnutrition. Immediate medical attention is recommended.";
      recommendations = [
        "Consult with a healthcare professional or nutritionist immediately",
        "Increase caloric intake with nutrient-dense foods",
        "Consider protein-rich foods like lean meats, eggs, and legumes",
        "Include healthy fats from nuts, avocados, and olive oil",
        "Eat smaller, frequent meals throughout the day",
        "Consider nutritional supplements under medical supervision",
      ];
    } else if (bmi >= 16 && bmi < 18.5) {
      category = "Not Healthy";
      color = "from-orange-500 to-amber-600";
      description = "Your BMI is below the healthy range. Focus on balanced nutrition to reach a healthier weight.";
      recommendations = [
        "Increase portion sizes gradually",
        "Add calorie-dense foods like nuts, cheese, and whole grains",
        "Include protein with every meal (chicken, fish, tofu, beans)",
        "Drink nutritious smoothies with fruits, yogurt, and nut butter",
        "Strength training exercises to build muscle mass",
        "Track your calorie intake to ensure adequate nutrition",
      ];
    } else if (bmi >= 18.5 && bmi < 24.9) {
      if (age < 25 && bmi >= 22) {
        category = "Very Healthy";
        color = "from-emerald-500 to-teal-600";
        description = "Excellent! Your BMI is in the optimal range for your age. Keep up the great work!";
      } else if (age >= 60 && bmi >= 23) {
        category = "Very Healthy";
        color = "from-emerald-500 to-teal-600";
        description = "Great! Your BMI is ideal for your age group. Maintain your current lifestyle!";
      } else {
        category = "Healthy";
        color = "from-green-500 to-emerald-600";
        description = "Good! Your BMI is within the healthy range. Continue your balanced lifestyle.";
      }
      recommendations = [
        "Maintain a balanced diet with fruits, vegetables, whole grains, and lean proteins",
        "Stay physically active with at least 150 minutes of moderate exercise per week",
        "Keep hydrated by drinking 8-10 glasses of water daily",
        "Get 7-9 hours of quality sleep each night",
        "Manage stress through meditation, yoga, or hobbies",
        "Regular health check-ups to monitor your wellbeing",
      ];
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Normal";
      color = "from-yellow-500 to-amber-500";
      description = "Your BMI indicates you're slightly above the ideal range. Small lifestyle changes can help.";
      recommendations = [
        "Reduce portion sizes slightly and avoid overeating",
        "Choose whole grains over refined carbohydrates",
        "Increase vegetable and fruit intake",
        "Limit sugary drinks and opt for water or herbal tea",
        "Incorporate 30 minutes of cardio exercise daily",
        "Reduce processed foods and fast food consumption",
      ];
    } else {
      category = "Not Healthy";
      color = "from-orange-500 to-amber-600";
      description = "Your BMI is above the healthy range. A structured approach to nutrition and exercise is recommended.";
      recommendations = [
        "Consult with a nutritionist for a personalized meal plan",
        "Focus on whole, unprocessed foods",
        "Practice portion control and mindful eating",
        "Increase physical activity gradually - start with walking",
        "Avoid sugary snacks and beverages",
        "Consider joining a support group or working with a health coach",
        "Monitor your progress weekly and adjust as needed",
      ];
    }

    const assessmentData = {
      category,
      bmi: Math.round(bmi * 10) / 10,
      description,
      recommendations,
      color,
    };

    setAssessment(assessmentData);

    // Save assessment to localStorage
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      localStorage.setItem(`assessment_${currentUser}`, JSON.stringify(assessmentData));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      localStorage.setItem(`profile_${currentUser}`, JSON.stringify(profile));
      calculateHealthAssessment(profile);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/");
  };

  const handleViewMealPlan = () => {
    router.push("/meal-plan");
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Health Profile</h1>
            <p className="text-slate-600 mt-1">Track your nutrition and get personalized recommendations</p>
          </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>Enter your details to get a health assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    value={profile.height}
                    onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="65"
                    value={profile.weight}
                    onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Analyze My Health
                </Button>
              </form>
            </CardContent>
          </Card>

          {assessment ? (
            <div className="space-y-6">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Health Assessment</CardTitle>
                  <CardDescription>Based on your profile data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${assessment.color} shadow-lg mb-4`}>
                      <span className="text-3xl font-bold text-white">{assessment.bmi}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{assessment.category}</h3>
                    <p className="text-sm text-slate-600">BMI: {assessment.bmi}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-900">Assessment</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{assessment.description}</p>
                  </div>
                  <Button
                    onClick={handleViewMealPlan}
                    className="w-full"
                    size="lg"
                  >
                    <span className="mr-2">🍽️</span>
                    View My Meal Plan
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle>Personalized Recommendations</CardTitle>
                  <CardDescription>Follow these steps to improve your health</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {assessment.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${assessment.color} flex items-center justify-center mt-0.5`}>
                          <span className="text-xs font-bold text-white">{index + 1}</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">{rec}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="border-0 shadow-xl md:col-span-1">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 mb-2">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Get Your Health Assessment</h3>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    Fill in your information on the left and click "Analyze My Health" to receive personalized nutrition recommendations powered by our AI system.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
