from turtle import screensize
import numpy as np 
from skimage import io, img_as_float
import brisque_edited as brisque
import sys 

uploadName = './uploads/'+sys.argv[1]
img = img_as_float(io.imread(uploadName, as_gray=True))
score = brisque.score(img)

print('Brisque score = ', round(score, 2), end='')


sys.stdout.flush()