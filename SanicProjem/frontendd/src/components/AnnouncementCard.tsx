import React from 'react';
import { Bell, Trash2 } from 'lucide-react';
import { Announcement } from '../types';

interface AnnouncementCardProps {
  announcement: Announcement;
  onDelete?: () => void;
}

export default function AnnouncementCard({ announcement, onDelete }: AnnouncementCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">{announcement.title}</h3>
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </div>
      <p className="text-gray-600 mb-4">{announcement.content}</p>
      <div className="text-sm text-gray-500">
        {new Date(announcement.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}