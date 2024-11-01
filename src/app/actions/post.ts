'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

// Define a type for the form state
type FormState = {
  message: string;
  success: boolean;
  post?: any;
};

export async function createPost(prevState: FormState | null, formData: FormData) {
  try {
    const title = formData.get('title');
    const content = formData.get('content');

    if (!title || !content || 
        typeof title !== 'string' || 
        typeof content !== 'string') {
      return { 
        message: 'Invalid form data',
        success: false 
      };
    }

    const slug = title.toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    });

    if (existingPost) {
      return { 
        message: 'A post with this title already exists',
        success: false
      };
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        author: {
          connect: {
            id: "cm2xq03b20000sv9agknxb41o"  // Connecting to specific user - ryu
          }
        }
      }
    });

    revalidatePath('/posts');
    return { 
      message: 'Post created successfully!',
      success: true,
      post 
    };
  } catch (error) {
    console.error('Failed to create post:', error);
    return { 
      message: 'Failed to create post',
      success: false
    };
  }
} 