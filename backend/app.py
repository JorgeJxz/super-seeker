from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from news_pipeline import get_news, process_news, sia, classify_sentiment
import pandas as pd

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"], 
    allow_headers=["*"]
)

@app.get("/api/news")
def get_news_endpoint(topic: str):
    df_raw = get_news(topic)
    df_clean, word_freq, bigram_freq, sentiment_counts = process_news(df_raw)
    
    articles = []
    for _, row in df_raw.iterrows():
        sentiment_score = sia.polarity_scores(row.get("clean_text", ""))["compound"]
        articles.append({
            "title": row.get("title", ""),
            "description": row.get("description", ""),
            "url": row.get("url", ""),
            "imageUrl": row.get("urlToImage", ""),
            "source": row.get("source", {}).get("name", "") if isinstance(row.get("source"), dict) else str(row.get("source", "")),
            "publishedAt": row.get("publishedAt", ""),
            "sentiment": classify_sentiment(sentiment_score)
        })
    
    response = {
        "articles": articles,
        "word_freq": word_freq.most_common(20),
        "bigram_freq": [(' '.join(bg[0]), bg[1]) for bg in bigram_freq.most_common(20)],
        "sentiment": sentiment_counts.to_dict()
    }
    return response

@app.get("/analyze")
def analyze(topic: str):
    df_raw = get_news(topic)
    df_clean, word_freq, bigram_freq, sentiment_counts = process_news(df_raw)
    
    response = {
        "word_freq": word_freq.most_common(20),
        "bigram_freq": [(' '.join(bg[0]), bg[1]) for bg in bigram_freq.most_common(20)],
        "sentiment": sentiment_counts.to_dict()
    }
    return response