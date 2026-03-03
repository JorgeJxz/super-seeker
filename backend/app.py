from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from news_pipeline import get_news, process_news

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"], 
    allow_headers=["*"]
)

@app.get("/analyze")
def analyze(topic: str):
    df_raw = get_news(topic)
    df_clean, word_freq, bigram_freq, sentiment_counts = process_news(df_raw)
    
    # Preparar JSON
    response = {
        "word_freq": word_freq.most_common(20),
        "bigram_freq": [(' '.join(bg[0]), bg[1]) for bg in bigram_freq.most_common(20)],
        "sentiment": sentiment_counts.to_dict()
    }
    return response