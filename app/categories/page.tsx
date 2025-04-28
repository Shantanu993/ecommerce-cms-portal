"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CategoriesTable } from "@/components/categories-table"
import { AddEditCategoryModal } from "@/components/add-edit-category-modal"
import type { Category } from "@/lib/types"

// Sample categories data
const initialCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Electronic devices and accessories",
    slug: "electronics",
    productCount: 45,
    createdAt: new Date(2023, 1, 15),
  },
  {
    id: "2",
    name: "Apparel",
    description: "Clothing and fashion accessories",
    slug: "apparel",
    productCount: 78,
    createdAt: new Date(2023, 2, 10),
  },
  {
    id: "3",
    name: "Home & Garden",
    description: "Products for home and garden",
    slug: "home-garden",
    productCount: 32,
    createdAt: new Date(2023, 3, 5),
  },
  {
    id: "4",
    name: "Courses",
    description: "Digital learning courses",
    slug: "courses",
    productCount: 15,
    createdAt: new Date(2023, 4, 20),
  },
  {
    id: "5",
    name: "Subscriptions",
    description: "Subscription-based products and services",
    slug: "subscriptions",
    productCount: 8,
    createdAt: new Date(2023, 5, 12),
  },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const handleAddCategory = (category: Category) => {
    const newCategory = {
      ...category,
      id: (Math.max(...categories.map((c) => Number.parseInt(c.id))) + 1).toString(),
      createdAt: new Date(),
      productCount: 0,
    }
    setCategories([...categories, newCategory])
    setIsAddModalOpen(false)
  }

  const handleEditCategory = (category: Category) => {
    setCategories(categories.map((c) => (c.id === category.id ? category : c)))
    setEditingCategory(null)
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage product categories for your store.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <CategoriesTable categories={categories} onEdit={setEditingCategory} onDelete={handleDeleteCategory} />

      <AddEditCategoryModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSave={handleAddCategory} />

      {editingCategory && (
        <AddEditCategoryModal
          open={!!editingCategory}
          onOpenChange={() => setEditingCategory(null)}
          category={editingCategory}
          onSave={handleEditCategory}
        />
      )}
    </div>
  )
}
