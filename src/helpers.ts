export async function getConfigDataFile(siteCode: string, ttl: number) {
  const fetchedDataFile = await fetch(
    `https://client-config.kameleoon.com/mobile?siteCode=${siteCode}`,
    { cf: { cacheTtl: ttl } }
  );

  return await fetchedDataFile.text();
}
