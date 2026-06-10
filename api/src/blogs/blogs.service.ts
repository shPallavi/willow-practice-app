import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async getAllBlogs() {
    return this.prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getBlogById(id: number) {
    return this.prisma.blog.findUnique({
      where: { id },
    });
  }

  async createBlog(blogData: {
    title: string;
    description: string;
    content: string;
    author: string;
  }) {
    return this.prisma.blog.create({
      data: blogData,
    });
  }

  async updateBlog(
    id: number,
    data: {
      title?: string;
      description?: string;
      content?: string;
      author?: string;
    },
  ) {
    return this.prisma.blog.update({
      where: { id },
      data,
    });
  }

  async deleteBlog(id: number) {
    await this.prisma.blog.delete({
      where: { id },
    });

    return {
      message: 'Blog deleted successfully',
    };
  }
}
