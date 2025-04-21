'use client'

import React from 'react'
import AppButton from '@/components/reusables/app-button'
import { AppHeading } from '@/components/reusables/app-heading'
import AppTextInput from '@/components/reusables/app-text-input'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const InspectionForm = () => {
  return (
    <div className="flex justify-center px-4 py-10 relative -mt-20 md:-mt-24">
      <Card className="w-full bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <AppHeading variant="h2" className="text-center">
          Book a slot for site inspection here:
        </AppHeading>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AppTextInput
            label="Full Name"
            placeholder="Enter full name here"
            required
            type="text"
            className='outline-none'
          />
          <AppTextInput
            label="Email Address"
            placeholder="Enter email here"
            required
            type="email"
          />
          <AppTextInput
            label="Phone Number"
            placeholder="Enter phone number here"
            required
            type="tel"
            className='outline-none'

          />
          <AppTextInput
            label="Alternate Phone Number (Optional)"
            placeholder="Enter alternate phone number here"
            type="text"
            className='outline-none'

          />

          <div className="flex flex-col gap-2">
            <label htmlFor="estate" className='block text-sm font-medium mb-1 text-gray-700'>Estate to Inspect</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="al-Hisnad Estate, Shimawa">
                  al-Hisnad Estate, Shimawa
                </SelectItem>
                <SelectItem value="crestwood Green Acres">
                  Crestwood Green Acres (Featured Farmland)
                </SelectItem>
                <SelectItem value="flourish farm Estate">
                  Flourish Farm Estate (Featured Farmland)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="inspection-type" className='block text-sm font-medium mb-1 text-gray-700'>Inspection Type</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Onsite Inspection">Onsite</SelectItem>
                <SelectItem value="Virtual Inspection">Virtual</SelectItem>
                <SelectItem value="Allocation">Allocation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="gender" className='block text-sm font-medium mb-1 text-gray-700'>Gender</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="client-category" className='block text-sm font-medium mb-1 text-gray-700'>Client Category</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Client/Customer">Client/Customer</SelectItem>
                <SelectItem value="Sales Partner">Sales Partner</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <AppTextInput
            label="Location/City"
            placeholder="Your location here"
            required
            type="text"
            className='outline-none'

          />
          <AppTextInput
            label="Inspection Date"
            placeholder="Enter inspection date here"
            required
            type="date"
            className='outline-none'

          />
        </form>

        <div className="flex justify-center pt-4">
          <AppButton className="w-full md:w-auto text-white">Book Appointment</AppButton>
        </div>
      </Card>
    </div>
  )
}

export default InspectionForm
