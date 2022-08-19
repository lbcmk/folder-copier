from http.server import BaseHTTPRequestHandler, HTTPServer
from gui.addFolderGUI import FolderChooseGUI
from webbrowser import open as webBrowserOpen
from multiprocessing import Process
from json import dumps, loads

hostName = "localhost"
serverPort = 8080
processes = []
addFolderGUI = FolderChooseGUI()
def addFolderAppLoop():
	addFolderGUI.app.mainloop()

class WebServer(BaseHTTPRequestHandler):
	def do_GET(self):
		addToPath = True

		if self.path=="/":
			self.path="/index.html"
		if self.path=="/folders":
			self.path="preferences/folders.json"
			addToPath = False
		if self.path=="/options":
			self.path="preferences/options.json"
			with open(self.path, 'r') as f:
				if(len(f.read()) == 0):
					f.close()
					g = open(self.path, 'a')
					g.write("{}")
					g.close()
				else:
					f.close()
			addToPath = False

		if addToPath == True:
			self.path = "gui/html" + self.path

		try:
			sendReply = False
			if self.path.endswith(".html"):
					mimetype='text/html'
			if self.path.endswith(".jpg"):
					mimetype='image/jpg'
			if self.path.endswith(".png"):
					mimetype='image/png'
			if self.path.endswith(".gif"):
					mimetype='image/gif'
			if self.path.endswith(".ico"):
					mimetype='image/x-icon'
			if self.path.endswith(".svg"):
					mimetype='image/svg+xml'
			if self.path.endswith(".js"):
					mimetype='application/javascript'
			if self.path.endswith(".json"):
					mimetype='application/json'
			if self.path.endswith(".css"):
					mimetype='text/css'
			if self.path.endswith(".ttf"):
					mimetype='font/ttf'

			if('mimetype' in locals()):
				sendReply = True

			if sendReply == True:
				if (mimetype == 'text/html'):
					self.send_response(200)
					self.send_header('Content-type', mimetype)
					self.end_headers()

					with open(self.path) as f:
						for i in f.readlines():
							self.wfile.write(bytes(i, 'utf-8'))
					f.close()
				else:
					self.send_response(200)
					self.send_header('Content-type', mimetype)
					self.end_headers()

					with open(self.path, 'rb') as f:
						self.wfile.write(f.read())
					f.close()
                        
			else:
				self.send_response(200)
				self.send_header('Content-type', 'text/html')
				self.end_headers()
				
				with open('gui/html/404.html', 'rb') as f:
					self.wfile.write(f.read())
				f.close()

			return

		except IOError:
			self.send_error(404,'File Not Found: %s' % self.path)

	def do_PUT(self):
		if(self.client_address[0] == '127.0.0.1'):
			if(self.path.endswith("/options")):
				requestContentType = self.headers.get("content-type")
				requestContentLength = self.headers.get("Content-Length")
				if(requestContentType == "application/json"):
					self.send_response(200)
					self.send_header('Content-type', 'application/json')
					self.end_headers()

					requestContentBody = loads(self.rfile.read(int(requestContentLength)).decode("utf-8"))
					key = list(requestContentBody.keys())
					value = list(requestContentBody.values())
					
					j = ""
					with open("preferences/options.json", "r") as f:
						j = loads(f.read())
						for i in range(len(key)):
							j[key[i]] = value[i]
						f.close()

					with open("preferences/options.json", "w") as f:
						f.write(dumps(j, indent=4, separators=(", ", ": ")))
						f.close()

					message = {"response": value}
					test = dumps(message)
					self.wfile.write(bytes(test, "utf-8"))
				else:
					self.send_response(400)
					self.end_headers()

			if(self.path.endswith("/addfolder")):
				requestContentType = self.headers.get("content-type")
				requestContentLength = self.headers.get("Content-Length")
				if(requestContentType == "application/json"):
					self.send_response(200)
					self.send_header('Content-type', 'application/json')
					self.end_headers()
				
					try:
						processes.append(Process(target=addFolderAppLoop, daemon=True))
						processes[-1].start()
						if(len(processes) > 1):
							for i in range(len(processes) - 1):
								processes[i].terminate()
								processes.pop(i)
					except:
						print("Couldn't Open the Add Folder Program")

					self.wfile.write(bytes(dumps({"response": "app opened"}), "utf-8"))
				else:
					self.send_response(400)
					self.end_headers()
		else:
			self.send_response_only(403)

def runWebServer():        
	webServer = HTTPServer((hostName, serverPort), WebServer)
	print(f"Server started http://{hostName}:{serverPort}")
	# webBrowserOpen(f"http://{hostName}:{serverPort}", new=0, autoraise=True)

	try:
		webServer.serve_forever()
	except KeyboardInterrupt:
		webServer.server_close()
		print("Server stopped.")