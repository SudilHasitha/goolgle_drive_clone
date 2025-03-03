import type React from "react"
import Link from "next/link"
import { ArrowRight, Cloud, Lock, Share2 } from "lucide-react"
import { auth} from "@clerk/nextjs/server"
import { SignInButton } from "@clerk/nextjs"
import { getRootFolder, onBoardUser } from "~/server/db/queries"

interface ClerkUser {
  userId: string;
}

interface LandingPageProps {
  rootFolder: number | null;
  user: ClerkUser | null;
}

function LandingPage({ rootFolder, user }: LandingPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#1a1f2e]">
      <header className="border-b border-gray-800 bg-[#1a1f2e] p-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">DriveClon</h1>
          <nav>
            {user ? (
              <Link
                href={`/f/${rootFolder}`}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
              >
                Go to Drive
              </Link>
            ) : (
              <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20">
                <SignInButton
                  forceRedirectUrl={"/"}
                />
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">Welcome to DriveClon</h2>
          <p className="mb-12 text-lg text-gray-400">Secure cloud storage for all your files</p>
          {user ? (
            <Link
              href={`/f/${rootFolder}`}
              className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          ) : (
            <div 
              className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
              <SignInButton
                forceRedirectUrl={"/"}
              />
            </div>
          )}
        </div>

        <div className="container mx-auto mt-24">
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Cloud className="h-8 w-8 text-blue-400" />}
              title="Cloud Storage"
              description="Store all your files securely in the cloud and access them from anywhere."
            />
            <FeatureCard
              icon={<Share2 className="h-8 w-8 text-green-400" />}
              title="Easy Sharing"
              description="Share files and folders with others and collaborate in real-time."
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8 text-yellow-400" />}
              title="Secure"
              description="Your files are encrypted and protected with industry-leading security measures."
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 bg-[#1a1f2e] p-4 text-center text-sm text-gray-400">
        <p>&copy; 2025 DriveClon. All rights reserved.</p>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group rounded-2xl bg-[#1e2435] p-8 transition-all hover:bg-[#252a3d]">
      <div className="mb-6 flex justify-center">{icon}</div>
      <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-400">{description}</p>
    </div>
  )
}

export default async function Page() {
  const user = await auth()

  if (user?.userId) {
    const rootFolder = await getRootFolder(user.userId)

    if (rootFolder?.id) {
      return <LandingPage rootFolder={rootFolder.id} user={user} />
    } else if (!rootFolder && user) {
      const newRootFolder = await onBoardUser(user.userId)
      if (newRootFolder?.id) {
        return <LandingPage rootFolder={newRootFolder.id} user={user} />
      }
    }
  }
  return <LandingPage rootFolder={null} user={null} />
}

