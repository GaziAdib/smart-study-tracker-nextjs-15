// import { PrismaClient } from "@prisma/client";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcrypt";

// const prisma = new PrismaClient()

// export const authOptions = {

//     session: {
//         strategy: 'jwt'
//     },
//     providers: [
//         CredentialsProvider({
//             name: 'credentials',
//             credentials: {
//                 email: { label: "email", type: "email" },
//                 password: { label: "password", type: "password" }
//             },
//             async authorize(credentials) {
//                 // Add logic here to look up the user from the credentials supplied

//                 if (!credentials.email || !credentials.password) {
//                     return null;
//                 }

//                 // user in DB

//                 const user = await prisma.user.findUnique({
//                     where: {
//                         email: credentials?.email
//                     }
//                 })


//                 console.log('user found', user);

//                 if (!user) {
//                     return null;
//                 }

//                 const isPasswordValid = await compare(credentials?.password, user?.password);

//                 if (!isPasswordValid) {
//                     return null;
//                 }

//                 return {
//                     id: user?.id,
//                     email: user?.email,
//                     username: user?.username,
//                     role: user?.role,
//                     // permissions: user?.permissions
//                 }


//             }
//         })
//     ],

//     callbacks: {

//         async session({ session, token }) {
//             console.log('session token', token)
//             return {
//                 ...session,
//                 user: {
//                     ...session?.user,
//                     id: token?.id,
//                     email: token?.email,
//                     username: token?.username,
//                     role: token?.role,
//                     //permissions: token?.permissions
//                 }
//             }

//         },

//         async jwt({ token, user }) {

//             // after login jwt token and get the user data from here

//             if (user) {
//                 return {
//                     ...token,
//                     id: user?.id,
//                     email: user?.email,
//                     username: user?.username,
//                     role: user?.role,
//                     //permissions: user?.permissions
//                 }
//             }
//             return token
//         }
//     },

//     pages: {
//         signIn: '/login'
//     },

//     debug: process.env.NODE_ENV === 'development',
//     jwt: {
//         secret: process.env.NEXTAUTH_JWT_SECRET
//     },
//     secret: process.env.NEXTAUTH_SECRET


// }


// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST }


// import { PrismaClient } from "@prisma/client";
// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcrypt";

// const prisma = new PrismaClient();

// export const authOptions = {
//   session: {
//     strategy: "jwt", // Use JWT-based sessions
//   },
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {

//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password are required.");
//         }

//         try {
//           // Find user in the database
//           const user = await prisma.user.findUnique({
//             where: { email: credentials.email },
//           });

//           if (!user) {
//             throw new Error("No user found with this email.");
//           }

//           // Validate the password
//           const isPasswordValid = await compare(
//             credentials.password,
//             user.password
//           );

//           if (!isPasswordValid) {
//             throw new Error("Invalid credentials.");
//           }

//           // Return user data to be encoded into the JWT
//           return {
//             id: user.id,
//             email: user.email,
//             username: user.username,
//             role: user.role,
//           };
//         } catch (error) {
//           console.error("Error during user authorization:", error);
//           throw new Error("Unable to authorize user.");
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async session({session, token }) {
//       console.log("Session token:", token);
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//           email: token.email,
//           username: token.username,
//           role: token.role,
//         },
//       };
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         return {
//           ...token,
//           id:  user.id,
//           email:  user.email,
//           username:  user.username,
//           role:  user.role,
//         };
//       }
//       return token;
//     },
//   },
//   pages: {
//     signIn: "/login", // Redirect here for sign-in
//   },
//   debug: process.env.NODE_ENV === "development",
//   jwt: {
//     secret: process.env.NEXTAUTH_JWT_SECRET, // JWT secret
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        try {
          // Fetch user from database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("No user found with this email.");
          }

          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid credentials.");
          }

          return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
          };
        } catch (error) {
          console.error("Error in authorize:", error);
          throw new Error("Failed to log in.");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          username: token.username,
          role: token.role,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = async (req, res) => {
  const { cookies } = await req;
  // Await cookies or headers if used dynamically
  await Promise.all([
    cookies.getAll(), // Await dynamic cookie retrieval
  ]);
  return NextAuth(req, res, authOptions);
};

export { handler as GET, handler as POST };