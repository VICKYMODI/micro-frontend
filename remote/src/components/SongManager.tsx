import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { AdminSongList } from './AdminSongList';
import { UserSongList } from './UserSongList';

const SongManager: React.FC = () => {
  const { isAdmin } = useAuth();
  console.log("isAdmin",isAdmin)
  return isAdmin ? <AdminSongList /> : <UserSongList />;
};


export default SongManager;

