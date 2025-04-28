export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  status: "active" | "draft" | "archived"
  inventory: number
  sku: string
}

export interface Category {
  id: string
  name: string
  description: string
  slug: string
  productCount: number
  createdAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
  status: "active" | "inactive" | "suspended"
  avatar: string
  createdAt: Date
}
