import { prisma } from '@/db';
import rateLimit from '@/services/rate-limiter';
import { Station } from '@prisma/client';
import { startOfDay } from 'date-fns';
import cache from 'memory-cache';
import { NextResponse } from 'next/server';
import { ErrorResponse } from '../../../../types/api';

const SPIN_COUNT_CACHE_KEY = 'spins';

const RateLimiter = rateLimit({
  interval: 60 * 1000,
  maxRequests: 100,
});

export async function GET() {
  try {
    let data = cache.get(SPIN_COUNT_CACHE_KEY);
    let cacheStatus = 'HIT';

    if (!data) {
      cacheStatus = 'MISS';

      const total = await prisma.spin.count();
      const daily = await prisma.spin.count({
        where: {
          date: {
            gte: startOfDay(new Date()),
          },
        },
      });

      data = { total, daily };
      cache.put(SPIN_COUNT_CACHE_KEY, data);
    }

    return NextResponse.json(data, {
      headers: {
        'X-COUNT-CACHE': cacheStatus,
      }
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
  const { isRateLimited, headers } = await RateLimiter.check(100, 'RATE_LIMIT_TOKEN');

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

    cache.del(SPIN_COUNT_CACHE_KEY);

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