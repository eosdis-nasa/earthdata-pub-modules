#!/bin/bash

rm -rf dist
mkdir dist
mkdir temp
cd temp
cp -R ../node_modules .
cp ../src/* .
zip ../dist/package.zip *
cd ..
rm -rf temp
