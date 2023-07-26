import useSWR, { Fetcher } from 'swr';
import { ErrorResponse, SpinCountResponse } from '../../../types/api';

const spinCountFetcher: Fetcher<SpinCountResponse> = async () => {
  const response = await fetch('/api/spins');

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }

  return response.json();
}

export const useSpinCounts = () => useSWR<SpinCountResponse, ErrorResponse>('/api/spins', spinCountFetcher);