import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { canProject } from "@/lib/permissions";
import ProjectModel from "@/model/Projects";

export async function POST()