import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Or{" "}
            <a
              href="/sign-up"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </a>
          </p>
        </div>
        <div className="mt-8">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-indigo-600 hover:bg-indigo-700 text-white",
                socialButtonsBlockButton:
                  "border border-neutral-300 text-neutral-700 hover:bg-neutral-50",
                formFieldInput:
                  "rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:border-indigo-500 focus:ring-indigo-500",
                card: "rounded-xl shadow-2xl",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsProviderIcon__google: "h-5 w-5",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
