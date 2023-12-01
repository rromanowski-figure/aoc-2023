#!/usr/bin/env bash
set -e

if [ $# -eq 0 ]
  then
    echo "Must supply two arguments, day number and title. Example: ./init-day.sh 01 Trebuchet?!"
fi

pushd "$(dirname "$0")" > /dev/null

DAY=$1
TITLE=$2
TARGET_DIR=../src/day-$1
cp -R ./day-template $TARGET_DIR

cd $TARGET_DIR
for file in *; do mv "$file" "${file/XX/$1}"; done

sed -i '' "s/__DAY__/$DAY/g" *
sed -i '' "s/__TITLE__/$TITLE/g" *
sed -i '' "s/^.*ts-nocheck.*$//g" *

popd > /dev/null