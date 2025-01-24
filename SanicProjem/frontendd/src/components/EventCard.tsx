import { Calendar, Clock, Trash2 } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onDelete?: () => void;
}

export default function EventCard({ event, onDelete }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="space-y-2 text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{new Date(event.start_date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>
              {new Date(event.start_date).toLocaleTimeString()} - 
              {new Date(event.end_date).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}