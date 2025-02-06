export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-18'

export const dataset = assertValue(
 "production",
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
 "2tgo58fv",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
  'skmJ3c3Dpghxpjcikam0C7I2UPZplC4SY8kUm8eF7ewOw4QS77qEUpRphWvJdeq0zJA9HG0MlL0EYb3THK3dcJQjv5ju8iHNeKP3WmBB3rGe8XKZGVoEQund6I7UO7YsWJRi4dYB997ssxH80mWBDWNwVnfmpgCq2pQciKMyoUwzcRPbBMN2',
  'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
