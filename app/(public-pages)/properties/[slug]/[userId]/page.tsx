import { getSingularProperty, getUserById } from "@/_lib/prisma-data-service";
import { handleHttpError } from "@/_lib/utils";
import SingularProperty from "@/app/(public-pages)/_components/properties-page/singular-property";

type Params = {
    slug: string;
    userId: string;
};

export default async function AuthenticatedPropertiesPage({ params }: { params: Promise<Params> }) {
  const awaitedParams = await params;
  const { slug, userId } = awaitedParams

  try {
    
    const [property, user] = await Promise.all([
      getSingularProperty(slug),
      getUserById(userId)
    ]);

    if (!property) {
      return (
        <div className="text-center text-gray-600 p-8 bg-red-50 rounded-lg shadow-sm max-w-md mx-auto my-16">
          Property not found
        </div>
      );
    }

    if (!user) {
      return (
        <div className="text-center text-gray-600 p-8 bg-red-50 rounded-lg shadow-sm max-w-md mx-auto my-16">
          User not found
        </div>
      );
    }
    return (
      <SingularProperty
        property={property}
        userId={userId}
        paymentInitializationResponse={null} 
      />
    );
  } catch (error) {
    console.error('Error loading property page:', error);
    
    return (
      <div className="text-center text-gray-600 p-8 bg-red-50 rounded-lg shadow-sm max-w-md mx-auto my-16">
        <h2 className="text-xl font-semibold mb-2">Error Loading Property</h2>
        <p>Please try again later or contact support if the problem persists.</p>
      </div>
    );
  }
}