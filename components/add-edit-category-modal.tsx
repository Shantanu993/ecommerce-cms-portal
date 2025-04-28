"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Category } from "@/lib/types"

interface AddEditCategoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category | null
  onSave: (category: Category) => void
}

const defaultCategory: Omit<Category, "id" | "createdAt" | "productCount"> = {
  name: "",
  description: "",
  slug: "",
}

export function AddEditCategoryModal({ open, onOpenChange, category = null, onSave }: AddEditCategoryModalProps) {
  const [formData, setFormData] = useState<Omit<Category, "id" | "createdAt" | "productCount">>(defaultCategory)
  const isEditing = !!category

  useEffect(() => {
    if (category) {
      const { id, createdAt, productCount, ...rest } = category
      setFormData(rest)
    } else {
      setFormData(defaultCategory)
    }
  }, [category])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")

    setFormData((prev) => ({
      ...prev,
      slug,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing && category) {
      onSave({
        ...category,
        ...formData,
      })
    } else {
      onSave({
        ...formData,
        id: "",
        createdAt: new Date(),
        productCount: 0,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Category" : "Add New Category"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Make changes to the category here. Click save when you're done."
                : "Fill in the details for the new category. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => !formData.slug && generateSlug()}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug">Slug</Label>
                <Button type="button" variant="outline" size="sm" onClick={generateSlug}>
                  Generate
                </Button>
              </div>
              <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
