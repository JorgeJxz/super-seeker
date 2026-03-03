import pandas as pd
import re
import nltk
import requests
from collections import Counter
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk import bigrams
from nltk.sentiment import SentimentIntensityAnalyzer

nltk.download('wordnet')
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('vader_lexicon')

#Stopwords personalizadas
custom_stopwords = {"char", "amp", "nbsp", "this", "chart"}
stop_words = set(stopwords.words("english")).union(custom_stopwords)

lemmatizer = WordNetLemmatizer()
sia = SentimentIntensityAnalyzer()

# Función para limpiar el texto
def clean_text(text):
    text = text.lower()
    text = re.sub(r'http\S+', '', text)
    text = re.sub(r'@\w+', '', text)
    text = re.sub(r'#\w+', '', text)
    text = re.sub(r'[^\w\s]', '', text)
    return text.strip()

NEWSAPI_KEY = "50e6368082754d729b15613fe6ec2877"  

def get_news(topic):
    url = (
        f"https://newsapi.org/v2/everything?"
        f"q={topic}&"
        f"language=en&"
        f"pageSize=50&"
        f"sortBy=publishedAt&"
        f"apiKey={NEWSAPI_KEY}"
    )
    response = requests.get(url)
    data = response.json()
    
    # Manejo de errores
    if response.status_code != 200:
        raise Exception(f"Error al consultar NewsAPI: {data.get('message', response.status_code)}")
    
    articles = data.get("articles", [])
    if not articles:
        return pd.DataFrame(columns=["title", "description", "content", "text"])
    
    df_raw = pd.DataFrame(articles)
    # Mapear texto completo
    df_raw["text"] = (
        df_raw["title"].fillna('') + ' ' +
        df_raw["description"].fillna('') + ' ' +
        df_raw["content"].fillna('')
    )
    return df_raw

def process_news(df_raw):
    df_raw["clean_text"] = df_raw["text"].apply(clean_text)
    df_raw["tokens"] = df_raw["clean_text"].apply(word_tokenize)
    df_raw["tokens"] = df_raw["tokens"].apply(
        lambda tokens: [lemmatizer.lemmatize(w.strip()) for w in tokens if w.strip() not in stop_words]
    )
    
# Conteo de palabras
    all_tokens = [token for tokens in df_raw["tokens"] for token in tokens]
    word_freq = Counter(all_tokens)

    # Bigramas
    all_bigrams = [bg for tokens in df_raw["tokens"] for bg in bigrams(tokens)]
    bigram_freq = Counter(all_bigrams)


   # Sentimiento
    df_raw["sentiment"] = df_raw["clean_text"].apply(lambda x: sia.polarity_scores(x)["compound"])
    def classify_sentiment(score):
        if score >= 0.05: return "positive"
        elif score <= -0.05: return "negative"
        else: return "neutral"
    df_raw["sentiment_label"] = df_raw["sentiment"].apply(classify_sentiment)

    return df_raw, word_freq, bigram_freq, df_raw["sentiment_label"].value_counts()