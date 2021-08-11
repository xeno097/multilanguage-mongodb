import slugify from 'slugify';
import { randomBytes } from 'crypto';

export const createSlug = (data: string[], isUnique = false) => {
  if (data.length === 0) {
    throw new Error();
  }

  if (isUnique) {
    const randomString = randomBytes(5).toString('hex');
    data.push(randomString);
  }

  const toSlug = data.join(' ');

  return slugify(toSlug, {
    lower: true,
  });
};
