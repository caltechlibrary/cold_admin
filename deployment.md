
# Deployment **cold_admin**  and **datasetd**

## **cold_admin**

Deploying cold_admin on a remote system requires some manual setup.  My current recommendation is the following.

1. Clone the repository to `/Sites/cold/admin`
2. Configure Apache to restrict access to `/Sites/cold/admin` to the library staff only.
3. Configure Apache to reverse proxy the port that cold_admin runs on with the path `/apps/cold/admin/` prefix
4. Copy `cold_admin.service-example` to `cold_admin.service`, edit it and move it appropirate place in your Systemd service directory
5. Symbolicly link `cold_admin_service` to `/etc/systemd/system/`
6. Copy `cold_admin_api.service-example` to `cold_admin_api.service`
7. Symbolicly link `cold_admin_service` to `/etc/systemd/system/`
8. Edit both service files and make the paths are correct.
9. Reload the systemd daemon, `sudo systemctl daemon-reload`
10. Enable the services (just needed the first time), `sudo systemctl enable cold_admin.service; sudo systemctl enable cold_admin_api.service`
11. Start the services using `systemctl` in the usual way

For a good description of how to setup new systemd services the Debian (works with Ubuntu too) way see <https://wiki.debian.org/systemd/Services>.

## **datasetd**

For **cold_admin** you need datasetd. The example service files assume you've installed dataset in the `/usr/local` directory tree.
If datasetd is not found there then you'll get an error when you start the `cold_admin_api.service` under systemd.




