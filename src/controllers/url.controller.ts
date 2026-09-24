

import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import {
  shortenUrl,
  resolveUrl,
  getUserUrls
} from "../services/url.service.js";

import type { Response } from "express";

export async function createShortUrl(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        error: "Unauthorized"
      });
    }

    const { url } = req.body;

    const result = await shortenUrl(
      url,
      req.userId
    );

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong"
    });
  }
}

export async function getMyUrls(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        error: "Unauthorized"
      });
    }

    const urls = await getUserUrls(req.userId);

    return res.status(200).json(urls);
  } catch {
    return res.status(500).json({
      error: "Internal server error"
    });
  }
}

export async function redirectToOriginalUrl(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const { code } = req.params;

    if (typeof code !== "string") {
      return res.status(400).json({
        error: "Invalid short code"
      });
    }

    const originalUrl = await resolveUrl(code);

    if (!originalUrl) {
      return res.status(404).json({
        error: "URL not found"
      });
    }

    return res.redirect(originalUrl);
  } catch {
    return res.status(500).json({
      error: "Internal server error"
    });
  }
}