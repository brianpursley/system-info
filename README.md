# system-info

A simple docker container that writes out system information for testing purposes.

Default port is 80.  You can set a custom port using the `PORT` environment variable.

![Screenshot](https://raw.githubusercontent.com/brianpursley/system-info/master/screenshot.png)

# Usage

## Docker

```bash
docker run -d -p 8080:80 --name sysinfo brianpursley/system-info
```

## Kubernetes

```bash 
kubectl run sysinfo --image=brianpursley/system-info
kubectl wait --for=condition=Ready pod/sysinfo
kubectl port-forward sysinfo 8080:80
```
