#!/bin/bash

MAX_X=1920
MAX_Y=1080

echo '[' > fontList.json
echo 'fontName,x,y' > combined.csv

find . -name 'css*' |
while read file
do
    echo $file
    while read line
    do
        if [[ $line == font-family:* ]]
        then
            font_name=$(echo $line| cut -d"'" -f 2)
            echo "\"$font_name\"," >> fontList.json
            x=$RANDOM
            let "x %= $MAX_X"
            y=$RANDOM
            let "y %= $MAX_Y"
            echo "$font_name,$x,$y" >> combined.csv
            break
        fi
    done < $file
done

echo ']' >> fontList.json