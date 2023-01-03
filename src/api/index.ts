// A mock function to mimic making an async request for data
export async function fetchCount(amount: number = 1): Promise<{ data: any }> {
  return await new Promise((resolve) => setTimeout(() => resolve({ data: amount }), 500))
}
