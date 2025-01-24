import React, { useState, useEffect } from 'react';
import { usersAPI } from '../services/api';
import toast from 'react-hot-toast';

interface UserFormProps {
  userData?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UserForm({ userData, onClose, onSuccess }: UserFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'user',
    is_active: true,
  });

  useEffect(() => {
    if (userData) {
      setFormData({ ...userData, password: '' });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'is_active' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (userData) {
        const updateData = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          role: formData.role,
          is_active: Boolean(formData.is_active)
        };

        if (formData.password.trim()) {
          updateData.password = formData.password;
        }

        await usersAPI.update(userData.id, updateData);
        toast.success('User updated successfully');
        onSuccess();
        onClose();
      } else {
        await usersAPI.create({
          ...formData,
          is_active: Boolean(formData.is_active)
        });
        toast.success('User created successfully');
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        {userData ? 'Update User' : 'Add New User'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
          <input
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white 
                     focus:border-blue-500 focus:ring-blue-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
          <input
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white 
                     focus:border-blue-500 focus:ring-blue-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white 
                     focus:border-blue-500 focus:ring-blue-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white 
                     focus:border-blue-500 focus:ring-blue-500 shadow-sm"
            placeholder={userData ? 'Leave blank to keep current password' : ''}
            {...(!userData && { required: true })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white 
                     focus:border-blue-500 focus:ring-blue-500 shadow-sm"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
          <select
            name="is_active"
            value={formData.is_active ? 'true' : 'false'}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white 
                     focus:border-blue-500 focus:ring-blue-500 shadow-sm"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
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
            {userData ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
