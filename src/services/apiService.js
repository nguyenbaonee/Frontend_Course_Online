import axios from 'axios';

// Google Vertex AI API (hoặc Gemini)
const GOOGLE_CLOUD_API_URL = 'https://us-central1-aiplatform.googleapis.com/v1/models/YOUR_MODEL_ID:predict';
const GOOGLE_API_KEY = "AIzaSyAN3F4_aakAHaDgTUwjDFy_PUMG_tgDg-I"; // API Key của Google Cloud

// Gọi Google Cloud AI (Gemini)
export const fetchGeminiResponse = async (prompt) => {
    try {
        const response = await axios.post(
            GOOGLE_CLOUD_API_URL,
            {
                instances: [
                    {
                        content: prompt
                    }
                ],
                parameters: {
                    temperature: 0.7,
                    maxOutputTokens: 200
                }
            },
            {
                headers: {
                    "Authorization": `Bearer ${GOOGLE_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.predictions[0].content;
    } catch (error) {
        console.error("Lỗi Gemini (Google Cloud):", error);
        throw error;
    }
};

// Gọi API khóa học (không thay đổi)
export const fetchCourses = async () => {
    try {
        const response = await axios.get("http://localhost:8089/api/courses", {
            params: {
                page: 0,
                size: 100,
                status: "ACTIVE"
            }
        });
        return response.data.content;
    } catch (error) {
        console.error("Lỗi fetch khóa học:", error);
        return [];
    }
};
