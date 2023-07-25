import { LRUCache } from 'lru-cache';

type RateLimiterOptions = {
  maxRequests: number,
  interval: number,
};

type RateLimiterHeaders = {
  'X-RateLimit-Limit': string,
  'X-RateLimit-Remaining': string,
};

type RateLimiterResponse = {
  isRateLimited: boolean,
  headers: RateLimiterHeaders,
};

export default function rateLimit(options: RateLimiterOptions) {
  const tokenCache = new LRUCache({
    max: options.maxRequests,
    ttl: options.interval
  });

  return {
    check: (limit: number, token: string) => {
      return new Promise<RateLimiterResponse>((resolve) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];

        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }

        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        const response: RateLimiterResponse = {
          isRateLimited,
          headers: {
            'X-RateLimit-Limit': `${limit}`,
            'X-RateLimit-Remaining': isRateLimited ? '0' : `${limit - currentUsage}`,
          }
        };

        resolve(response);
      });
    },
  };
};
