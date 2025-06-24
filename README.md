# Baby Name Advisor

AI-powered baby name selection assistant for parents in the USA.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project
- OpenAI or Anthropic API key
- Pinecone vector database account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/griederer/NameName.git
cd NameName
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Fill in your API keys and configuration in `.env.local`:

- Firebase configuration (get from Firebase Console)
- OpenAI API key (from OpenAI platform)
- Pinecone configuration (from Pinecone console)

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Variables

| Variable                          | Required | Description         |
| --------------------------------- | -------- | ------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`    | ✅       | Firebase API key    |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | ✅       | Firebase project ID |
| `OPENAI_API_KEY`                  | ✅\*     | OpenAI API key      |
| `ANTHROPIC_API_KEY`               | ✅\*     | Anthropic API key   |
| `PINECONE_API_KEY`                | ✅       | Pinecone API key    |

\*At least one LLM API key is required

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage

### Code Quality

This project uses:

- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks
- TypeScript for type safety

Code is automatically formatted and linted on commit.

## Deployment

The app is designed to deploy on Firebase Hosting with Firebase Functions.

```bash
npm run build
firebase deploy
```

## Architecture

- **Frontend**: Next.js 15 with TypeScript
- **Backend**: Firebase Functions
- **Database**: Firestore
- **Vector Search**: Pinecone
- **AI**: OpenAI GPT-4 or Anthropic Claude
- **Styling**: Tailwind CSS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Create a pull request

## License

MIT License - see LICENSE file for details.
