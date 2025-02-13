import { TimeType } from './types';

export function timeAgo({ timestamp }: TimeType) {
  const now = new Date(); // Current date
  const postDate = new Date(timestamp); // Timestamp passed as argument

  const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
  if (seconds < 60) return 'Just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;

  const months =
    now.getMonth() -
    postDate.getMonth() +
    12 * (now.getFullYear() - postDate.getFullYear());
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

// Example usage
// const timestamp = '2024-12-16T08:20:45.134Z';
// Output will depend on the current date and time
