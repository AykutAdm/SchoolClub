import bcrypt
from sanic import Blueprint, response
from sqlalchemy.future import select
from utils.db import SessionLocal
from models.model import User
from redis.asyncio import from_url
from bcrypt import hashpw, gensalt, checkpw
import json
import os

bp = Blueprint("users", url_prefix="/users")

# Redis URL'ini environment variable'dan al
redis = from_url(os.getenv("REDIS_URL", "redis://redis:6379"))

@bp.get("/getall")
async def get_all_users(request):
    try:
        cache_key = "users:getall"
        redis = request.app.ctx.redis
        cached_users = await redis.get(cache_key)

        if cached_users:
            return response.json({"users": json.loads(cached_users)})

        async with SessionLocal() as session:
            result = await session.execute(select(User))
            users = result.scalars().all()
            users_list = [user.as_dict() for user in users]
            
            # Cache'e kaydet
            await redis.set(cache_key, json.dumps(users_list), ex=60)
            return response.json({"users": users_list})
    except Exception as e:
        print(f"Error in get_all_users: {str(e)}")
        return response.json({"users": [], "error": str(e)}, status=500)


@bp.put("/deactivate/<user_id:int>")
async def deactivate_user(request, user_id):
    """
    Belirtilen kullanıcı ID'sine göre kullanıcıyı devre dışı bırakır (is_active = False).
    Kullanıcıyı dbden silmeyiz aktif durumunu pasif yaparız.
    """
    async with SessionLocal() as session:
        # Kullanıcıyı ID'ye göre getir
        result = await session.execute(select(User).where(User.id == user_id))
        user = result.scalars().first()

        if not user:
            return response.json({"message": "User not found."}, status=404)

        # Kullanıcıyı devre dışı bırak
        user.is_active = False

        async with session.begin():
            session.add(user)

        return response.json({"message": f"User with ID {user_id} has been deactivated."}, status=200)

@bp.put("/update/<user_id:int>")
async def update_user(request, user_id):
    """
    Kullanıcı bilgilerini günceller.
    """
    async with SessionLocal() as session:
        # Kullanıcıyı getir
        result = await session.execute(select(User).where(User.id == user_id))
        user = result.scalars().first()

        if not user:
            return response.json({"message": "User not found."}, status=404)

        data = request.json

        try:
            # Kullanıcı bilgilerini güncelle
            if "first_name" in data:
                user.first_name = data["first_name"]
            if "last_name" in data:
                user.last_name = data["last_name"]
            if "email" in data:
                user.email = data["email"]
            if "role" in data:
                user.role = data["role"]
            if "is_active" in data:
                user.is_active = bool(data["is_active"])  # Boolean'a çevir

            # Şifre güncellemesi
            if "password" in data and data["password"]:
                user.password = hashpw(data["password"].encode("utf-8"), gensalt()).decode("utf-8")

            await session.commit()
            
            # Cache'i temizle
            await redis.delete("users:getall")
            return response.json({"message": "User updated successfully!"})
            
        except Exception as e:
            await session.rollback()
            return response.json(
                {"message": f"Error updating user: {str(e)}"}, 
                status=500
            )

@bp.post("/register")
async def register_user(request):
    """Yeni bir kullanıcı kaydeder."""
    data = request.json
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "user")  # Varsayılan olarak "user"
    is_active = data.get("is_active", True)  # Varsayılan olarak aktif

    if not first_name or not last_name or not email or not password:
        return response.json({"message": "All fields are required."}, status=400)

    # Email kontrolü
    async with SessionLocal() as session:
        existing_user = await session.execute(select(User).where(User.email == email))
        if existing_user.scalars().first():
            return response.json({"message": "Email already exists."}, status=409)

    # Şifreyi hashleme
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    
    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=hashed_password,
        role=role,
        is_active=is_active
    )

    async with SessionLocal() as session:
        session.add(new_user)
        await session.commit()
        await redis.delete("users:getall")

    return response.json({"message": "User registered successfully!"}, status=201)


@bp.post("/login")
async def login_user(request):
    """Kullanıcı giriş yapar."""
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # Gerekli alanların kontrolü
    if not email or not password:
        return response.json({"message": "Email and password are required."}, status=400)

    async with SessionLocal() as session:
        # Kullanıcıyı email'e göre bul
        result = await session.execute(select(User).where(User.email == email))
        user = result.scalars().first()

        # Kullanıcı doğrulama
        if user and bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
            return response.json({"message": "Login successful!", "user": user.as_dict()})
        else:
            return response.json({"message": "Invalid email or password."}, status=401)

#Id ile user getirm fonk.
@bp.get("/<user_id:int>")
async def get_user_by_id(request, user_id):
    """Kullanıcıyı id ile getirir."""
    async with SessionLocal() as session:
        result = await session.execute(select(User).where(User.id == user_id))
        user = result.scalars().first()

        if user:
            return response.json({"user": user.as_dict()}, status=200)
        else:
            return response.json({"message": f"User with id {user_id} not found."}, status=404)
