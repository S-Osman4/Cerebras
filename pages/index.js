import React, { useState } from "react";
import styles from "../styles/Home.module.css"; // Ensure the path is correct

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showQuickResponses, setShowQuickResponses] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(input);
      e.preventDefault();
    }
  };

  const quickResponse = (text) => {
    sendMessage(text);
    setShowQuickResponses(false);
  };

  const categoryQuickResponses = {
    Vocabulary: [
      "Practice test: Vocabulary",
      "Synonym matching",
      "Example sentences using N5 words",
    ],
    Grammar: [
      "Simple N5 grammar rule",
      "Grammar practice test",
      "Sentence completion",
    ],
    Reading: ["Reading comprehension", "Short reading test"],
    Kanji: [
      "N5 Kanji practice",
      "Kanji meaning matching",
      "Kanji reading practice",
      "Related kanji pairs",
    ],
  };

  const sendMessage = async (message) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setMessages((messages) => [
      ...messages,
      { id: Date.now(), text: trimmedMessage, sender: "user" },
    ]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      if (response.ok) {
        const { reply } = await response.json();
        const formattedReply = formatText(reply);
        setMessages((messages) => [
          ...messages,
          { id: Date.now() + 1, text: formattedReply, sender: "bot" },
        ]);
      } else {
        setMessages((messages) => [
          ...messages,
          {
            id: Date.now() + 1,
            text: "Sorry, there was an error.",
            sender: "bot",
          },
        ]);
      }
    } catch (error) {
      console.error("API error:", error);
      setMessages((messages) => [
        ...messages,
        {
          id: Date.now() + 1,
          text: "There was a problem reaching the server.",
          sender: "bot",
        },
      ]);
    }
  };

  const formatText = (text) => {
    let formattedText = text
      .replace(/^# (.*?)$/gm, "<h1>$1</h1>")
      .replace(/^## (.*?)$/gm, "<h2>$1</h2>")
      .replace(/^### (.*?)$/gm, "<h3>$1</h3>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/^\* (.*?)$/gm, "<li>$1</li>");

    if (formattedText.includes("<li>")) {
      formattedText = formattedText.replace(
        /(<li>.*?<\/li>)/gms,
        "<ul>$1</ul>"
      );
    }

    formattedText = formattedText
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br>");
    return formattedText;
  };

  const renderMessage = (msg) => {
    return msg.sender === "bot" ? (
      <p
        key={msg.id}
        className={styles.botMessage}
        dangerouslySetInnerHTML={{ __html: msg.text }}
      ></p>
    ) : (
      <p key={msg.id} className={styles.userMessage}>
        {msg.text}
      </p>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatArea}>
        {messages.map((msg) => renderMessage(msg))}
        {showQuickResponses && !selectedCategory && (
          <div className={styles.quickResponses}>
            <button onClick={() => setSelectedCategory("Vocabulary")}>
              Vocabulary
            </button>
            <button onClick={() => setSelectedCategory("Grammar")}>
              Grammar
            </button>
            <button onClick={() => setSelectedCategory("Reading")}>
              Reading
            </button>
            <button onClick={() => setSelectedCategory("Kanji")}>Kanji</button>
          </div>
        )}
        {showQuickResponses && selectedCategory && (
          <div className={styles.quickResponses}>
            {categoryQuickResponses[selectedCategory].map((text) => (
              <button key={text} onClick={() => quickResponse(text)}>
                {text}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={styles.controls}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={styles.input}
          placeholder="Type your message here..."
        />
        <button
          onClick={() => sendMessage(input)}
          className={styles.sendButton}
        >
          Send
        </button>
      </div>
      <div className={styles.disclaimer}>
        *This content is generated by an AI assistant.*
      </div>
    </div>
  );
}