import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function TabsExample() {
     return (
          <Tabs defaultValue="overview" className="w-full">
               <TabsList className="w-full justify-start space-x-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
               </TabsList>
               <TabsContent value="overview">
                    <div className="p-4 rounded-lg bg-gray-900/40 backdrop-blur-xl border border-white/10 mt-4">
                         <h3 className="text-lg font-medium text-white mb-2">Overview</h3>
                         <p className="text-gray-400">
                              This is the overview content section.
                         </p>
                    </div>
               </TabsContent>
               <TabsContent value="analytics">
                    <div className="p-4 rounded-lg bg-gray-900/40 backdrop-blur-xl border border-white/10 mt-4">
                         <h3 className="text-lg font-medium text-white mb-2">Analytics</h3>
                         <p className="text-gray-400">
                              View your analytics data here.
                         </p>
                    </div>
               </TabsContent>
               <TabsContent value="reports">
                    <div className="p-4 rounded-lg bg-gray-900/40 backdrop-blur-xl border border-white/10 mt-4">
                         <h3 className="text-lg font-medium text-white mb-2">Reports</h3>
                         <p className="text-gray-400">
                              Generate and view reports.
                         </p>
                    </div>
               </TabsContent>
               <TabsContent value="settings">
                    <div className="p-4 rounded-lg bg-gray-900/40 backdrop-blur-xl border border-white/10 mt-4">
                         <h3 className="text-lg font-medium text-white mb-2">Settings</h3>
                         <p className="text-gray-400">
                              Manage your preferences and settings.
                         </p>
                    </div>
               </TabsContent>
          </Tabs>
     );
} 