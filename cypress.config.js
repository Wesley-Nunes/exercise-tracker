import { defineConfig } from "cypress";
import 'dotenv/config';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
const baseUrl = `http://${host}:${port}`;

export default defineConfig({
  e2e: {
    baseUrl
  },
  includeShadowDom: true
});
