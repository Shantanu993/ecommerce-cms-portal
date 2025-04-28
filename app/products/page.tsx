"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ProductsTable } from "@/components/products-table"
import { AddEditProductModal } from "@/components/add-edit-product-modal"
import type { Product } from "@/lib/types"

// Sample products data
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones",
    price: 199.99,
    image: "/placeholder.svg",
    category: "Electronics",
    status: "active",
    inventory: 45,
    sku: "WH-001",
  },
  {
    id: "2",
    name: "Digital Marketing Course",
    description: "Comprehensive digital marketing course",
    price: 49.99,
    image: "/placeholder.svg",
    category: "Courses",
    status: "active",
    inventory: 999,
    sku: "DMC-002",
  },
  {
    id: "3",
    name: "Premium Subscription",
    description: "Monthly premium subscription",
    price: 9.99,
    image: "/placeholder.svg",
    category: "Subscriptions",
    status: "draft",
    inventory: 999,
    sku: "PS-003",
  },
  {
    id: "4",
    name: "Smart Watch",
    description: "Latest generation smart watch with health tracking",
    price: 299.99,
    image: "/placeholder.svg",
    category: "Electronics",
    status: "active",
    inventory: 28,
    sku: "SW-004",
  },
  {
    id: "5",
    name: "Organic Cotton T-Shirt",
    description: "Eco-friendly cotton t-shirt",
    price: 24.99,
    image: "/placeholder.svg",
    category: "Apparel",
    status: "active",
    inventory: 120,
    sku: "TS-005",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleAddProduct = (product: Product) => {
    const newProduct = {
      ...product,
      id: (Math.max(...products.map((p) => Number.parseInt(p.id))) + 1).toString(),
    }
    setProducts([...products, newProduct])
    setIsAddModalOpen(false)
  }

  const handleEditProduct = (product: Product) => {
    setProducts(products.map((p) => (p.id === product.id ? product : p)))
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog and inventory.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <ProductsTable products={products} onEdit={setEditingProduct} onDelete={handleDeleteProduct} />

      <AddEditProductModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSave={handleAddProduct} />

      {editingProduct && (
        <AddEditProductModal
          open={!!editingProduct}
          onOpenChange={() => setEditingProduct(null)}
          product={editingProduct}
          onSave={handleEditProduct}
        />
      )}
    </div>
  )
}
