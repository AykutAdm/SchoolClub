import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import { eventsAPI } from '../services/api';
import { Event } from '../types';
import { Calendar, BookOpen, Users, ArrowRight, ChevronDown } from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export default function HomePage({ onPageChange }: HomePageProps) {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const allEvents = await eventsAPI.getAll();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const futureEvents = allEvents
          .filter(event => new Date(event.start_date) >= today)
          .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

        const twoDaysFromNow = new Date(today);
        twoDaysFromNow.setDate(today.getDate() + 2);

        const nearEvents = futureEvents.filter(event => 
          new Date(event.start_date) <= twoDaysFromNow
        );

        setUpcomingEvents(nearEvents.length > 0 ? nearEvents : futureEvents.slice(0, 3));
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Carousel */}
        <div className="absolute inset-0 z-0">
          <Carousel className="absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        {/* İçerik - */}
        <div className="relative z-10 min-h-screen flex items-center pointer-events-auto">
          <div className="container mx-auto px-6">
            {/* Ana Başlık ve İçerik */}
            <div className="max-w-3xl lg:ml-12">
              <h1 className="font-['Chakra_Petch'] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 
                           tracking-normal leading-normal select-text space-y-2">
                <div>Welcome to the THKU Science </div>
                <div>Fiction and Fantasy Community</div>
              </h1>
              <p className="text-base sm:text-lg text-white/90 mb-10 leading-relaxed 
                         font-medium max-w-2xl select-text">
                Expand your imagination with BKFT and 
                dive into the depths of the science fiction and fantasy community. 
                Our club is waiting for you to explore these magical worlds!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onPageChange('about')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 
                           rounded-lg font-semibold transition-all duration-300 
                           transform hover:scale-105 shadow-xl text-sm sm:text-base relative"
                >
                  About the Club
                </button>
                <button 
                  onClick={() => onPageChange('events')}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white 
                           px-7 py-3 rounded-lg font-semibold transition-all duration-300 
                           transform hover:scale-105 shadow-xl border border-white/20 
                           text-sm sm:text-base flex items-center gap-2 relative"
                >
                  Discover Our Events
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Üyelik Avantajları Section */}
      <div className="bg-gradient-to-br from-gray-900 to-blue-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-['Orbitron'] text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 
                           tracking-normal leading-relaxed space-y-2">
                <div>BKFT Membership</div>
                <div>Advantages</div>
              </h2>
              <p className="text-base sm:text-lg text-blue-100 mb-10">
              Step into the world of science fiction and fantasy, join our events, 
              and become part of our club by making new friends!
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg
                             font-semibold transition-all duration-300 transform hover:scale-105
                             flex items-center gap-2 text-sm sm:text-base"> 
                Join Now
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Etkinlik Katılımı */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 
                          hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-blue-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Event Participation</h3>
                <p className="text-blue-100">
                  An opportunity to join our special events and workshops.
                </p>
              </div>

              {/* Özel İçerikler */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 
                          hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-blue-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Special Contents</h3>
                <p className="text-blue-100">
                  Access to content exclusive to our members only.
                </p>
              </div>

              {/* Topluluk Desteği */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 
                          hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-blue-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Community Support</h3>
                <p className="text-blue-100">
                  An opportunity to meet and interact with people with similar interests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-gray-100 dark:bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-['Orbitron'] text-2xl sm:text-3xl lg:text-4xl font-bold 
                           text-gray-900 dark:text-white tracking-normal leading-relaxed">
                Upcoming Events
              </h2>
              <Calendar className="h-8 w-8 text-blue-500 dark:text-blue-400" />
            </div>
            
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <div key={event.id} 
                       className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl 
                                transition-all duration-300 transform hover:-translate-y-1">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900 rounded-full px-4 py-1">
                          <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                            {new Date(event.start_date).toLocaleDateString('tr-TR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(event.start_date).toLocaleTimeString('tr-TR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  There are no upcoming events at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* İletişim Section */}
      <div className="bg-gradient-to-br from-gray-900 to-blue-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Sol taraf - Metin */}
            <div>
              <h2 className="font-['Orbitron'] text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 
                           tracking-normal leading-relaxed space-y-2">
                <div>Contact US</div>
              </h2>
              <p className="text-base sm:text-lg text-blue-100 mb-10">
                Contact us to learn more about the science fiction 
                and fantasy community or to join our events.
              </p>
            </div>

            {/* Sağ taraf - İletişim Bilgileri */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Ofis Saatleri */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
                  Office Hours 
                </h3>
                <p className="text-base sm:text-lg text-white">
                  Monday-Friday<br />9:00 - 18:00
                </p>
              </div>

              {/* E-Mail */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
                  Our E-Mail Adress
                </h3>
                <p className="text-base sm:text-lg text-white">
                  thkubkft@gmail.com
                </p>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
                  Adress
                </h3>
                <div className="space-y-2">
                  <p className="text-base sm:text-lg text-white">
                    Bahçekapı, Okul Sk. No:11,
                  </p>
                  <p className="text-base sm:text-lg text-white">
                    06790 Etimesgut/Ankara
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* İletişim Butonu */}
  
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} BKFT Club. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}