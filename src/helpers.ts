export async function getConfigDataFile(url: string, ttl: number) {
  const fetchedDataFile = await fetch(url, { cf: { cacheTtl: ttl } });

  return await fetchedDataFile.text();
}
