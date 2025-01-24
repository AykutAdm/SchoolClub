import React, { useEffect, useState } from 'react';
import AnnouncementCard from '../components/AnnouncementCard';
import { Bell, Plus, Loader2, Trash2 } from 'lucide-react';
import { announcementsAPI } from '../services/api';
import { Announcement } from '../types';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import CreateAnnouncementForm from '../components/CreateAnnouncementForm';
import ConfirmModal from '../components/ConfirmModal';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<number | null>(null);
  const { user } = useAuth();

  const fetchAnnouncements = async () => {
    try {
      const data = await announcementsAPI.getAll();
      setAnnouncements(data);
    } catch (error) {
      toast.error('Failed to load announcements');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleDelete = async (id: number) => {
    if (user?.role !== 'admin') return;
    setSelectedAnnouncementId(id);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedAnnouncementId) return;
    
    try {
      await announcementsAPI.delete(selectedAnnouncementId);
      toast.success('Announcement deleted successfully');
      fetchAnnouncements();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete announcement';
      toast.error(errorMessage);
    } finally {
      setIsConfirmModalOpen(false);
      setSelectedAnnouncementId(null);
    }
  };

  const handleCreate = () => {
    if (!user) return;
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Announcements</h1>
        {user?.role === 'admin' && (
          <button
            onClick={handleCreate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Announcement
          </button>
        )}
      </div>
      <div className="space-y-6">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative">
            {user?.role === 'admin' && (
              <button
                onClick={() => handleDelete(announcement.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-600 
                         transition-colors bg-white dark:bg-gray-800 rounded-full p-1
                         hover:bg-red-50 dark:hover:bg-red-900/30"
                title="Delete announcement"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {announcement.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {announcement.content}
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Posted on {new Date(announcement.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateAnnouncementForm
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchAnnouncements}
          userId={user?.id || 0}
        />
      </Modal>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Announcement"
        message="Are you sure you want to delete this announcement? This action cannot be undone."
      />
    </div>
  );
}