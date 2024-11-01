import { notFound } from 'next/navigation';
import prisma from '../../../lib/db';

export default async function PostPage({ params }: { params: { slug: string } }) {
    const { slug } = params; // Get slug from params
    const post = await prisma.post.findUnique({
        where: { slug }, // Use slug to find the post
    });

    if (!post) {
        notFound();
    }

    return (
        <div className="flex flex-col items-center min-h-screen p-8 pb-6 gap-2 sm:p-10">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg mb-4">{post.content}</p>
            <p className="text-sm text-gray-500">Created at: {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
    );
}
