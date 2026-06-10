import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile() {
    // Try to find the first user, or return a default profile
    const user = await this.prisma.user.findFirst();
    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }
    return {
      id: 1,
      name: 'Pallavi Singh',
      email: 'pallavi@example.com',
      role: 'Admin',
    };
  }
}
