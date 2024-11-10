# Study Buddy Chatbot

Study Buddy is a Japanese language learning chatbot designed to help users prepare for the JLPT N5 exam. This AI-powered assistant provides interactive lessons on vocabulary, grammar, kanji, and reading comprehension. The chatbot is built using Next.js and integrates the Cerebras Cloud SDK to generate responses based on user input.

## Features

- **JLPT N5 Preparation**: Focuses on content tailored for N5 level, with structured lessons and quizzes.
- **Interactive Chat Interface**: Users can engage with the chatbot by typing in their messages, and the bot provides responses with correct kanji and furigana formatting.
- **Quick Response Options**: Offers quick responses based on categories such as Vocabulary, Grammar, Kanji, and Reading, allowing users to jump into different lesson types.
- **Furigana Support**: All kanji characters are accompanied by furigana (pronunciations), helping learners understand the readings easily.
- **AI-Powered Responses**: Powered by the Cerebras Cloud SDK, the chatbot generates personalized lessons and explanations based on user input.

## Project Setup

### Prerequisites

- Node.js (>=18.x)
- Access to the Cerebras Cloud SDK (API Key)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/S-Osman4/Cerebras.git
   ```
2. Install dependencies:
   ```bash
    cd cerebras
    npm install
    ```
3. Set up environment variables:
   Create a .env file in the root of your project and add the following:
   ```bash
    CEREBRAS_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open the application in your browser: Visit http://localhost:3000.

## Usage

Once the server is running, you can interact with the chatbot by typing your messages in the input box. You can also select from different quick response categories such as Vocabulary, Grammar, Kanji, and Reading. Alternatively, you can type any question related to Japanese language learning, and the chatbot will respond accordingly.

The chatbot will generate responses in Japanese, complete with furigana (pronunciation guides), and provide explanations in English for grammar, vocabulary, and kanji.

## Project Structure

### `pages/api/chat.js`

This file handles API requests to the Llama model, which processes user messages and generates appropriate chatbot responses. The bot can provide content related to various aspects of the Japanese language, such as vocabulary, grammar, kanji, and reading comprehension.

Key Highlights:
- **Llama Model Integration**: Sends the user's message to the Llama API and receives a context-aware response in return.
- **Message Handling**: Ensures proper formatting of kanji and furigana for better readability and learning.
- **Response Structure**: Defines how the chatbot generates responses based on user input, including structured lessons on different Japanese topics.

### `pages/_app.js`

This file sets up the layout for the entire application. It imports global styles and renders the header, which includes a robot icon and the title "Study Buddy."

### `pages/index.js`

This is the main page where users interact with the chatbot. It contains:
- **Chat Area**: Displays messages from both the user and the bot, allowing for an ongoing conversation.
- **Input Area**: A text box where users can type their messages or questions.
- **Quick Response Buttons**: A set of buttons that allows users to select different categories (Vocabulary, Grammar, Kanji, Reading) for immediate responses.

### `styles/globals.css`

Global styles for the application, including the layout and background settings. It ensures that the interface is visually appealing and features smooth animations and responsive design for various screen sizes.

### `styles/Home.module.css`

CSS for styling the homepage layout, including the chat area, input controls, and message styling. This file makes sure the application looks good and remains user-friendly on both desktop and mobile devices.

## Contribution

Contributions to this project are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Llama Model**: For powering the chatbot with AI-generated responses.
- **Cerebras**: For providing the powerful infrastructure and cloud-based solutions used to enhance the chatbot’s capabilities. [Visit Cerebras](https://cerebras.ai/) and [Cerebras Inference Docs](https://inference-docs.cerebras.ai/quickstart) for more details.
- **Next.js**: For building the React-based framework.
- **Font Awesome**: For providing the robot icon used in the header.

   
