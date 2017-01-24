#!/bin/bash          
linted = `./node_modules/eslint/bin/eslint.js ./src --ext .js --ext .jsx --cache`

if $linted then 
  echo $linted
else 
  echo "$(tput setaf 1)Red text $(tput setab 7)and white background$(tput sgr 0)"
fi