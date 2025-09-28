import Button from '../components/Button';

type ErrorProps = { title: string | null; error?: string | null };

export function ErrorPage({ title, error }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1>Error loading {title}</h1>

        <div>
          <p className="text-destructive">{error}</p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
