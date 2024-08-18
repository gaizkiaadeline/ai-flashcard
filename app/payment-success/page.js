// export default function PaymentSuccess({ searchParams }) {
//     const amount = searchParams.amount;
  
//     return (
//       <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
//         <div className="mb-10">
//           <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
//           <h2 className="text-2xl">You successfully sent</h2>
  
//           <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
//             ${amount}
//           </div>
//         </div>
//       </main>
//     );
//   }
"use client";

import { useRouter } from "next/navigation"; // Import useRouter

export default function PaymentSuccess({ searchParams }) {
    const router = useRouter(); // Initialize useRouter
    const amount = searchParams.amount;

    // Function to handle navigation
    const handleGoHome = () => {
        router.push('/'); // Navigates to the home page
    };

    return (
        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
                <h2 className="text-2xl">You successfully sent</h2>

                <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
                    ${amount}
                </div>
            </div>
            {/* Button to go back to home */}
            <button 
                onClick={handleGoHome} 
                className="mt-8 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
            >
                Go Home
            </button>
        </main>
    );
}
