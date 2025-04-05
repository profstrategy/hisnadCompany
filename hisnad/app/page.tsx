// 'use client'
// import { useRouter } from "next/navigation"
// import React from "react"
// import Image from 'next/image'
// import { logo } from "@/public"

// export default function WelcomeScreen () {
//     const [ fadeOut, setFadeOut ] = React.useState(false)
//     const router = useRouter()

//     React.useEffect(() => {
//         // fade after 1.5
//         setTimeout(() => setFadeOut(true), 1500) 
//         setTimeout(() => router.push('/home'), 2000)
//     },[router])

//     return(
//         <div className={`flex h-dvh items-center justify-center bg-black transition-opacity duration-700 ${
//             fadeOut ? "opacity-0" : "opacity-100"}`}>
//                 <Image src={logo} height={100} width={100} quality={100} alt="welcome-image" className="rounded-md"  />
//         </div>
//     )
// }


"use client";

import { MdBuild } from "react-icons/md";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-[#F9FAFB] text-[#111] px-4">
      <div className="text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <MdBuild size={80} className="text-[#111]" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">We'll be back soon!</h1>
        <p className="text-lg md:text-xl mb-6">
          Our website is currently undergoing maintenance. Thanks for your patience!
        </p>
        <div className="text-sm md:text-base space-y-1">
          <p>📞 08104441104</p>
          <p>📧 hisnadproperty23@gmail.com</p>
        </div>
      </div>
    </main>
  );
}
