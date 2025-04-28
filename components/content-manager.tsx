"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, MoreHorizontal, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Content, ContentFactory, type ContentProps } from "@/lib/content-factory"

// Sample content data
const sampleContentData: (ContentProps & { type: string })[] = [
  {
    id: "1",
    title: "Welcome to Our Store",
    description: "Homepage welcome message",
    content: "<h1>Welcome to our store</h1><p>Find the best products at the best prices.</p>",
    author: "John Doe",
    createdAt: new Date(2023, 2, 15),
    updatedAt: new Date(2023, 3, 10),
    status: "published",
    type: "page",
  },
  {
    id: "2",
    title: "Summer Collection 2024",
    description: "Blog post about the new summer collection",
    content: "<h1>Summer Collection 2024</h1><p>Check out our new summer collection.</p>",
    author: "Jane Smith",
    createdAt: new Date(2023, 3, 5),
    updatedAt: new Date(2023, 3, 5),
    status: "published",
    type: "blog",
  },
  {
    id: "3",
    title: "Special Discount",
    description: "Banner for special discount",
    content: "<h2>Special Discount</h2><p>Get 20% off on all products.</p>",
    author: "Marketing Team",
    createdAt: new Date(2023, 3, 10),
    updatedAt: new Date(2023, 3, 12),
    status: "published",
    type: "banner",
  },
  {
    id: "4",
    title: "About Us",
    description: "About us page",
    content: "<h1>About Us</h1><p>Learn more about our company and mission.</p>",
    author: "John Doe",
    createdAt: new Date(2023, 1, 20),
    updatedAt: new Date(2023, 2, 15),
    status: "published",
    type: "page",
  },
  {
    id: "5",
    title: "How to Choose the Right Product",
    description: "Blog post with buying guide",
    content:
      "<h1>How to Choose the Right Product</h1><p>Follow these tips to choose the right product for your needs.</p>",
    author: "Jane Smith",
    createdAt: new Date(2023, 2, 25),
    updatedAt: new Date(2023, 2, 25),
    status: "draft",
    type: "blog",
  },
  {
    id: "6",
    title: "Flash Sale",
    description: "Banner for flash sale",
    content: "<h2>Flash Sale</h2><p>24 hours only! Get up to 50% off.</p>",
    author: "Marketing Team",
    createdAt: new Date(2023, 3, 14),
    updatedAt: new Date(2023, 3, 14),
    status: "draft",
    type: "banner",
  },
]

// Create content objects using the factory
const contentItems = sampleContentData.map((item) => {
  const { type, ...props } = item
  return ContentFactory.createContent(type, props)
})

export function ContentManager() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [contents, setContents] = useState<Content[]>(contentItems)

  const filteredContents = contents.filter((content) => {
    if (activeTab !== "all" && content.getType() !== activeTab) {
      return false
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        content.title.toLowerCase().includes(query) ||
        content.description.toLowerCase().includes(query) ||
        content.author.toLowerCase().includes(query)
      )
    }

    return true
  })

  const handleDelete = (id: string) => {
    setContents(contents.filter((content) => content.id !== id))
  }

  const getStatusColor = (status: Content["status"]) => {
    switch (status) {
      case "published":
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
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search content..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="page">Pages</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="banner">Banners</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContents.map((content) => (
                    <TableRow key={content.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{content.title}</div>
                          <div className="text-sm text-muted-foreground">{content.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{content.getType()}</Badge>
                      </TableCell>
                      <TableCell>{content.author}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          <span className={`mr-1 h-2 w-2 rounded-full ${getStatusColor(content.status)}`}></span>
                          {content.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{content.updatedAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Publish</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(content.id)}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
