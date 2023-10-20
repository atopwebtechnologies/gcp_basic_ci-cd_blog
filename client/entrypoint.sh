#!/bin/sh

# Replace the default Listen directive to use the PORT environment variable
sed -i "s/Listen 80/Listen ${PORT}/g" /usr/local/apache2/conf/httpd.conf

# Start Apache in the foreground
httpd-foreground
