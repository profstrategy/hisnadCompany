// import { Subscriptions } from "@/constants/types";
// import { supabaseAdmin } from "./supabase";

// export const getSubscriptionByInitializedPaymentId = async (id: string) => {
//     try {
//         const { data: subscription, error } = await supabaseAdmin
//             .from('subscriptions')
//             .select('*')
//             .eq('initialized_payment_id', id)
//             .single();

//         if (error) {
//             console.error("Supabase error:", error);
//             throw new Error(`Database error: ${error.message}`);
//         }

//         if (!subscription) {
//             throw new Error("Subscription not found with initialized payment ID");
//         }

//         return subscription as Subscriptions
//     } catch (error) {
//         console.error("Error fetching subscription by initialized payment ID:", error);
//         throw error; 
//     }
// };

