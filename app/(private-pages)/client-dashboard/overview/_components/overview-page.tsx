'use client';
import React from 'react';
import PageContainer from '@/components/layout/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { PROPERTY_TYPES } from '@/constants/generic';
import { RecentSales } from './recent-sales';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { removeNoneAlphanumericEntity } from '@/_lib/utils';

export default function OverViewPage() {
  const { data: session } = useSession();
  const [ mounted, setMounted ] = React.useState('')
  const router = useRouter();

  React.useEffect(() => {
  setMounted(removeNoneAlphanumericEntity(session?.user.property_type ?? ''))
  console.log(mounted)
    
  },[session?.user.property_type ?? ''])

  const renderCardSkeleton = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-[120px] mb-2" />
        <Skeleton className="h-3 w-[140px]" />
      </CardContent>
    </Card>
  );

  // const renderSkeletonGrid = () => (
  //   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  //     {[1, 2, 3, 4].map((i) => renderCardSkeleton())}
  //   </div>
  // );

  return (
    <PageContainer scrollable>

      <div className="space-y-2 relative">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi {session?.user?.firstName ?? ''}, Welcome back
            👋
          </h2>
        </div>
        <Tabs defaultValue={mounted || 'HISNAD ESTATE'} onValueChange={setMounted} className="space-y-4">
          <TabsList>
            <TabsTrigger
              value={`${removeNoneAlphanumericEntity(PROPERTY_TYPES.HISNAD)}`}
              className="data-[state=active]:bg-white"
            >
              {`${removeNoneAlphanumericEntity(PROPERTY_TYPES.HISNAD)}`}
            </TabsTrigger>
            <TabsTrigger
              value={`${removeNoneAlphanumericEntity(PROPERTY_TYPES.FEATURED)}`}
              className="data-[state=active]:bg-white"
            >
              {`${removeNoneAlphanumericEntity(PROPERTY_TYPES.FEATURED)}`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={`${removeNoneAlphanumericEntity(PROPERTY_TYPES.HISNAD) ?? ''}`} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* one */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Hajj Total Savings
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₦'0.00'
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Total amount invested so far
                    </p>
                  </CardContent>
                </Card>

                {/* two */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Real-estate Savings Target
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₦'0.00'
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Target amount to be saved
                    </p>
                  </CardContent>
                </Card>

                {/* four */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Real-Estate Savings Progress
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                    0
                      %
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Percentage of Real estate target reached
                    </p>
                  </CardContent>
                </Card>

                {/* five */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Next Real estate Payment Due
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">--/--/----</div>
                    <p className="text-xs text-muted-foreground">
                      Next scheduled real estate payment date
                    </p>
                  </CardContent>
                </Card>
              </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4" id="demo-video">
               
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Real estate Transactions</CardTitle>
                  <CardDescription>
                    Summary of your recent package payment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales type={removeNoneAlphanumericEntity(PROPERTY_TYPES.HISNAD)} />
       )         </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value={removeNoneAlphanumericEntity(PROPERTY_TYPES.FEATURED)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Agriculture Total Savings
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₦'0.00'
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Total amount invested for Agriculture
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Agriculture Target
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₦'0.00'
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Target amount for Agriculture
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Agriculture Progress
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                    0
                      %
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Percentage of Agriculture target reached
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Next Agriculture Payment
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">--/--/----</div>
                    <p className="text-xs text-muted-foreground">
                      Next scheduled Umrah payment
                    </p>
                  </CardContent>
                </Card>
              </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4" id="demo-video">
                
              </div>
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Agriculture Transactions</CardTitle>
                  <CardDescription>
                    View Your recent package payment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales type={removeNoneAlphanumericEntity(PROPERTY_TYPES.FEATURED)} />
     )           </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
