import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import fs from 'node:fs';
import { ServerOptions } from 'https';
import { join } from 'node:path';

const developmentCertificateName = 'dev-cert.pfx';
const httpsSettings: ServerOptions = fs.existsSync(join('certs', developmentCertificateName))
  ? { pfx: fs.readFileSync(join('certs', developmentCertificateName)) }
  : {};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
});
