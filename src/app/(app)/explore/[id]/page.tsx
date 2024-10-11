"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Clock, Users } from 'lucide-react';
import Navmap from '@/components/Navmap';
import Link from 'next/link';

interface PandalData {
  id: number;
  title: string;
  images: string[];
  rating: number;
  location: string;
  date: string;
  time: string;
  description: string;
  crowdLevel: string;
  latitude: number;
  longitude: number;
}

interface Comment {
  id: number;
  text: string;
  createdAt: string;
}

export default function PandalShowcase() {
  const { id } = useParams();
  const [pandalData, setPandalData] = useState<PandalData | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Pandal data from API
        const response = await fetch(`/api/pandal/${id}`);
        if (!response.ok) throw new Error('Failed to fetch pandal data');

        const data = await response.json();
        setPandalData(data);

        // Fetch comments for the specific Pandal
        const commentsResponse = await fetch(`/api/pandal/${id}/comments`);
        if (!commentsResponse.ok) throw new Error('Failed to fetch comments');

        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        // Post new comment to API
        const response = await fetch(`/api/pandal/${id}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newComment }),
        });

        if (!response.ok) throw new Error('Failed to post comment');

        const newCommentData = await response.json();
        setComments([...comments, newCommentData]);
        setNewComment('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!pandalData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-8 px-4 md:px-8 lg:px-12 xl:px-20 my-10 p-44 overflow-hidden rounded-xl">
      <div className=" rounded-xl max-w-7xl mx-auto bg-[url('https://wallpaperaccess.com/full/2410949.jpg')] bg-opacity-25 shadow-2xl  overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/3 w-full p-6"
          >
            <h1 className="text-4xl font-extrabold text-white mb-6">{pandalData.title}</h1>

            <Carousel className="w-full mb-6 rounded-xl overflow-hidden">
              <CarouselContent>
                {pandalData.images?.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-64 sm:h-80 lg:h-96">
                      <Image
                        src={image}
                        alt={`Pandal image ${index + 1}`}
                        fill
                        className="object-cover rounded-xl"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-opacity-75 rounded-full p-2 shadow" />
              <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-opacity-75 rounded-full p-2 shadow" />
            </Carousel>

            {/* Event Details Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 mb-6 p-6 rounded-lg shadow-lg sm:p-8 lg:p-6">
              <div className="sm:col-span-1 text-yellow-300 flex lg:col-span-3 ">
                <Star className="w-5 h-5 mr-2 text-yellow-300" />
                <span className="font-semibold text-lg">{pandalData.rating} / 5</span>
              </div>
              <div className="sm:col-span-1 flex text-green-300 lg:col-span-3">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{pandalData.location}</span>
              </div>
              <div className="sm:col-span-1 text-purple-200 lg:col-span-3">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="text-lg">{new Date(pandalData.date).toLocaleDateString()}</span>
              </div>
              {/* <div className="sm:col-span-1 lg:col-span-3">
                <Clock className="w-5 h-5 mr-2" />
                <span className="text-lg">{pandalData.time}</span>
              </div> */}
              <div className="sm:col-span-1  text-white lg:col-span-3">
                <Users className="w-5 h-5 mr-2" />
                <span className="text-lg">Crowd Level: {pandalData.crowdLevel}</span>
              </div>
              <h1 className="sm:col-span-3  text-xl font-bold text-white mt-4">Puja Description</h1>
              <p className="sm:col-span-3 lg:col-span-1 text-gray-200 mb-6">{pandalData.description}</p>
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 w-full bg-blue-950 bg-opacity-30 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl text-white font-bold mb-4">Comments</h2>
            <form onSubmit={handleCommentSubmit} className="flex mb-4">
              <Input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
                className="flex-1 mr-2 rounded-xl"
              />
              <Button className='rounded-xl bg-rose-600 hover:bg-festiveOrange' type="submit">Post</Button>
            </form>
            <div className="max-h-80 overflow-y-auto">
              {comments.length === 0 ? (
                <div className="text-gray-500">No comments yet. Be the first to comment!</div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-300 py-2">
                    <p className="text-black text-xl">{comment.text}</p>
                    <span className="text-sm text-white">{new Date(comment.createdAt).toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
        <Navmap latitude={pandalData.latitude} longitude={pandalData.longitude} />
        <center>
          <Link href={`https://www.google.com/search?q= direction from my location to ${pandalData.latitude}, ${pandalData.longitude}`} className="inline-block  items-center bg-rose-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-festiveOrange transition duration-300" target="_blank" rel="noopener noreferrer">
            Get Direction 🌍
          </Link>
        </center>
      </div>
    </div>
  );
}
