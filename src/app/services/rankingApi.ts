export const fetchRankingData = async ({
  region,
  country,
  rankOffset,
  cursor,
  signal,
}: {
  region: string
  country: string
  rankOffset: number
  cursor?: string
  signal?: AbortSignal
}) => {
  if (!region) {
    throw new Error("Region cannot be empty")
  }

  const apiUrl =
    cursor ||
    `http://localhost:7777/api/ranking/region?region=${region}&country=${country}&rank=${rankOffset}`
  const res = await fetch(apiUrl, { signal })

  if (!res.ok) {
    throw new Error(`Network response was not ok: ${res.statusText}`)
  }

  return res.json()
}
