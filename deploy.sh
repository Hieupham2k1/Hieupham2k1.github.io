#npm run build

cd dist

git init
git add -A
git commit -m 'deploy'
origin='https://github.com/Hieupham2k1/Hieupham2k1.github.io'
git fetch $origin
git checkout -b main

git pull $origin main
git push $origin main

cd -