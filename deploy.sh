#!/bin/bash

targetDir="iContainer"
if [ "$#" -gt 0 ]; then
    targetDir=$1
fi
targetFile="$targetDir.tar.gz"

# 1. compile sources
echo " > compiling sources ..."

# 1. compile less files
cd less
./style.sh
cd -

# 2. compile sources
grunt deploy

# 2. create deployment package
echo " > creating deployment directory ..."
mkdir $targetDir
cp -rL bin config models public routes services utils $targetDir/ 
cp app.js package.json README.md node_modules.tar.gz $targetDir/ 
mkdir $targetDir/scripts
cp -r scripts/import $targetDir/scripts

echo " > creating deployment package ..."
tar cfz $targetFile $targetDir 

echo " > cleaning up ..."
rm -r $targetDir


echo "done"