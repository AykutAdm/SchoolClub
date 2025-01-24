from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from models.model import Base
import os

DATABASE_URL = os.getenv("DATABASE_URL", "mysql+aiomysql://root:1234@mysql:3306/school_club")
engine = create_async_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

async def setup_db():
    # Veritabanı bağlantısı için birkaç deneme yapalım
    max_retries = 5
    retry_count = 0
    while retry_count < max_retries:
        try:
            async with engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
            print("Database setup completed successfully!")
            break
        except Exception as e:
            retry_count += 1
            if retry_count == max_retries:
                print(f"Failed to connect to database after {max_retries} attempts: {e}")
                raise
            print(f"Database connection attempt {retry_count} failed, retrying...")
            import asyncio
            await asyncio.sleep(5)  # 5 saniye bekle ve tekrar dene
