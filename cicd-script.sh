git fetch

local=$(git rev-parse HEAD)
echo $local

target=$(git rev-parse origin/main)
echo $target

if [ $local != $target ]
then
        git stash
        git pull origin master
        echo 'remote changes pulled from master branch'
        npm install
        npm run build
        npm run start
fi