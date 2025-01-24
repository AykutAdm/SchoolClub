import React, { useState } from 'react';
import { eventsAPI } from '../services/api';
import toast from 'react-hot-toast';

interface CreateEventFormProps {
  onClose: () => void;
  onSuccess: () => void;
  userId: number;
}

export default function CreateEventForm({ onClose, onSuccess, userId }: CreateEventFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Tarih kontrolü
    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);

    if (endDate <= startDate) {
      toast.error('End date must be after start date');
      return;
    }

    try {
      await eventsAPI.create({
        title: formData.title,
        description: formData.description,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        created_by: userId
      });
      toast.success('Event created successfully');
      onSuccess();
      onClose();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create event';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white 
                     focus:border-blue-500 focus:ring-blue-500 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white 
                     focus:border-blue-500 focus:ring-blue-500 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Date & Time</label>
          <input
            type="datetime-local"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white 
                     focus:border-blue-500 focus:ring-blue-500 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Date & Time</label>
          <input
            type="datetime-local"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white 
                     focus:border-blue-500 focus:ring-blue-500 shadow-sm"
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 
                     hover:bg-gray-600 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                     hover:bg-blue-700 rounded-md transition-colors"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
} 