import os

def directoryTraversal(rootDir='.', debug=False):
    for dirName, subdirList, fileList in os.walk(rootDir):
        if debug:print('Found directory: %s' % dirName)
        for fname in fileList:
            if debug:print('\t%s' % fname)
