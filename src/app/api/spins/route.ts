import { prisma } from '@/db';
import rateLimit from '@/services/rate-limiter';
import { Station } from '@prisma/client';
import { startOfDay } from 'date-fns';
import { NextResponse } from 'next/server';
import { ErrorResponse } from '../../../../types/api';

const RateLimiter = rateLimit({
  interval: 60 * 1000,
  maxRequests: 100,
});

export async function GET() {
  try {
    const total = await prisma.spin.count();
    const daily = await prisma.spin.count({
      where: {
        date: {
          gte: startOfDay(new Date()),
        },
      },
    });

    return NextResponse.json({
      total,
      daily,
    });
  } catch (e) {
    const errorResponse: ErrorResponse = {
      message: 'server',
    };

    return NextResponse.json(errorResponse, {
      status: 500
    });
  }
};

export async function POST() {
  const { isRateLimited, headers } = await RateLimiter.check(10, 'RATE_LIMIT_TOKEN');

  if (isRateLimited) {
    const errorResponse: ErrorResponse = {
      message: 'rate_limit',
    }

    return NextResponse.json(errorResponse, {
      status: 429,
      headers,
    });
  }

  try {
    const spinResults: Station[] = await prisma.$queryRaw`
      SELECT * FROM "public"."Station"
      ORDER BY RANDOM()
      LIMIT 8
    `;

    const winningStation = spinResults[0];

    await prisma.spin.create({
      data: {
        stationId: winningStation.id,
      }
    });

    return NextResponse.json(spinResults, { headers });
  } catch (e) {
    const errorResponse: ErrorResponse = {
      message: 'server'
    };

    return NextResponse.json(errorResponse, {
      status: 500,
      headers
    });
  }
};