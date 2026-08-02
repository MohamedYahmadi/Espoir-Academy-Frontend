import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StoreHeader = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour
            </Button>
            <span className="text-2xl font-bold text-red-600">ESPOIRS</span>
            <span className="text-2xl font-bold text-black ml-2">ACADEMY</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-gray-700">Boutique Sportive</span>
            <Button
              variant="outline"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default StoreHeader;