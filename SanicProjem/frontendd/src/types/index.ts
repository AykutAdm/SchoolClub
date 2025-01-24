export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: 'admin' | 'user';
    is_active: boolean;
    created_at: string;
  }
  
  export interface Event {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    created_by: number;
    created_at: string;
  }
  
  export interface Announcement {
    id: number;
    title: string;
    content: string;
    created_by: number;
    created_at: string;
  }