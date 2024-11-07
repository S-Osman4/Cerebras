import Cerebras from "@cerebras/cerebras_cloud_sdk";
const client = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userMessage = req.body.message;
    try {
      const completionParams = {
        messages: [
          {
            role: "system",
            content:
              "You are a professional Japanese teacher specializing in JLPT N5 preparation. Your focus is primarily on teaching hiragana and katakana, as these are fundamental to N5 level. When kanji appears, always provide the kana reading.\n\n" +
              "For all example sentences and vocabulary:\n" +
              "1. Show the full sentence in kana first\n" +
              "2. If kanji is used, show it after the kana version\n" +
              "3. Include romaji\n" +
              "4. Provide English translation\n\n" +
              "Format your responses as follows:\n" +
              "**Kana**: [Full sentence in hiragana/katakana]\n" +
              "**Kanji** (if applicable): [Sentence with kanji]\n" +
              "**Romaji**: [Romaji transcription]\n" +
              "**English**: [English translation]\n\n" +
              "For vocabulary items:\n" +
              "**Word in Kana**: (ひらがな/カタカナ)\n" +
              "**Kanji** (if applicable): (漢字)\n" +
              "**English**: [English translation]\n" +
              "**Example Sentence**: [Follow the sentence format above]\n\n" +
              "Remember that N5 level focuses heavily on kana mastery, so prioritize hiragana and katakana in your explanations and examples.",
          },
          { role: "user", content: userMessage },
        ],
        model: "llama3.1-8b",
      };
      const completion = await client.chat.completions.create(completionParams);
      let response = completion.choices[0].message.content;

      // The regex replacement might not be needed anymore since we're changing the format
      // but keeping it just in case
      response = response.replace(
        /\*\*Kanji\*\*: \((.*?)\)\s+\*\*Reading\*\*: \((.*?)\)/g,
        (match, kanji, kana) => {
          return `**Kanji**: (${kanji}) **Reading**: (${kana})`;
        }
      );

      res.status(200).json({ reply: response });
    } catch (error) {
      console.error("Error processing the AI response:", error);
      res.status(500).json({ error: "Failed to process the AI response" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
