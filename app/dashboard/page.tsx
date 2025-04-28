import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityLog } from "@/components/activity-log"
import { StatisticsCards } from "@/components/statistics-cards"
import { RecentProducts } from "@/components/recent-products"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your e-commerce platform and recent activities.</p>
      </div>

      <StatisticsCards />

      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="products">Recent Products</TabsTrigger>
        </TabsList>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Track all content updates and changes across your platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityLog />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Added Products</CardTitle>
              <CardDescription>The latest products added to your store.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentProducts />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
