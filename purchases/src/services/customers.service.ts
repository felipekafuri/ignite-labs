import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async getCustomerByAuthUserId(authUserId: string) {
    return await this.prisma.customers.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async createCustomer(authUserId: string) {
    return await this.prisma.customers.create({
      data: {
        authUserId,
      },
    });
  }
}
