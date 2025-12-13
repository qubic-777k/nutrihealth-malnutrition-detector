"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Send, Bot, User, ArrowLeft, Stethoscope } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
    role: "user" | "bot";
    content: string;
    };

    export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
    { 
        role: "bot", 
        content: "Halo! Saya Dr. Nutri AI. Saya sudah membaca data kesehatan Anda. Ada yang bisa saya bantu terkait diet atau kondisi tubuh Anda?" 
    }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<any>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
    scrollToBottom();
    }, [messages]);

    useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        const profileDataStr = localStorage.getItem(`profile_${currentUser}`);
        const assessmentDataStr = localStorage.getItem(`assessment_${currentUser}`);

        let combinedData = {};

        if (profileDataStr) {
        try {
            combinedData = { ...combinedData, ...JSON.parse(profileDataStr) };
        } catch (e) { console.error("Error parsing profile", e); }
        }

        if (assessmentDataStr) {
        try {
            combinedData = { ...combinedData, ...JSON.parse(assessmentDataStr) };
        } catch (e) { console.error("Error parsing assessment", e); }
        }

        setUserData(combinedData);
        console.log("Data Lengkap User:", combinedData);
    }
    }, []);

    const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
        const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            message: userMessage,
            context: userData
        }),
        });

        const data = await response.json();
        setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
    } catch (error) {
        console.error(error);
        setMessages((prev) => [...prev, { role: "bot", content: "Maaf, terjadi kesalahan pada server konsultasi." }]);
    } finally {
        setIsLoading(false);
    }
    };

    return (
    <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4 flex flex-col items-center">
        
        <div className="w-full max-w-4xl mb-4 flex justify-between items-center">
            <Link href="/meal-plan">
                <Button variant="outline" className="gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                    <ArrowLeft className="w-4 h-4" /> Kembali ke Meal Plan
                </Button>
            </Link>
        </div>

        <Card className="w-full max-w-4xl h-[80vh] flex flex-col border-0 shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
            <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                <h1 className="text-xl font-bold">Konsultasi Gizi Medis</h1>
                <p className="text-xs text-emerald-100 font-normal opacity-90">Powered by Clinical Nutrition Data</p>
                </div>
            </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((msg, index) => (
                <div
                key={index}
                className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                <div className={`flex max-w-[85%] gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.role === "user" ? "bg-slate-200" : "bg-emerald-100"
                    }`}>
                    {msg.role === "user" ? <User size={16} className="text-slate-600"/> : <Bot size={16} className="text-emerald-600"/>}
                    </div>
                    
                    <div
                    className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed overflow-hidden ${
                        msg.role === "user"
                        ? "bg-emerald-600 text-white rounded-tr-none"
                        : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                    }`}
                    >
                    {msg.role === "user" ? (
                        <p>{msg.content}</p>
                    ) : (
                        <div className="prose prose-sm max-w-none prose-emerald dark:prose-invert">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                        </ReactMarkdown>
                        </div>
                    )}
                    </div>
                </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start w-full">
                <div className="flex items-center gap-2 bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-xs text-slate-400">Menganalisis data medis...</span>
                </div>
                </div>
            )}
            <div ref={messagesEndRef} />
            </CardContent>

            <CardFooter className="p-4 bg-white border-t border-slate-100">
            <div className="flex w-full items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                <Input
                placeholder="Tanya tentang gejala malnutrisi, diet diabetes, dll..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-700 placeholder:text-slate-400"
                />
                <Button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()} 
                size="icon"
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg h-10 w-10 shadow-sm shrink-0"
                >
                <Send className="w-4 h-4" />
                </Button>
            </div>
            </CardFooter>
        </Card>
        </div>
    </>
    );
}