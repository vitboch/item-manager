import React from "react";
import { AddItemForm } from "@/features/add-item";
import { ItemsList } from "@/widgets/items-list";
import { ConfirmationModal } from "@/shared/ui";
import { useItemsManager, useModal } from "@/shared/lib";

/**
 * Main App component
 * Demonstrates FSD architecture with clean separation of concerns
 * Features responsive design and modern UI patterns
 */
export const App: React.FC = () => {
  const {
    items,
    adding,
    removing,
    isEmpty,
    addItem,
    removeItem,
    clearAllItems,
  } = useItemsManager();

  const clearAllModal = useModal();
  const [isClearing, setIsClearing] = React.useState(false);

  // Handle clear all with modal confirmation
  const handleClearAll = async () => {
    setIsClearing(true);
    try {
      await clearAllItems();
      clearAllModal.close();
    } catch (error) {
      console.error("Failed to clear all items:", error);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Item Manager</h1>
              <p className="text-gray-600 mt-1">
                Advanced React TypeScript application with FSD architecture
              </p>
            </div>

            {!isEmpty && (
              <button
                onClick={clearAllModal.open}
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Add Item Form */}
          <AddItemForm onAddItem={addItem} loading={adding} />

          {/* Items List */}
          <ItemsList
            items={items}
            onRemoveItem={removeItem}
            removing={removing}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              Built with React 18, TypeScript, Tailwind CSS, and FSD
              architecture
            </p>
            <p className="mt-1">
              Features: localStorage persistence, performance optimizations, and
              comprehensive testing
            </p>
          </div>
        </div>
      </footer>

      {/* Clear All Confirmation Modal */}
      <ConfirmationModal
        isOpen={clearAllModal.isOpen}
        onClose={clearAllModal.close}
        onConfirm={handleClearAll}
        title="Clear All Items"
        message="Are you sure you want to clear all items? This action cannot be undone and will remove all items from your list."
        confirmText="Clear All"
        cancelText="Cancel"
        variant="danger"
        isLoading={isClearing}
      />
    </div>
  );
};
