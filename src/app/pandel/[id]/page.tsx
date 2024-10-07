import { notFound } from 'next/navigation'

// This is a mock function. In a real app, you'd fetch this data from an API or database.
const pandals = [
  { id: 1, title: "Mahalaya Magic", image: "https://kcqcqxrwjjjgvwuqcxio.supabase.co/storage/v1/object/public/public-images/durga-puja-1.jpg", rating: 4.8, location: "Kolkata", date: "Oct 14, 2024" },
  { id: 2, title: "Bodhan Bliss", image: "https://kcqcqxrwjjjgvwuqcxio.supabase.co/storage/v1/object/public/public-images/durga-puja-2.jpg", rating: 4.6, location: "Howrah", date: "Oct 15, 2024" },
  { id: 3, title: "Sasthi Spectacle", image: "https://kcqcqxrwjjjgvwuqcxio.supabase.co/storage/v1/object/public/public-images/durga-puja-3.jpg", rating: 4.9, location: "Salt Lake", date: "Oct 16, 2024" },
  { id: 4, title: "Saptami Soiree", image: "https://kcqcqxrwjjjgvwuqcxio.supabase.co/storage/v1/object/public/public-images/durga-puja-4.jpg", rating: 5.0, location: "Park Street", date: "Oct 17, 2024" },
  { id: 5, title: "Ashtami Extravaganza", image: "https://kcqcqxrwjjjgvwuqcxio.supabase.co/storage/v1/object/public/public-images/durga-puja-5.jpg", rating: 4.7, location: "Ballygunge", date: "Oct 18, 2024" },
  { id: 6, title: "Navami Nights", image: "https://kcqcqxrwjjjgvwuqcxio.supabase.co/storage/v1/object/public/public-images/durga-puja-6.jpg", rating: 4.9, location: "New Town", date: "Oct 19, 2024" },
]

export default function PandalPage({ params }: { params: { id: string } }) {
  // Find the pandal by id (convert param id to number)
  const pandal = pandals.find((p) => p.id === Number.parseInt(params.id))

  // If pandal not found, show 404
  if (!pandal) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{pandal.title}</h1>
      <img src={pandal.image} alt={pandal.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <p className="text-lg mb-2">Date: {pandal.date}</p>
      <p className="text-lg mb-2">Location: {pandal.location}</p>
      <p className="text-lg mb-2">Rating: {pandal.rating}</p>
      {/* Add more details as needed */}
    </div>
  )
}
