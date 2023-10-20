# Use the official Apache HTTP Server image
FROM httpd:2.4

# Copy all files from the current directory to the default Apache document root
COPY . /usr/local/apache2/htdocs/

# Create an entrypoint script
COPY entrypoint.sh /usr/local/bin/

# Make the script executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["entrypoint.sh"]
