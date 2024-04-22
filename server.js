#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status.
set -x  # Print each command before executing it for debugging purposes.

# Log file for setup outputs
LOG_FILE="/var/log/setup_server.log"
exec > >(tee -a $LOG_FILE) 2>&1

echo "Removing the /dmonika_svr directory..."
# Remove directory if it already exists
if [ -d "/dmonika_svr" ]; then
    sudo rm -rf /dmonika_svr
    echo "Directory removed successfully."
else
    echo "Directory does not exist, skipping removal."
fi

# Update system packages
echo "Updating and installing required packages..."
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install -y git

echo "Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs build-essential

echo "Creating project directory at $PROJECT_DIR..."
# Define the project directory and server script path
PROJECT_DIR="/var/www/dmonika_svr"
sudo mkdir -p $PROJECT_DIR && sudo chown $(whoami):$(whoami) $PROJECT_DIR
cd $PROJECT_DIR

echo "Folder Created"

# Clone git repository
git clone https://github.com/126nut/dmonika_svr
