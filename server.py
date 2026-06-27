#!/usr/bin/env python3
import http.server
import socketserver

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        pass

if __name__ == '__main__':
    PORT = 5000
    with socketserver.TCPServer(('', PORT), NoCacheHandler) as httpd:
        httpd.allow_reuse_address = True
        print(f'Serving on port {PORT}')
        httpd.serve_forever()
