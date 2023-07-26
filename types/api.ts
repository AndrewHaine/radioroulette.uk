export type ErrorMessage = 'rate_limit' | 'server';

export type ErrorResponse = {
  message: ErrorMessage,
}

export type SpinCountResponse = {
  total: number,
  daily: number,
};
