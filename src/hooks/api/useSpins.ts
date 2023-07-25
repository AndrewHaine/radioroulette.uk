import useSWR from 'swr'

type SpinResponse = {
  total: number,
  daily: number,
}

const useSpins = () => useSWR<SpinResponse>('/api/spins', async () => {
  return fetch('/api/spins').then((value) => value.json());
});

export default useSpins;