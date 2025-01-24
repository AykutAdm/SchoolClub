from sanic import Sanic
from sanic_ext import Extend
from redis.asyncio import from_url
from utils.db import setup_db
from routes import users, events, announcements
import os


app = Sanic("UserApp")

# Sanic Extend
Extend(app)

# Redis bağlantısı
redis_url = os.getenv("REDIS_URL", "redis://redis:6379")
redis = from_url(redis_url)

# Redis nesnesini blueprint'lere aktarma
@app.before_server_start
async def setup_redis(app, loop):
    app.ctx.redis = redis
    # Redis bağlantısını test et
    try:
        await redis.ping()
        print("Redis connection successful!")
    except Exception as e:
        print(f"Redis connection failed: {e}")
        raise

# Middleware - CORS
@app.middleware("response")
async def cors_headers(request, response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type"

# Veritabanını başlat
@app.before_server_start
async def before_start(app, loop):
    await setup_db()

# Blueprint'leri bağlama
app.blueprint(users.bp)
app.blueprint(events.bp)
app.blueprint(announcements.bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
