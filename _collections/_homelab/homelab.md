---
layout: page
title: Homelab
---

This is my forever WIP mini homelab where I self host services, try new services or learn about CVEs. Here is a high-level description of it.

## Overview

My homelab is built around GitOps and Infrastructure as Code (IaC) principles, combining containerized services and Kubernetes workloads with a backup strategy across multiple hardware devices.

<img src="{{ site.baseurl }}/assets/images/homelab/networking.dark.png" alt="Homelab Overview" class="theme-image-dark">
<img src="{{ site.baseurl }}/assets/images/homelab/networking.light.png" alt="Homelab Overview" class="theme-image-light">

### Hardware

- **NUC**: Proxmox host running a single-node Talos Kubernetes cluster and other virtualized services on LXC and VM managed with Komodo
- **Raspberry Pi**: Edge gateway running Caddy reverse proxy with Cloudflare DNS challenge and alerting services
- **Router**: OPNsense firewall with Unbound DNS resolver and AdGuard Home for network-level ad blocking
- **VPS**: Remote server managed with Komodo, hosting Headscale for Tailscale network connectivity, Gatus for monitoring, and ntfy for notifications

### Infrastructure

#### Kubernetes

- **Cluster**: Single-node Talos Linux cluster with Cilium CNI
- **GitOps**: Flux CD pulling from Forgejo for automated deployments
- **API Gateway**: Integrated with GitOps workflow for traffic management

#### Shared Infrastructure

- **Service Management**: Komodo for GitOps-managed Docker services across all nodes
- **Networking**: Tailscale mesh network via Headscale for secure remote access (only external access method)
- **Reverse Proxy**: Caddy with automated Cloudflare DNS challenges for internal SSL certificates
- **Monitoring**: Gatus and ntfy running on VPS for service monitoring and alert notifications

### Backup Strategy

- **Docker Services**: Custom backup service using rclone to sync data to Garage (object storage on NAS)
- **Kubernetes Workloads**: Volsync for persistent volume backups to the same Garage instance
- **Off-site Backup**: Kopia runs nightly on the NAS, backing up Garage data to Backblaze B2
