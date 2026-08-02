import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProduct } from '@/api/EcommerceApi';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Loader2, ArrowLeft, CheckCircle, Minus, Plus, Heart, Star, Share2, ShieldCheck, Truck } from 'lucide-react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import RelatedProducts from '@/components/store/RelatedProducts';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetch
    const found = MOCK_PRODUCTS.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setSelectedVariant(found.variants[0]);
      setLoading(false);
    } else {
      // Fallback API logic normally here
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product, selectedVariant, quantity, selectedVariant.inventory_quantity);
      toast({ title: "Ajouté au Panier ! 🛒", description: `${quantity} x ${product.title} ajouté.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-red-600 h-12 w-12"/></div>;
  if (!product) return <div className="h-screen flex items-center justify-center">Produit introuvable</div>;

  const isFavorite = isInWishlist(product.id);
  const hasSale = selectedVariant?.sale_price_in_cents !== null;
  const price = hasSale ? selectedVariant.sale_price_formatted : selectedVariant.price_formatted;
  const stock = selectedVariant?.inventory_quantity || 0;

  return (
    <>
      <Helmet>
        <title>{product.title} | ESPOIRS ACADEMY</title>
        <meta name="description" content={product.subtitle} />
      </Helmet>
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 py-8 w-full flex-grow">
          {/* Breadcrumb */}
          <Link to="/store" className="inline-flex items-center text-gray-500 hover:text-black mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Retour à la boutique
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Gallery Section */}
            <div className="space-y-4">
              <motion.div 
                layoutId={`product-img-${product.id}`}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative aspect-square flex items-center justify-center"
              >
                <img 
                  src={product.images[activeImage]?.url || product.image} 
                  alt={product.title} 
                  className="max-h-full max-w-full object-contain drop-shadow-xl"
                />
                {hasSale && <Badge className="absolute top-4 left-4 bg-red-600 text-lg px-3 py-1">PROMO</Badge>}
                <button 
                  onClick={() => toggleWishlist(product)} 
                  className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:scale-105 transition"
                >
                  <Heart className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} />
                </button>
              </motion.div>

              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 rounded-lg border-2 bg-gray-50 p-2 ${activeImage === idx ? 'border-red-600' : 'border-transparent'}`}
                  >
                    <img src={img.url} className="w-full h-full object-contain" alt="" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{product.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">{product.subtitle}</span>
                  <div className="flex items-center text-yellow-500 gap-1">
                     <Star className="fill-current" size={16}/>
                     <span className="font-bold text-black">{product.rating || 'N/A'}</span>
                     <span className="text-gray-400">({product.review_count || 0} avis)</span>
                  </div>
                </div>
                
                <div className="flex items-end gap-4 mb-6">
                  <span className="text-4xl font-bold text-red-600">{price}</span>
                  {hasSale && <span className="text-xl text-gray-400 line-through mb-1">{selectedVariant.price_formatted}</span>}
                </div>
                
                <div className="prose prose-sm text-gray-600 mb-6" dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>

              {/* Selector Section */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-6 mb-6">
                {/* Variants */}
                {product.variants.length > 1 && (
                  <div>
                    <label className="block text-sm font-bold mb-2">Variante</label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map(v => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                            selectedVariant.id === v.id 
                              ? 'bg-black text-white border-black' 
                              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          {v.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Add */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center bg-white border border-gray-200 rounded-lg w-fit">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100"><Minus size={18}/></button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(stock, quantity + 1))} className="p-3 hover:bg-gray-100"><Plus size={18}/></button>
                  </div>
                  <Button 
                    onClick={handleAddToCart} 
                    disabled={stock === 0}
                    className="flex-grow h-12 text-lg bg-red-600 hover:bg-red-700"
                  >
                    <ShoppingCart className="mr-2" /> 
                    {stock > 0 ? 'Ajouter au Panier' : 'Rupture de stock'}
                  </Button>
                </div>

                {/* Stock Indicator */}
                <div className="flex items-center gap-2 text-sm">
                  {stock > 0 
                    ? <><CheckCircle className="text-green-500" size={16}/> <span className="text-green-700 font-medium">En Stock ({stock} disponibles)</span></>
                    : <span className="text-red-500 font-medium">Indisponible pour le moment</span>
                  }
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2"><Truck size={18}/> Livraison rapide 24/48h</div>
                <div className="flex items-center gap-2"><ShieldCheck size={18}/> Garantie satisfait ou remboursé</div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mb-16">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start border-b bg-transparent rounded-none p-0 h-auto gap-8">
                <TabsTrigger value="details" className="text-lg rounded-none border-b-2 border-transparent data-[state=active]:border-red-600 data-[state=active]:bg-transparent px-0 pb-2">Détails du produit</TabsTrigger>
                <TabsTrigger value="shipping" className="text-lg rounded-none border-b-2 border-transparent data-[state=active]:border-red-600 data-[state=active]:bg-transparent px-0 pb-2">Livraison</TabsTrigger>
                <TabsTrigger value="reviews" className="text-lg rounded-none border-b-2 border-transparent data-[state=active]:border-red-600 data-[state=active]:bg-transparent px-0 pb-2">Avis ({product.review_count})</TabsTrigger>
              </TabsList>
              
              <div className="mt-8">
                <TabsContent value="details" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="prose max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: product.description }} />
                </TabsContent>
                <TabsContent value="shipping">
                  <p className="text-gray-600">Livraison standard gratuite pour les commandes de plus de 200 DT. Retours acceptés sous 30 jours.</p>
                </TabsContent>
                <TabsContent value="reviews">
                  <div className="bg-gray-50 p-8 rounded-xl text-center">
                    <p className="text-gray-500 italic">Les avis clients seront bientôt disponibles.</p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Related Products */}
          <RelatedProducts currentProductId={product.id} category={product.subtitle.split(' - ')[0]} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ProductDetailPage;