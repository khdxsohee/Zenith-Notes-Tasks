
import React from 'react';

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  isLocked?: boolean;
  isDeleted?: boolean;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  reminder?: string;
}

export type AppTab = 'Notes' | 'Tasks';

export interface Folder {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
  isSystem?: boolean;
}
