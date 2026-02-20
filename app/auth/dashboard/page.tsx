import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/auth/login")

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Welcome, {session.user?.name}
      </h1>
      <p className="mt-2 text-muted-foreground">
        You are logged in.
      </p>
    </div>
  )
}
