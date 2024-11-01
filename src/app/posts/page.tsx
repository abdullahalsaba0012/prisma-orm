import Image from 'next/image';
import prisma from '../../lib/db';
import Link from 'next/link';
import officeImage from '/public/office.jpg';
import { CreatePostForm } from '../components/form';

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const postsPerPage = 4;
  const currentPage = Number(searchParams.page) || 1;
  
  // Get total count for pagination
  const totalPosts = await prisma.post.count();
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Get posts for current page
  const posts = await prisma.post.findMany({
    take: postsPerPage,
    skip: (currentPage - 1) * postsPerPage,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: {
        select: {
          email: true,
          id: true
        }
      }
    }
  });

  // Generate page numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Post Form - Takes up 1/3 of the space */}
        <div className="lg:col-span-1">
          <CreatePostForm key="create-post-form" />
        </div>

        {/* Posts List - Takes up 2/3 of the space */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">All Posts</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {posts.map((post) => (
              <Link href={`/posts/${post?.slug}`} key={post?.id} className="block">
                <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64">
                    <Image
                      alt={post?.title || "Post Image"}
                      src={officeImage}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                      placeholder='blur'
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <time className="text-sm text-gray-500">
                        {post?.createdAt?.toLocaleDateString() || "Date not available"}
                      </time>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">5 min read</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        By {post.author.email}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post?.title || "Title not available"}
                    </h3>

                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {post?.content || "Content not available"}
                    </p>

                    <div className="inline-flex items-center text-indigo-600 hover:text-indigo-700">
                      Read more
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Numbered Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              {pageNumbers.map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`/posts?page=${pageNum}`}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === pageNum 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pageNum}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
