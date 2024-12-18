import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);

        const user = await User.findOne({ _id: userID }).select("-password"); // Exclude sensitive fields

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Convert Mongoose document to plain JavaScript object to avoid circular references
        const userData = user.toObject();

        return NextResponse.json({ message: "User found", data: userData });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
