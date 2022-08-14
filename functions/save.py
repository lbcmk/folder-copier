from json import load, dumps
from os import stat
from os.path import exists

jsonFileLocation = "preferences/folders.json"

class GetDirectories:
    def __init__(self) -> None:
        if not exists(jsonFileLocation):
            with open(jsonFileLocation, 'w') as f: f.close() 
                
        f = open(jsonFileLocation, "r")
        if(stat(f.name).st_size == 0):
            f.close()
            f = open(jsonFileLocation, "w")
            f.write("[]")
            f.close()
            f = open(jsonFileLocation, "r")
        f.close()

    def getDirectories(self):
        f = open(jsonFileLocation)
        copyDirs = load(f)
        f.close()
        return copyDirs

    def addDirectory(self, dir1, dir2):

        if(len(dir1)==0 or len(dir2)==0 or dir1==dir2):
            return "Error: Empty or Same Directory"
        if(dir1 in dir2 or dir2 in dir1):
            if(dir1 in dir2):
                return "Error: Recursion Error (The second folder is inside the first folder)"
            else:
                return "Error: Recursion Error (The first folder is inside the second folder)"

        folderInfo = {
            "sourceDir": str(dir1),
            "destinationDir": str(dir2)
        }
        jsonData = self.getDirectories()

        for i in jsonData:
            if(i["sourceDir"] == folderInfo["sourceDir"] and i["destinationDir"] == folderInfo["destinationDir"]):
                return "Folders already exist"

        jsonData.append(folderInfo)

        with open(jsonFileLocation, 'w') as f:
            f.write(dumps(jsonData, indent=4, separators=(", ", ": ")))

        return "Folders Added"