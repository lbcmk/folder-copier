import tkinter
from tkinter.filedialog import askdirectory
import customtkinter
from functions.save import GetDirectories

class FolderChooseGUI:
    def __init__(self) -> None:
        customtkinter.set_appearance_mode("System")
        customtkinter.set_default_color_theme("blue")

        self.app = customtkinter.CTk()
        self.app.geometry("800x400")
        self.app.title("Folder Copier")
        self.app.iconbitmap("assets/icon.ico")
        self.app.minsize(300, 200)
        
        self.filename1 = ""
        self.filename2 = ""

        self.CreateWindow()
        
    def FolderButton1(self):
        self.filename1 = askdirectory()
        self.Label1.configure(text=self.filename1)

    def FolderButton2(self):
        self.filename2 = askdirectory()
        self.Label2.configure(text=self.filename2)

    def ClearFolderText(self):
        self.filename1 = ""
        self.filename2 = ""
        self.Label1.configure(text="")
        self.Label2.configure(text="")
        self.errorLabel.configure(text="")

    def CopyDirs(self):
        dir1 = self.filename1.replace("/", "\\")
        dir2 = self.filename2.replace("/", "\\")
        add = GetDirectories().addDirectory(dir1, dir2)
        self.errorLabel.configure(text=add)
            
    def CreateWindow(self):
        
        _x = 50
        _y = 50

        self.Label1 = customtkinter.CTkLabel(
            master=self.app, 
            text=self.filename1, 
            bg_color=None
            )
        self.Label1.place(
            x=_x+155, 
            y=_y, 
            anchor=tkinter.W
            )

        self.Label2 = customtkinter.CTkLabel(
            master=self.app, 
            text=self.filename2, 
            bg_color=None
            )
        self.Label2.place(
            x=_x+155,
            y=_y+35,
            anchor=tkinter.W
            )


        self.folderButton1 = customtkinter.CTkButton(
            master=self.app, 
            text="Choose Folder 1", 
            command=self.FolderButton1
            )
        self.folderButton1.place(
            x=_x, 
            y=_y, 
            anchor=tkinter.W
            )

        self.folderButton2 = customtkinter.CTkButton(
            master=self.app, 
            text="Choose Folder 2", 
            command=self.FolderButton2
            )
        self.folderButton2.place(
            x=_x, 
            y=_y+35, 
            anchor=tkinter.W
            )


        self.write = customtkinter.CTkButton(
            master=self.app, 
            text="Add to copy list", 
            command=self.CopyDirs
            )
        self.write.place(
            x=_x, 
            y=_y+90, 
            anchor=tkinter.W
            )

        self.errorLabel = customtkinter.CTkLabel(
            master=self.app, 
            text="", 
            bg_color=None
            )
        self.errorLabel.place(
            x=_x+155, 
            y=_y+90, 
            anchor=tkinter.W
            )
    

        self.write = customtkinter.CTkButton(
            master=self.app, 
            width=75, 
            text="Reset", 
            command=self.ClearFolderText
            )
        self.write.place(
            x=_x, 
            y=_y+150, 
            anchor=tkinter.W
            )