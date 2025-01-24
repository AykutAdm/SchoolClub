import React, { useState } from 'react';
import { announcementsAPI } from '../services/api';
import toast from 'react-hot-toast';

interface CreateAnnouncementFormProps {
  onClose: () => void;
  onSuccess: () => void;
  userId: number;
}

export default function CreateAnnouncementForm({ onClose, onSuccess, userId }: CreateAnnouncementFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
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

    try {
      await announcementsAPI.create({
        title: formData.title,
        content: formData.content,
        created_by: userId
      });
      toast.success('Announcement created successfully');
      onSuccess();
      onClose();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create announcement';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">Create New Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
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
          <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={4}
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
} 