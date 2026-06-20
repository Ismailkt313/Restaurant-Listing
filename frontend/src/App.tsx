import { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RestaurantModal from './components/RestaurantModal';
import RestaurantTable from './components/RestaurantTable';
import DeleteDialog from './components/DeleteDialog';
import Toast, { type ToastMessage, type ToastType } from './components/Toast';
import type { Restaurant, RestaurantFormData, FormMode } from './types';
import { restaurantApi } from './api';

let toastId = 0;

export default function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [tableLoading, setTableLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [editTarget, setEditTarget] = useState<Restaurant | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Restaurant | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback((type: ToastType, message: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* Fetch */
  const loadRestaurants = useCallback(async () => {
    setTableLoading(true);
    try {
      const res = await restaurantApi.getAll();
      setRestaurants(res.data ?? []);
    } catch {
      toast('error', 'Could not load restaurants. Is the server running?');
    } finally {
      setTableLoading(false);
    }
  }, [toast]);

  useEffect(() => { loadRestaurants(); }, [loadRestaurants]);

  /* Search filter */
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return restaurants;
    return restaurants.filter((r) =>
      r.name.toLowerCase().includes(q) ||
      r.address.toLowerCase().includes(q) ||
      r.contact_number.toLowerCase().includes(q) ||
      r.email?.toLowerCase().includes(q)
    );
  }, [restaurants, searchQuery]);

  /* Open modal for add */
  const openAdd = () => {
    setFormMode('create');
    setEditTarget(null);
    setModalOpen(true);
  };

  /* Open modal for edit */
  const openEdit = (r: Restaurant) => {
    setFormMode('edit');
    setEditTarget(r);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (formLoading) return;
    setModalOpen(false);
    // Reset edit target after animation
    setTimeout(() => setEditTarget(null), 200);
  };

  /* Submit (create or update) */
  const handleFormSubmit = async (data: RestaurantFormData) => {
    setFormLoading(true);
    const payload = {
      name: data.name,
      address: data.address,
      contact_number: data.contact_number,
    };
    try {
      if (formMode === 'edit' && editTarget) {
        const res = await restaurantApi.update(editTarget.id, payload);
        setRestaurants((prev) => prev.map((r) => r.id === editTarget.id ? res.data : r));
        toast('success', `"${res.data.name}" updated successfully.`);
      } else {
        const res = await restaurantApi.create(payload);
        setRestaurants((prev) => [res.data, ...prev]);
        toast('success', `"${res.data.name}" added successfully.`);
      }
      closeModal();
    } catch (err: any) {
      toast('error', err?.message ?? 'Something went wrong. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  /* Delete */
  const openDelete = (r: Restaurant) => {
    setDeleteTarget(r);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await restaurantApi.delete(deleteTarget.id);
      setRestaurants((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      toast('success', `"${deleteTarget.name}" deleted.`);
      // If editing the deleted entry, close modal too
      if (editTarget?.id === deleteTarget.id) closeModal();
    } catch (err: any) {
      toast('error', err?.message ?? 'Failed to delete restaurant.');
    } finally {
      setDeleteLoading(false);
      setDeleteOpen(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="app">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={restaurants.length}
      />

      <main className="app__main">
        <RestaurantTable
          restaurants={filtered}
          isLoading={tableLoading}
          onAdd={openAdd}
          onEdit={openEdit}
          onDelete={openDelete}
          searchQuery={searchQuery}
        />
      </main>

      <RestaurantModal
        isOpen={modalOpen}
        mode={formMode}
        editingRestaurant={editTarget}
        onSubmit={handleFormSubmit}
        onClose={closeModal}
        isLoading={formLoading}
      />

      <DeleteDialog
        restaurant={deleteTarget}
        isOpen={deleteOpen}
        isLoading={deleteLoading}
        onConfirm={confirmDelete}
        onCancel={() => { if (!deleteLoading) { setDeleteOpen(false); setDeleteTarget(null); } }}
      />

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
