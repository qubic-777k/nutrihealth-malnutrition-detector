import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ reply: "Error: API Key bermasalah." }, { status: 500 });
    }

    const body = await req.json();
    const userMessage = body.message || "";
    const userContext = body.context || {}; 

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const profileString = JSON.stringify(userContext, null, 2);

    const prompt = `
    Bertindaklah sebagai **Dr. Nutri**, Dokter Spesialis Gizi Klinis.

    Berikut adalah DATA LENGKAP PASIEN (JSON):
    ${profileString}

    Instruksi Utama:
    1.  Analisis data pasien (Nama, Umur, BMI, dll) jika tersedia.
    2.  Jawab pertanyaan user dalam **Bahasa Indonesia** terlebih dahulu. Gunakan format Markdown (Bold, List, dll) agar rapi.

    Instruksi Terjemahan (WAJIB):
    3.  Setelah jawaban Bahasa Indonesia selesai, buat garis pembatas horizontal (---).
    4.  Di bawah garis pembatas, berikan **Terjemahan Bahasa Inggris** dari jawabanmu.
    5.  **STYLE GUIDE BAHASA INGGRIS:**
        - Seluruh paragraf terjemahan harus menggunakan format *Italic* (miring).
        - Kata kunci penting (Key Terms) dalam bahasa Inggris harus ***Bold Italic*** (Tebal dan Miring).
        - Contoh: "*Based on your* ***BMI*** *of 24, you are considered* ***Healthy***."

    Pertanyaan Pasien: "${userMessage}"

    Jawab sebagai Dr. Nutri:
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

    } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
        { reply: `Maaf, koneksi terputus. (Error: ${error.message})` }, 
        { status: 500 }
    );
    }
}