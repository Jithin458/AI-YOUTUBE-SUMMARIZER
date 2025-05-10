# AI YouTube Summarizer

A simple web app that summarizes YouTube videos using AI.


![Image](https://github.com/user-attachments/assets/6e6341d9-b931-4397-882a-875f5794c83b)

## Features

* Enter a YouTube video URL and get a summary.
* Clean, modern UI with a copy button for the summary.

## How It Works

1. You enter a YouTube video URL.
2. The app fetches the video’s captions (if available).
3. The captions are sent to the AI (Gemini API) for summarization.
4. The summary is displayed instantly on the page.

## Setup

1. Clone this repo.
2. Install dependencies:

```bash
npm install
```

3. Add your Gemini API key in the backend code.
4. Start the server:

```bash
node server.js
```


