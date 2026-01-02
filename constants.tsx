
import React from 'react';
import { 
  Folder as FolderIcon, 
  Lock, 
  Trash2, 
  Layers, 
  Layout, 
  Database,
  Users,
  MessageCircle,
  Settings
} from 'lucide-react';

export const COLORS = {
  primary: '#EAB308', // Yellow-500
  bg: '#f7f7f7',
  textSecondary: '#6b7280',
};

export const INITIAL_NOTES = [];

export const FOLDERS = [
  { id: 'all', name: 'All', icon: <FolderIcon size={20} />, count: 0 },
  { id: 'uncategorized', name: 'Uncategorized', icon: <Layers size={20} />, count: 0 },
  { id: 'locked', name: 'Locked', icon: <Lock size={20} />, count: 0 },
  { id: 'deleted', name: 'Recently Deleted', icon: <Trash2 size={20} />, count: 0 },
];

export const MORE_ITEMS = [
  { id: 'widgets', name: 'Notes Widgets', icon: <Layout size={20} />, hasNotification: true },
  { id: 'backups', name: 'Local Backups', icon: <Database size={20} /> },
];

export const BOTTOM_NAV = [
  { id: 'fan', name: 'Fan Group', icon: <Users size={24} /> },
  { id: 'feedback', name: 'User Feedback', icon: <MessageCircle size={24} />, hasNotification: true },
  { id: 'settings', name: 'Settings', icon: <Settings size={24} /> },
];
