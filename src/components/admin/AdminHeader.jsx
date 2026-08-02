import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminHeader = () => {
  return (
    <header className="bg-black text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-red-600 mr-3" />
            <span className="text-xl font-bold">Administration</span>
          </div>

          <Link to="/">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour au Site
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;