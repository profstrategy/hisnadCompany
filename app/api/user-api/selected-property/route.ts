import { getPropertyById, getUserById } from "@/_lib/prisma-data-service";
import { ApiResponseUserProperty } from "@/constants/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponseUserProperty>> {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    // Validate required parameters
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required parameter: id" 
        },
        { status: 400 }
      );
    }


    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid ID format" 
        },
        { status: 400 }
      );
    }


    const validStatuses = ['paid', 'active'];

    const [property, user] = await Promise.all([
      getPropertyById(id),
      getUserById(id)
    ]);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found'
        },
        { status: 404 }
      );
    }

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: 'Property not found for this user'
        },
        { status: 404 }
      );
    }

    // Check user status authorization
    if (!validStatuses.includes(user.status ?? '')) {
      return NextResponse.json(
        {
          success: false,
          message: 'User account status does not allow access',
          error: `Current status: ${user.status || 'unknown'}`
        },
        { status: 403 }
      );
    }

    // Helper function to construct full name
    const constructFullName = (firstName?: string, lastName?: string): string => {
      const first = firstName?.trim() || '';
      const last = lastName?.trim() || '';
      return `${first} ${last}`.trim() || 'Unknown User';
    };

    // // Calculate payment information (placeholder logic - replace with actual calculations)
    // const calculatePaymentInfo = (property: PropertyData, user: UserData) => {
    //   // This is placeholder logic - implement actual payment calculations
    //   const baseAmount = property.size ? property.size * 1000 : 0; // Example calculation
    //   const amountPaid = user.status === 'paid' ? baseAmount : 0;
    //   const amountRemaining = baseAmount - amountPaid;
      
    //   return {
    //     amount_paid: amountPaid,
    //     payment_plan: user.status === 'paid' ? 'completed' : 'installment',
    //     amount_remaining: amountRemaining
    //   };
    // };

    // const paymentInfo = calculatePaymentInfo(property, user);

    // Construct successful response
    const responseData = {
      fullname: constructFullName(user.firstName ?? '', user.lastName ?? ''),
      property_id: property.id,
      property_type: property.type,
      property_name: property.slug,
      status: user.status || 'unknown',
      size: property.size || null,
      amount_paid: 'pending',
      payment_plan: 'pending',
      amount_remaining: 'pending'
    };

    return NextResponse.json(
      {
        success: true,
        data: responseData
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Property API Error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error occurred while fetching property data'
      },
      { status: 500 }
    );
  }
}
