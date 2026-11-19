'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const InquiryContext = createContext();

const STORAGE_KEY = 'myka_fashion_inquiry_list_v1';

export function InquiryProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load items from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not read inquiry list from localStorage', e);
    }
    setIsInitialized(true);
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save inquiry list to localStorage', e);
    }
  }, [items, isInitialized]);

  // Toast helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  /**
   * Add a product to the inquiry list
   */
  const addToInquiry = (product, quantity = null, color = null, isSample = false) => {
    const qtyToAdd = Number(quantity) || Number(product.moq) || 50;
    const chosenColor = color || (product.colors && product.colors[0]?.name) || 'Standard';

    setItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (it) => it.sku === product.sku && it.color === chosenColor && it.isSample === isSample
      );

      if (existingIdx !== -1) {
        const updated = [...prevItems];
        updated[existingIdx].quantity += qtyToAdd;
        return updated;
      } else {
        const newItem = {
          id: `${product.sku}-${Date.now()}`,
          sku: product.sku,
          name: product.name,
          category: product.category,
          fabric: product.fabric,
          moq: product.moq,
          priceDisplay: product.priceDisplay,
          image: (product.images && product.images[0]) || '',
          quantity: qtyToAdd,
          color: chosenColor,
          notes: '',
          isSample: Boolean(isSample)
        };
        return [...prevItems, newItem];
      }
    });

    showToast(
      isSample
        ? `Sample for ${product.name} added to your inquiry shortlist.`
        : `${product.name} (${qtyToAdd} pcs) added to inquiry shortlist.`
    );
  };

  /**
   * Update quantity of an item
   */
  const updateQuantity = (itemId, newQty) => {
    const qty = Math.max(1, parseInt(newQty, 10) || 1);
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, quantity: qty } : it))
    );
  };

  /**
   * Update custom color or styling notes for an item
   */
  const updateItemNotes = (itemId, notes) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, notes } : it))
    );
  };

  /**
   * Update chosen color
   */
  const updateItemColor = (itemId, color) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, color } : it))
    );
  };

  /**
   * Remove an item from the shortlist
   */
  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((it) => it.id !== itemId));
    showToast('Item removed from inquiry shortlist.');
  };

  /**
   * Clear all items
   */
  const clearInquiry = () => {
    setItems([]);
    showToast('Inquiry shortlist cleared.');
  };

  // Total count of distinct styles or total units
  const totalItemsCount = items.length;
  const totalGarmentUnits = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  return (
    <InquiryContext.Provider
      value={{
        items,
        addToInquiry,
        updateQuantity,
        updateItemNotes,
        updateItemColor,
        removeItem,
        clearInquiry,
        totalItemsCount,
        totalGarmentUnits,
        isDrawerOpen,
        setIsDrawerOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
}
