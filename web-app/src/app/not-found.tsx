// import Link from 'next/link'

// export default function NotFound() {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center p-24">
//       <h2 className="text-xl font-semibold mb-4">404 - Page Not Found</h2>
//       <p className="text-gray-600 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
//       <Link 
//         href="/"
//         className="text-blue-500 hover:text-blue-600 underline"
//       >
//         Return to Home
//       </Link>
//     </div>
//   )
// } 


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>Simple layout</body>
    </html>
  );
}
