"use server";
import { Client, Environment } from "square";

export const { paymentsApi } = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment:Environment.Sandbox});