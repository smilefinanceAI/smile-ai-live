export async function onRequestPost(context) {
  const { env, request } = context;
  const apiKey = env.GEMINI_API_KEY;

  try {
    const { prompt } = await request.json();

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ text: `Tum Smile Finance AI ho. Company: Smile Finance Solution. Amazon ID: smileai24-21. Sawal: ${prompt}` }] 
        }]
      })
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf kijiye, main samajh nahi pa raha hoon.";

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ reply: "Server Error: " + error.message }), { status: 200 });
  }
}
