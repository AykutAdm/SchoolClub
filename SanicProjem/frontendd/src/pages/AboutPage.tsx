import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 
                  dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-gray-900 text-white py-32">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/10" />
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-blue-400 text-lg font-medium mb-4">
            Discover the Future Today
          </div>
          <h1 className="font-['Orbitron'] text-4xl lg:text-6xl font-bold mb-8 tracking-wider leading-tight">
            THKU Science Fiction <br />
            and Fantasy Club
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            BKFT is an enthusiastic student community that comes together to share 
            our passion for science fiction and make new discoveries in this field.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Tarihçe Bölümü */}
        <div className="py-24">
          <div className="bg-gradient-to-r from-blue-900 to-gray-900 rounded-3xl p-12 shadow-lg">
            <div className="max-w-3xl">
              <div className="text-blue-400 text-lg font-medium mb-4">
                From Past to Present
              </div>
              <h2 className="font-['Rajdhani'] text-3xl lg:text-4xl font-bold text-white mb-6">
                Club History
              </h2>
              <div className="space-y-6 text-lg text-gray-300">
                <p>
                  BKFT has hosted numerous events and projects related to the science fiction community over the years. 
                  We continue to grow with a desire to learn and discover more with each step.
                </p>
                <p>
                  Our club has a history filled with innovative projects and events in the field of science fiction.
                  With the events we organize every year, we offer our members unique experiences.
                </p>
              </div>
            </div>

            {/* Aktiviteler Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Uzay Keşifleri */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 
                           hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Space Explorations</h3>
                </div>
                <p className="text-gray-300">
                  Science fiction themed space exploration projects and events.
                </p>
              </div>

              {/* Fantastik Dünyalar */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 
                           hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Film Discoveries</h3>
                </div>
                <p className="text-gray-300">
                  Journeys to the world of science fiction movies.
                </p>
              </div>

              {/* Edebiyat Kulübü */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 
                           hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Literature Club</h3>
                </div>
                <p className="text-gray-300">
                  Discussions and reading groups on science fiction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Misyon ve Vizyon Bölümü */}
        <div className="py-24">
          <div className="bg-gradient-to-r from-blue-900 to-gray-900 rounded-3xl p-12 shadow-lg">
            <h2 className="font-['Rajdhani'] text-4xl lg:text-5xl font-bold text-center text-white mb-8">
              Our Mission and Vision
            </h2>
            <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto mb-16">
              As BKFT, we encourage creativity and innovation in the field of science fiction. 
              We aim to undertake larger projects in the future.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/*  Writing */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 
                           hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Writing</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Writing and developing science fiction stories.
                </p>
                <div className="bg-blue-500/20 rounded-full px-4 py-2 inline-flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                  <span className="text-sm font-medium text-blue-300">90%</span>
                </div>
              </div>

              {/* Technology and Innovation */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 
                           hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Technology and Innovation</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Discovering and applying new technologies.
                </p>
                <div className="bg-blue-500/20 rounded-full px-4 py-2 inline-flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                  <span className="text-sm font-medium text-blue-300">85%</span>
                </div>
              </div>

              {/* Topluluk Yönetimi */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 
                           hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Community Management</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Building a strong community among our members.
                </p>
                <div className="bg-blue-500/20 rounded-full px-4 py-2 inline-flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                  <span className="text-sm font-medium text-blue-300">95%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ekip Bölümü */}
        <div className="py-24">
          <div className="bg-gradient-to-r from-blue-900 to-gray-900 rounded-3xl p-12 shadow-lg">
            <h2 className="font-['Rajdhani'] text-4xl lg:text-5xl font-bold text-center text-white mb-8">
              Meet Our Team
            </h2>
            <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto mb-16">
              BKFT's creative and passionate team is working to open new horizons in the science fiction community.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 
                           hover:bg-white/20 transition-all duration-300">
                <div className="space-y-6">
                  <div className="aspect-square overflow-hidden rounded-xl">
                    <img 
                      src="/images/team/1.jpg" 
                      alt="Kulüp Başkanı" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Fatih Ünal
                    </h3>
                    <p className="text-blue-400 font-medium mb-4">
                      Club Admin
                    </p>
                    <p className="text-gray-300">
                      Fatih is a visionary leader who guides our club with his passion for science fiction.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 
                           hover:bg-white/20 transition-all duration-300">
                <div className="space-y-6">
                  <div className="aspect-square overflow-hidden rounded-xl">
                    <img 
                      src="/images/team/2.jpg" 
                      alt="Etkinlik Koordinatörü" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Batuhan Elitok
                    </h3>
                    <p className="text-blue-400 font-medium mb-4">
                      Event Coordinator
                    </p>
                    <p className="text-gray-300">
                      Batuhan offers unforgettable experiences to our members by organizing creative events and projects.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 
                           hover:bg-white/20 transition-all duration-300">
                <div className="space-y-6">
                  <div className="aspect-square overflow-hidden rounded-xl">
                    <img 
                      src="/images/team/3.jpg" 
                      alt="Teknoloji Uzmanı" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Aykut Adem
                    </h3>
                    <p className="text-blue-400 font-medium mb-4">
                      Technology Expert
                    </p>
                    <p className="text-gray-300">
                      Aykut develops innovative solutions that strengthen the technological infrastructure of our club.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dekoratif Elementler */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Sol üst blur */}
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-blue-200 dark:bg-blue-500/20 
                      rounded-full blur-3xl opacity-30 dark:opacity-20" />
        
        {/* Sağ alt blur */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-purple-200 dark:bg-purple-500/20 
                      rounded-full blur-3xl opacity-30 dark:opacity-20" />
      </div>
    </div>
  );
} 