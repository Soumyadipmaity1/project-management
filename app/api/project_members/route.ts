import { authOptions } from './../auth/[...nextauth]/option';
import { NextResponse } from 'next/server';
import { getServerSession, AuthOptions } from 'next-auth';
import dbConnect from '@/lib/db';
import UserModel from '@/model/User';
import { canProjectMember } from '@/lib/permissions';
import mongoose from 'mongoose';

