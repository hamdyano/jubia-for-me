/*import { useState, useEffect, useCallback } from 'react';
import {
  fetchMediaSettings,
  createMediaSetting,
  updateMediaSetting,
  deleteMediaSetting,
  reorderMediaSettings,
  MediaSetting
} from '@/APIs/media-settings';

export const useMediaSettings = () => {
  const [mediaSettings, setMediaSettings] = useState<MediaSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortModifications, setSortModifications] = useState<Record<number, number>>({});
  
  // Fetch all media settings
  const loadMediaSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMediaSettings();
      setMediaSettings(data);
      
      // Initialize sorting state
      const initialSorting = data.reduce((acc, setting) => {
        acc[setting.id] = setting.sorting;
        return acc;
      }, {} as Record<number, number>);
      setSortModifications(initialSorting);
    } catch (err: any) {
      setError(err.message || 'Failed to load media settings');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize
  useEffect(() => {
    loadMediaSettings();
  }, [loadMediaSettings]);

  // Create new setting
  const addMediaSetting = async (data: Omit<MediaSetting, 'id'>) => {
    try {
      const newSetting = await createMediaSetting(data);
      setMediaSettings(prev => [...prev, newSetting]);
      
      // Add new sorting entry
      setSortModifications(prev => ({
        ...prev,
        [newSetting.id]: newSetting.sorting
      }));
      
      return newSetting;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to add media setting');
    }
  };

  // Update setting
  const updateSetting = async (id: number, updates: Partial<MediaSetting>) => {
    try {
      await updateMediaSetting(id, updates);
      setMediaSettings(prev => 
        prev.map(setting => setting.id === id ? {...setting, ...updates} : setting)
      );
      
      // Update sorting if changed
      if (updates.sorting !== undefined) {
        setSortModifications(prev => ({
          ...prev,
          [id]: updates.sorting!
        }));
      }
    } catch (err: any) {
      throw new Error(err.message || 'Failed to update media setting');
    }
  };

  // Delete setting
  const removeMediaSetting = async (id: number) => {
    try {
      await deleteMediaSetting(id);
      setMediaSettings(prev => prev.filter(setting => setting.id !== id));
      
      // Remove sorting entry
      setSortModifications(prev => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
    } catch (err: any) {
      throw new Error(err.message || 'Failed to delete media setting');
    }
  };

  // Reorder settings
  const reorderSettings = async (orders: Record<number, number>) => {
    try {
      await reorderMediaSettings(orders);
      setMediaSettings(prev => 
        prev.map(setting => ({
          ...setting, 
          sorting: orders[setting.id] || setting.sorting
        }))
      );
      setSortModifications(orders);
    } catch (err: any) {
      throw new Error(err.message || 'Failed to reorder media settings');
    }
  };

  // Check if modifications exist
  const hasModifications = () => {
    return mediaSettings.some(setting => 
      setting.sorting !== sortModifications[setting.id]
    );
  };

  // Save sorting modifications
  const saveSorting = async () => {
    await reorderSettings(sortModifications);
  };

  // Reset sorting modifications
  const resetSorting = () => {
    const originalSorting = mediaSettings.reduce((acc, setting) => {
      acc[setting.id] = setting.sorting;
      return acc;
    }, {} as Record<number, number>);
    setSortModifications(originalSorting);
  };

  // Update sorting value
  const updateSortValue = (id: number, value: number) => {
    setSortModifications(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return {
    mediaSettings,
    loading,
    error,
    sortModifications,
    hasModifications,
    addMediaSetting,
    updateSetting,
    removeMediaSetting,
    saveSorting,
    resetSorting,
    updateSortValue,
    refresh: loadMediaSettings
  };
};*/