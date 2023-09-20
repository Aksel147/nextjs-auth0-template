import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname == "/api/label") {
        return req.headers.get('Authorization') == process.env.API_SECRET
      }
      return !!token
    },
  },
  pages: {
    signIn: "/auth/signin"
  }
})

export const config = { matcher: ["/(.+)", "/"] }
