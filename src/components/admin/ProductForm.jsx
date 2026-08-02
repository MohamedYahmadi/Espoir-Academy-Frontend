import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'Football',
    price: product?.price || '',
    stock: product?.stock || '',
    image: product?.image || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {product ? 'Modifier le Produit' : 'Nouveau Produit'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nom du Produit
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
          >
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Tennis">Tennis</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Prix (DT)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              required
              min="0"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Description de l'Image
          </label>
          <textarea
            id="image"
            name="image"
            required
            rows="3"
            value={formData.image}
            onChange={handleChange}
            placeholder="Décrivez l'image du produit..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3"
          >
            {product ? 'Mettre à Jour' : 'Ajouter le Produit'}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex-1 py-3"
          >
            Annuler
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProductForm;