from shutil import copytree, copy

class CopyFiles:
    def __init__(self, dirs):
        copytree(dirs["dir1"]["path"], dirs["dir2"]["path"], copy_function = copy, dirs_exist_ok=True)