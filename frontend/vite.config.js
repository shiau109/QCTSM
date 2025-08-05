import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
// import { plugin as markdownPlugin, Mode } from 'vite-plugin-markdown'
// markdownPlugin({
//   // at minimum you’ll need raw Markdown; add Mode.HTML, Mode.REACT, etc as desired
//   mode: [ Mode.MARKDOWN ]  
// })
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 8009, // Changed to match docker-compose.yml
  },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //   },
  // }
})