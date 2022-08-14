import os
import hashlib
from json import dumps, loads

class CheckDir:
    
    def __init__(self) -> None:
        pass

    def checkFiles(self, p1, p2):
        d1_files = [] # unique files in dir1
        d2_files = [] # unique files in dir2
        d1_folders = [] # unique folders in dir1
        d2_folders = [] # unique folders in dir2
        edited_files = [] # edited files

        for dirpath, dirnames, files in os.walk(p1):
            for i in dirnames:
                if(not os.path.exists((dirpath + "\\" + i).replace(p1, p2))):
                    d1_folders.append((dirpath + "\\" + i))
            
            for i in files:        
                dir1 = (dirpath + "\\" + i)
                dir2 = (dirpath + "\\" + i).replace(p1, p2)

                if(os.path.exists(dir2)):
                    h1, h2 = 0, 0
                    with open(dir1, 'rb') as f:
                        h1 = hashlib.md5(f.read()).hexdigest()
                        f.close()
                    with open(dir2, 'rb') as f:
                        h2 = hashlib.md5(f.read()).hexdigest()
                        f.close()
                    
                    if(h1 != h2):
                        edited_files.append(dir1)
                else:
                    d1_files.append(dir1)



        for dirpath, dirnames, files in os.walk(p2):
            for i in dirnames:
                if(not os.path.exists((dirpath + "\\" + i).replace(p2, p1))):
                    d2_folders.append((dirpath + "\\" + i))

            for i in files:
                dir1 = (dirpath + "\\" + i)
                dir2 = (dirpath + "\\" + i).replace(p2, p1)

                if(not os.path.exists(dir2)):
                    d2_files.append(dir1)

        # print(d1_files)
        # print(d1_folders)
        # print(d1_edited_files)
        # print(d2_files)
        # print(d2_folders)
        # print(d2_edited_files)

        x = {
            "dir1": {
                "new_files": d1_files,
                "new_folders": d1_folders
            },
            "dir2": {
                "new_files": d2_files,
                "new_folders": d2_folders
            },
            "edited_files": edited_files
        }

        jsonChanged = loads(dumps(x, indent=4, separators=(", ", ": ")))
    
        return jsonChanged
