npm run build

# ssh my-server << eeooff
# cd /var/www/activity
# rm -rf *
# exit
# eeooff

scp -r ./dist/* my-server:/var/www/activity