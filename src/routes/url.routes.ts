import { Router } from "express";

import {
  createShortUrl,
  getMyUrls,
  redirectToOriginalUrl
} from "../controllers/url.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/api/urls",
  authenticate,
  createShortUrl
);

router.get(
  "/api/urls",
  authenticate,
  getMyUrls
);

router.get(
  "/:code",
  redirectToOriginalUrl
);

export default router;