"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { UsersTable } from "@/components/users-table"
import { AddEditUserModal } from "@/components/add-edit-user-modal"
import type { User } from "@/lib/types"

// Sample users data
const initialUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    avatar: "/placeholder-user.jpg",
    createdAt: new Date(2023, 1, 15),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "editor",
    status: "active",
    avatar: "",
    createdAt: new Date(2023, 2, 10),
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "viewer",
    status: "inactive",
    avatar: "",
    createdAt: new Date(2023, 3, 5),
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "editor",
    status: "active",
    avatar: "/placeholder-user.jpg",
    createdAt: new Date(2023, 4, 20),
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "viewer",
    status: "active",
    avatar: "",
    createdAt: new Date(2023, 5, 12),
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const handleAddUser = (user: User) => {
    const newUser = {
      ...user,
      id: (Math.max(...users.map((u) => Number.parseInt(u.id))) + 1).toString(),
      createdAt: new Date(),
    }
    setUsers([...users, newUser])
    setIsAddModalOpen(false)
  }

  const handleEditUser = (user: User) => {
    setUsers(users.map((u) => (u.id === user.id ? user : u)))
    setEditingUser(null)
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <UsersTable users={users} onEdit={setEditingUser} onDelete={handleDeleteUser} />

      <AddEditUserModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSave={handleAddUser} />

      {editingUser && (
        <AddEditUserModal
          open={!!editingUser}
          onOpenChange={() => setEditingUser(null)}
          user={editingUser}
          onSave={handleEditUser}
        />
      )}
    </div>
  )
}
