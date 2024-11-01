import prisma from '../lib/db'
import Link from 'next/link'
import Image from 'next/image';
import officeImage from '/public/office.jpg';

export default async function Home() {
  const recentPosts = await prisma.post.findMany({
    take: 2,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <section>
      {recentPosts.map((post) => (
        <Link href={`/posts/${post.slug}`} key={post.id}>
          <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
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

            <div className="bg-white p-4 sm:p-6">
              <time className="block text-xs text-gray-500">
                {post.createdAt.toLocaleDateString()}
              </time>

              <h3 className="mt-0.5 text-lg text-gray-900">
                {post.title}
              </h3>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                {post.content}
              </p>
            </div>
          </article>
        </Link>
      ))}

      <div className="mt-8">
        <Link 
          href="/posts" 
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          View All Posts
        </Link>
      </div>
    </section>
  )
}
