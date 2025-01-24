from sanic import Blueprint, response
from sqlalchemy.future import select
from utils.db import SessionLocal
from models.model import Event
from redis.asyncio import from_url
import json
from datetime import datetime

bp = Blueprint("events", url_prefix="/events")

# Redis bağlantısını environment variable'dan al
redis = from_url("redis://redis:6379")

@bp.get("/getall")
async def get_all_events(request):
    try:
        cache_key = "events:getall"
        cached_events = await redis.get(cache_key)

        if cached_events:
            return response.json({"events": json.loads(cached_events)})

        async with SessionLocal() as session:
            result = await session.execute(select(Event))
            events = result.scalars().all()
            events_list = [event.as_dict() for event in events]
            await redis.set(cache_key, json.dumps(events_list), ex=60)
            return response.json({"events": events_list})
    except Exception as e:
        print(f"Error in get_all_events: {str(e)}")
        return response.json({"events": []}, status=500)


@bp.post("/create")
async def create_event(request):
    try:
        data = request.json
        title = data.get("title")
        description = data.get("description")
        start_date = data.get("start_date")
        end_date = data.get("end_date")
        created_by = data.get("created_by")

        if not title or not start_date or not end_date or not created_by:
            return response.json(
                {"message": "Title, start_date, end_date, and created_by are required."},
                status=400
            )

        # ISO format string'i datetime objesine çevirme
        start_date = datetime.fromisoformat(start_date.replace('Z', '+00:00'))
        end_date = datetime.fromisoformat(end_date.replace('Z', '+00:00'))

        new_event = Event(
            title=title,
            description=description,
            start_date=start_date,
            end_date=end_date,
            created_by=created_by
        )

        async with SessionLocal() as session:
            async with session.begin():
                session.add(new_event)
                await session.commit()

            await redis.delete("events:getall")
            return response.json({"message": "Event created successfully!"}, status=201)
            
    except Exception as e:
        print(f"Error creating event: {str(e)}")  # Backend logları için
        return response.json(
            {"message": f"An error occurred: {str(e)}"},
            status=500
        )


@bp.delete("/delete/<event_id:int>")
async def delete_event(request, event_id):
    try:
        async with SessionLocal() as session:
            # Etkinliği bul
            result = await session.execute(
                select(Event).where(Event.id == event_id)
            )
            event = result.scalar_one_or_none()
            
            if not event:
                return response.json(
                    {"message": "Event not found"},
                    status=404
                )
            
            # Etkinliği sil
            await session.delete(event)
            await session.commit()
            
            # Cache'i temizle
            await redis.delete("events:getall")
            
            return response.json(
                {"message": "Event deleted successfully"},
                status=200
            )
            
    except Exception as e:
        print(f"Error deleting event: {str(e)}")
        return response.json(
            {"message": f"An error occurred: {str(e)}"},
            status=500
        )


