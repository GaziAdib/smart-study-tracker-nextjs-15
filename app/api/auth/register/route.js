
// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";
// import bcrypt from 'bcrypt'

// const prisma = new PrismaClient();

// export async function POST(req, res) {
//     try {

//         const { username, email, password } = await req.json();
//         console.log({ username, email, password });

//         const exists = await prisma.user.findFirst({
//             where: {
//                 email: email
//             }
//         })

//         if (exists) {
//             console.log('User already exists!')
//             return NextResponse.json({ message: 'Username or Email Already Exists.' }, {
//                 status: 500
//             })
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         await prisma.user.create({
//             data: {
//                 username: username,
//                 email: email,
//                 password: hashedPassword
//             }
//         })

//         return NextResponse.json({ message: 'User Registered' }, { status: 201 });

//     } catch (error) {
//         console.log("Error while Registeing", error);
//         return NextResponse.json({ message: 'Error Occured While Registering the user.' }, { status: 500 });
//     }
// }
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();

        // Ensure all fields are provided
        if (!username || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required." },
                { status: 400 }
            );
        }

        // Prisma user check
        const exists = await prisma.user.findUnique({
            where: { email },
        });

        if (exists) {
            return NextResponse.json(
                { message: "Email already exists." },
                { status: 409 }
            );
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword },
        });

        return NextResponse.json(
            { message: "User registered successfully.", user },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error during registration:", error);

        // Generic error response
        return NextResponse.json(
            { message: "An error occurred during registration." },
            { status: 500 }
        );
    }
}