const RestaurantChangeModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  currentRestaurant, 
  newRestaurant 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-2xl border border-gray-200 pointer-events-auto">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Items already in cart
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your cart contains items from <span className="font-semibold">{currentRestaurant}</span>. 
            Do you want to discard the selection and add items from <span className="font-semibold">{newRestaurant}</span>?
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
          >
            NO
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer"
          >
            YES, START AFRESH
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantChangeModal;