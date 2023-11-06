/**
 * Build a path string from a path and a hash/search object
 * @param path
 * @param hash
 * @param search
 */
export const pathString = (
  path: string,
  {
    hash = '',
    search = '',
  }: {
    hash?: string;
    search?: string;
  } = {},
) => {
  const tempBase = 'https://a.com';
  const url = new URL(path, tempBase);

  if (hash) url.hash = hash;
  if (search) url.search = search;
  return url.toString().replace(tempBase, '');
};

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.at(-1) === '/' ? url : `${url}/`;
  console.log(url)
  return url;
};
