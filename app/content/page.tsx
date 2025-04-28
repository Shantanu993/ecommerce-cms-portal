import { Button } from "@/components/ui/button"
import { ContentManager } from "@/components/content-manager"
import { Plus } from "lucide-react"

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content</h1>
          <p className="text-muted-foreground">Manage your website content, blog posts, and pages.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Content
        </Button>
      </div>

      <ContentManager />
    </div>
  )
}
