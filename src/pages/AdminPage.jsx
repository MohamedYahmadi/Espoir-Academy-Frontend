import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Package, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AdminHeader from '@/components/admin/AdminHeader';
import ProductForm from '@/components/admin/ProductForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const AdminPage = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const storedProducts = localStorage.getItem('espoirs_products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  };

  const handleSaveProduct = (productData) => {
    let updatedProducts;
    
    if (editingProduct) {
      updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
      );
      toast({
        title: "Produit mis à jour",
        description: "Le produit a été modifié avec succès",
      });
    } else {
      const newProduct = {
        ...productData,
        id: Date.now()
      };
      updatedProducts = [...products, newProduct];
      toast({
        title: "Produit ajouté",
        description: "Le nouveau produit a été ajouté avec succès",
      });
    }
    
    localStorage.setItem('espoirs_products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = () => {
    if (deleteProduct) {
      const updatedProducts = products.filter(p => p.id !== deleteProduct.id);
      localStorage.setItem('espoirs_products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      
      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé avec succès",
      });
      
      setDeleteProduct(null);
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const startAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  return (
    <>
      <Helmet>
        <title>Administration - ESPOIRS ACADEMY</title>
        <meta name="description" content="Panneau d'administration pour la gestion des produits ESPOIRS ACADEMY" />
      </Helmet>
      <div className="bg-gray-50 min-h-screen">
        <AdminHeader />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestion des Produits</h1>
              <p className="text-gray-600">Gérez votre inventaire et vos stocks</p>
            </div>
            <Button
              onClick={startAdd}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nouveau Produit
            </Button>
          </div>

          {showForm ? (
            <ProductForm
              product={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
            />
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Catégorie
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prix
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Package className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.price} DT
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-semibold ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                          {product.stock} unités
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEdit(product)}
                          className="mr-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteProduct(product)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>

        <AlertDialog open={!!deleteProduct} onOpenChange={() => setDeleteProduct(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteProduct}
                className="bg-red-600 hover:bg-red-700"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default AdminPage;