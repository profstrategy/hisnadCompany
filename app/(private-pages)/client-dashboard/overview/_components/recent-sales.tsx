'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export function RecentSales({ type }: { type: string }) {
//   const { data, isLoading } = useGetRecentPayments(type);

//   if (isLoading) {
//     return (
//       <div className="space-y-8">
//         {[...Array(5)].map((_, i) => (
//           <div key={i} className="flex items-center">
//             <Skeleton className="h-9 w-9 rounded-full bg-white" />
//             <div className="ml-4 space-y-1">
//               <Skeleton className="h-4 w-[200px] bg-white" />
//               <Skeleton className="h-4 w-[150px] bg-white" />
//             </div>
//             <div className="ml-auto">
//               <Skeleton className="h-6 w-[80px] rounded-full bg-white" />
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

  return (
    <div className="space-y-8">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>TX</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
             
            </p>
            <p className="text-sm text-muted-foreground">
              
            </p>
          </div>
          <div className="ml-auto">
            <span
              className={`rounded-full px-2 py-1 text-xs`}
            >
             
            </span>
          </div>
        </div>

      {/* {!data?.payments?.length && (
        <div className="text-center text-sm text-muted-foreground">
          No recent payments found
        </div>
      )} */}
    </div>
  );
}
