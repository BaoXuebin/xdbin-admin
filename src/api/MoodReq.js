import { fetch } from './Req';

export const fetchMoods = () => fetch('/api/v1/mood/all');
