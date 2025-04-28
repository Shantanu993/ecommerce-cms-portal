"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Eye } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  status: "active" | "draft" | "archived"
}

// Sample products data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium noise-cancelling wireless headphones",
    price: 199.99,
    image: "/placeholder.svg",
    category: "Electronics",
    status: "active",
  },
  {
    id: "2",
    name: "Digital Marketing Course",
    description: "Comprehensive digital marketing course",
    price: 49.99,
    image: "/placeholder.svg",
    category: "Courses",
    status: "active",
  },
  {
    id: "3",
    name: "Premium Subscription",
    description: "Monthly premium subscription",
    price: 9.99,
    image: "/placeholder.svg",
    category: "Subscriptions",
    status: "draft",
  },
  {
    id: "4",
    name: "Smart Watch",
    description: "Latest generation smart watch with health tracking",
    price: 299.99,
    image: "/placeholder.svg",
    category: "Electronics",
    status: "active",
  },
]

export function RecentProducts() {
  const [displayProducts, setDisplayProducts] = useState(sampleProducts)

  const handleDelete = (id: string) => {
    setDisplayProducts(displayProducts.filter((product) => product.id !== id))
  }

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "draft":
        return "bg-yellow-500"
      case "archived":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {displayProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            <Badge variant="outline" className="absolute top-2 right-2 bg-background">
              <span className={`mr-1 h-2 w-2 rounded-full ${getStatusColor(product.status)}`}></span>
              {product.status}
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <CardDescription>{product.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
            <p className="mt-2 text-lg font-bold">${product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
