import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { Calendar, Plus, Loader2, Trash2 } from 'lucide-react';
import { eventsAPI } from '../services/api';
import { Event } from '../types';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import CreateEventForm from '../components/CreateEventForm';
import ConfirmModal from '../components/ConfirmModal';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const { user } = useAuth();

  const fetchEvents = async () => {
    try {
      const data = await eventsAPI.getAll();
      setEvents(data);
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: number) => {
    if (user?.role !== 'admin') return;
    setSelectedEventId(id);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEventId) return;
    
    try {
      await eventsAPI.delete(selectedEventId);
      toast.success('Event deleted successfully');
      fetchEvents();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete event';
      toast.error(errorMessage);
    } finally {
      setIsConfirmModalOpen(false);
      setSelectedEventId(null);
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Events</h1>
        {user?.role === 'admin' && (
          <button
            onClick={handleCreate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Event
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
            {user?.role === 'admin' && (
              <button
                onClick={() => handleDelete(event.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-600 
                         transition-colors bg-white dark:bg-gray-800 rounded-full p-1
                         hover:bg-red-50 dark:hover:bg-red-900/30"
                title="Delete event"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
            <div className="p-6">
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                {new Date(event.start_date).toLocaleDateString()}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateEventForm
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchEvents}
          userId={user?.id || 0}
        />
      </Modal>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  );
}