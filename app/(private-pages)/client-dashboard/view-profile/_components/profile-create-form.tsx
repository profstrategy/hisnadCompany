'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AppHeading } from '@/components/reusables/app-heading';

const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required').nullable(),
  last_name: z.string().min(1, 'Last name is required').nullable(),
  phone_number: z.string().min(1, 'Phone number is required').nullable(),
  address: z.string().min(1, 'Address is required').nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileCreateForm = () => {
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: null,
      last_name: null,
      phone_number: null,
      address: null,
    },
  });

//   useEffect(() => {
//     if (profile?.profile) {
//       form.reset({
//         first_name: profile.profile.first_name ?? null,
//         last_name: profile.profile.last_name ?? null,
//         phone_number: profile.profile.phone_number ?? null,
//         address: profile.profile.address ?? null,
//       });
//     }
//   }, [profile, form]);


//   if (isLoading) {
//     return (
//       <>
//         <div className="flex items-center justify-between">
//           <Skeleton className="h-10 w-[200px]" />
//         </div>
//         <Separator />
//         <div className="w-full space-y-8">
//           <div className="gap-8 md:grid md:grid-cols-2">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="space-y-2">
//                 <Skeleton className="h-4 w-[100px]" />
//                 <Skeleton className="h-10 w-full" />
//               </div>
//             ))}
//           </div>
//           <Skeleton className="h-10 w-[120px] ml-auto" />
//         </div>
//       </>
//     );
//   }

  return (
    <>
      <div className="flex items-center justify-between">
        <AppHeading variant='h3'>Update Your Profile Information</AppHeading>
      </div>
      <Separator />
      <Form {...form}>
        <form
        //   onSubmit={}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-2">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                    //   disabled={isPending}
                      placeholder="John"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                    //   disabled={isPending}
                      placeholder="Doe"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                    //   disabled={isPending}
                      placeholder="+1234567890"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                    //   disabled={isPending}
                      placeholder="123 Main St"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button  className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProfileCreateForm;
