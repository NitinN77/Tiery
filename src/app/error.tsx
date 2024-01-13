"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      {error.digest === "1358196357" ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Authentication Error</h2>
          <br />
          <p>Please log in to view your templates and create new ones</p>
        </div>
      ) : (
        <div>
          <h2 className="text-lg text-center">Something went wrong!</h2>
          <button onClick={() => reset()}>Try again</button>
        </div>
      )}
    </div>
  )
}
