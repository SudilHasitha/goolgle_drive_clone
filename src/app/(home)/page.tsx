import Link from "next/link"
import { ArrowRight, Cloud, Lock, Share2 } from "lucide-react"
import { auth } from "@clerk/nextjs/server"
import { SignInButton } from "@clerk/nextjs"

interface LandingPageProps {
  rootFolder: string | null;
}

function LandingPage({ rootFolder }:LandingPageProps) {

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">DriveClon</h1>
          <nav>
            <Link href={`$/f/${rootFolder}`} className="text-blue-400 hover:text-blue-300">
              Go to Drive
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to DriveClon</h2>
          <p className="text-xl mb-8">Secure cloud storage for all your files</p>
          <Link
            href={`$/f/${rootFolder}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Get Started
            <ArrowRight className="ml-2" />
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Cloud className="h-12 w-12 text-blue-400" />}
            title="Cloud Storage"
            description="Store all your files securely in the cloud and access them from anywhere."
          />
          <FeatureCard
            icon={<Share2 className="h-12 w-12 text-green-400" />}
            title="Easy Sharing"
            description="Share files and folders with others and collaborate in real-time."
          />
          <FeatureCard
            icon={<Lock className="h-12 w-12 text-yellow-400" />}
            title="Secure"
            description="Your files are encrypted and protected with industry-leading security measures."
          />
        </section>
      </main>

      <footer className="bg-gray-800 text-center p-4">
        <p>&copy; 2023 DriveClon. All rights reserved.</p>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}


export default async function Page() {
  const user = await auth()
  
  if (!user.userId) {
    <SignInButton />
  }

  return <LandingPage rootFolder = {user.userId} />
}


