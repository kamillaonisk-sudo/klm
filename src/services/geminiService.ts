import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ComplianceResult {
  isCompliant: boolean;
  violations: string[];
  suggestions: string[];
  severity: 'low' | 'medium' | 'high';
}

export interface StrategicReport {
  summary: string;
  dataPoints: { label: string; value: string }[];
  recommendations: string[];
}

export type ReportType = 'TREND_ANALYSIS' | 'AGENCY_COACHING' | 'CREATIVE_HARVESTING' | 'FLEXIBILITY_DIALOGUE';

export async function checkBrandCompliance(content: string): Promise<ComplianceResult> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following marketing content for compliance with KLM brand guidelines. 
    KLM Brand Guidelines Summary:
    - Primary Color: KLM Blue (#00A1DE)
    - Logo: Must have clear safe zones, no distortion.
    - Typography: Preferred sans-serif (Inter/system-sans).
    - Tone: Professional, reliable, pioneering.
    - Imagery: Blue skies, aircraft, clear landscapes.

    Content to analyze:
    "${content}"`,
    config: {
      systemInstruction: "You are a brand compliance expert for KLM. Your goal is to detect brand violations in marketing copy and assets. Return a JSON object detailing if the content is compliant, a list of specific violations, suggestions for fixes, and a severity level.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          isCompliant: { type: Type.BOOLEAN },
          violations: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          suggestions: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          severity: { 
            type: Type.STRING, 
            enum: ['low', 'medium', 'high'] 
          }
        },
        required: ["isCompliant", "violations", "suggestions", "severity"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function generateStrategicReport(reportType: ReportType): Promise<StrategicReport> {
  const prompts = {
    TREND_ANALYSIS: "Summarize the most common brand mistakes made by agencies based on historical audit data (75% violations are logo clear space issues).",
    AGENCY_COACHING: "Identify regions or agencies struggling with brand compliance and suggest educational interventions.",
    CREATIVE_HARVESTING: "Extract and summarize innovative ideas from high-performing agencies (like APAC's neon integration) to inspire future campaigns.",
    FLEXIBILITY_DIALOGUE: "Analyze 'pain points' where agencies frequently request flexibility (e.g., contrast issues in high-brightness Asian markets)."
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are the KLM AI Brand Strategist. Generate a strategic report for: ${prompts[reportType]}. 
    Context: You are speaking to the Global Brand Director of KLM.`,
    config: {
      systemInstruction: "Generate a strategic report in JSON format with a summary paragraph, a list of 3 key data points, and 3 actionable recommendations.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          dataPoints: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                value: { type: Type.STRING }
              },
              required: ["label", "value"]
            }
          },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["summary", "dataPoints", "recommendations"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}
