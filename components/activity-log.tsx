"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Observer Pattern implementation for activity log
class ActivityObserver {
  private static instance: ActivityObserver
  private observers: Function[] = []
  private activities: Activity[] = []

  private constructor() {
    // Initialize with sample data
    this.activities = sampleActivities
  }

  public static getInstance(): ActivityObserver {
    if (!ActivityObserver.instance) {
      ActivityObserver.instance = new ActivityObserver()
    }
    return ActivityObserver.instance
  }

  subscribe(observer: Function) {
    this.observers.push(observer)
    observer(this.activities)
    return () => {
      this.observers = this.observers.filter((obs) => obs !== observer)
    }
  }

  addActivity(activity: Activity) {
    this.activities = [activity, ...this.activities]
    this.notifyObservers()
  }

  private notifyObservers() {
    this.observers.forEach((observer) => observer(this.activities))
  }
}

interface Activity {
  id: string
  user: {
    name: string
    avatar: string
    initials: string
  }
  action: string
  target: string
  timestamp: Date
  type: "create" | "update" | "delete" | "publish"
}

// Sample activities data
const sampleActivities: Activity[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
    },
    action: "created",
    target: "Summer Collection 2024",
    timestamp: new Date(2023, 3, 15, 14, 30),
    type: "create",
  },
  {
    id: "2",
    user: {
      name: "Jane Smith",
      avatar: "",
      initials: "JS",
    },
    action: "updated",
    target: "Discount Pricing Strategy",
    timestamp: new Date(2023, 3, 15, 13, 15),
    type: "update",
  },
  {
    id: "3",
    user: {
      name: "Mike Johnson",
      avatar: "",
      initials: "MJ",
    },
    action: "deleted",
    target: "Outdated Product SKU-12345",
    timestamp: new Date(2023, 3, 15, 11, 45),
    type: "delete",
  },
  {
    id: "4",
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder-user.jpg",
      initials: "SW",
    },
    action: "published",
    target: "New Homepage Banner",
    timestamp: new Date(2023, 3, 15, 10, 30),
    type: "publish",
  },
  {
    id: "5",
    user: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
    },
    action: "updated",
    target: "Product Description for Wireless Headphones",
    timestamp: new Date(2023, 3, 14, 16, 45),
    type: "update",
  },
  {
    id: "6",
    user: {
      name: "Jane Smith",
      avatar: "",
      initials: "JS",
    },
    action: "created",
    target: "New Category: Smart Home",
    timestamp: new Date(2023, 3, 14, 14, 20),
    type: "create",
  },
  {
    id: "7",
    user: {
      name: "Mike Johnson",
      avatar: "",
      initials: "MJ",
    },
    action: "published",
    target: "Summer Sale Campaign",
    timestamp: new Date(2023, 3, 14, 11, 10),
    type: "publish",
  },
]

function getActivityBadgeColor(type: Activity["type"]) {
  switch (type) {
    case "create":
      return "bg-green-500"
    case "update":
      return "bg-blue-500"
    case "delete":
      return "bg-red-500"
    case "publish":
      return "bg-purple-500"
    default:
      return "bg-gray-500"
  }
}

function formatTimestamp(date: Date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "just now"
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? "s" : ""} ago`
  }
}

export function ActivityLog() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // Subscribe to activity updates using the Observer pattern
    const unsubscribe = ActivityObserver.getInstance().subscribe(setActivities)

    // Simulate new activities being added
    const interval = setInterval(() => {
      const actions = ["created", "updated", "deleted", "published"]
      const types: Activity["type"][] = ["create", "update", "delete", "publish"]
      const targets = [
        "Product Description",
        "Category Structure",
        "Pricing Strategy",
        "Homepage Banner",
        "Featured Products",
        "Discount Rules",
        "Product Images",
      ]
      const users = [
        {
          name: "John Doe",
          avatar: "/placeholder-user.jpg",
          initials: "JD",
        },
        {
          name: "Jane Smith",
          avatar: "",
          initials: "JS",
        },
        {
          name: "Mike Johnson",
          avatar: "",
          initials: "MJ",
        },
        {
          name: "Sarah Williams",
          avatar: "/placeholder-user.jpg",
          initials: "SW",
        },
      ]

      const randomAction = actions[Math.floor(Math.random() * actions.length)]
      const randomType = types[actions.indexOf(randomAction)]
      const randomTarget = targets[Math.floor(Math.random() * targets.length)]
      const randomUser = users[Math.floor(Math.random() * users.length)]

      const newActivity: Activity = {
        id: Date.now().toString(),
        user: randomUser,
        action: randomAction,
        target: randomTarget,
        timestamp: new Date(),
        type: randomType,
      }

      ActivityObserver.getInstance().addActivity(newActivity)
    }, 15000) // Add a new activity every 15 seconds

    return () => {
      unsubscribe()
      clearInterval(interval)
    }
  }, [])

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-2 rounded-lg hover:bg-muted">
            <Avatar className="h-10 w-10">
              <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
              <AvatarFallback>{activity.user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center">
                <p className="text-sm font-medium">{activity.user.name}</p>
                <Badge variant="outline" className="ml-2">
                  <span className={`mr-1 h-2 w-2 rounded-full ${getActivityBadgeColor(activity.type)}`}></span>
                  {activity.action}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{activity.target}</p>
              <p className="text-xs text-muted-foreground">{formatTimestamp(activity.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
