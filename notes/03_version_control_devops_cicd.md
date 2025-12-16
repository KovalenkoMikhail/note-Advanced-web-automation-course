# Version Control, DevOps & CI/CD

**Complete IT Lecture Notes - Theme 3**

This document covers Git, Jenkins CI/CD, Docker, and Kubernetes.

---

## Table of Contents

1. [Git - Version Control System](#1-git-version-control-system)
2. [Git Flow](#2-git-flow)
3. [Advanced Git Commands](#3-advanced-git-commands)
4. [Git Tags and Hooks](#4-git-tags-and-hooks)
5. [Jenkins - CI/CD Pipelines](#5-jenkins-cicd-pipelines)
6. [Docker - Containerization](#6-docker-containerization)
7. [Kubernetes](#7-kubernetes)

---

## 1. Git - Version Control System

### Basic Git Commands

#### Initialization and Cloning:

- **`git init`** - initialize repository
- **`git clone <url>`** - clone repository
- **`git status`** - check status
- **`git log`** - view commit history

#### Working with Changes:

- **`git add .`** - add changes
- **`git commit -m "message"`** - create commit
- **`git stash`** - temporarily save uncommitted changes
- **`git stash pop`** - pull from Stash
- **Stash stores locally** in .git

#### Working with Branches:

- **`git branch:`** - view branches
- **`git branch <name>`** - create branch
- **`git checkout <name>`** - switch to branch
- **`git checkout -b <name>`** - create and switch
- **`git merge <name>`** - merge branches
- **`git branch -d <name>`** - delete branch

### Working with Remote Repositories

#### Repository Commands:

- **`git remote -v`** - list repositories
- **`git push origin <name>`** - push changes to remote repository

#### Getting Changes:

- **`git pull`** - download and merge
- **`git fetch`** - download, doesn't merge

#### Working with Commits and History:

- **`git commit --amend`** - rewrite previous commit
- **`git rebase`** - rewrites history, moves commits on top of main branch
- **`git merge`** - creates new commit that merges code, preserves history

---

## 2. Git Flow

### Main Branches:

- **`main`** - stable, ready for release
- **`develop`** - for integrating new features
- **`feature`** - for developing new functions (from develop branch)
- **`release`** - preparation for release, pulled from develop and pushed to main

### Hotfix (urgent fix):

- **hotfix** - for quick fixes pulled from and pushed to main (simple Flow)

### Best Flow hotfix:

1. **Create hotfix branch from main**
2. **Fixes and PR to main**
3. **Testing in main**
4. **Cherry-pick to release (Release/5)**

---

## 3. Advanced Git Commands

### Restoring Deleted Commit

#### Condition:

- **If commit ID exists (in git reflog)**

#### Restoration Steps:

1. **Create new branch pointing to commit**
2. **`git branch <branch name> abcde123`** - switch to commit
3. **Reset branch to commit**

#### Important Points:

- **Commits are deleted over time** - Git automatically cleans unused commits
- **Git garbage collection** - process of cleaning unused objects

### Detached HEAD

- **Detached HEAD: State when** current commit points to the commit itself, not to a branch
- **Example:** (with git checkout <commit ID>)
- **To fix - switch to branch**

### Bug Finding and Debugging

#### git bisect:

- **`git bisect`** - helps find bug in commits by dividing range in half
- **`git bisect start`** - start process
- **`git bisect good [commit ID]`** - where there definitely was no bug
- **`← bad [commit ID]`** indicates commit where bug definitely exists

#### git cherry-pick:

- **`git cherry-pick [commit ID]`** - changes from one commit to another, as if they were made in main

---

## 4. Git Tags and Hooks

### Tags:

- **Needed for release versions** and marking important moments
- **Contain metadata:** email, tag author name, date
- **Example:** `git tag -a v.1.0.0 -m "initials"` - create annotated tag version 1.0.0
- **stable release** - stable release

### Hooks:

- **Executable scripts**

#### Hook Types:

- **pre-commit** - check code formatting, linting, run Unit tests
- **prepare-commit-msg** - after entering commit message file
- **commit-msg** - process commit message
- **pre-push** - before push
- **post-receive** - on repository after Push (for automatic deployment)

---

## 5. Jenkins - CI/CD Pipelines

### Jenkins Description:

- **Jenkinsfile** - pipelines, stores CI/CD
- **CI/CD** - Continuous Integration, Continuous Delivery/Deployment

### Main Components:

#### Agent:

- **Where pipeline will execute**
- `agent any` or `agent { docker { ... } }`

#### Stages:

- **build, test, deploy** - main stages

#### Steps:

- **Specific actions** in each stage

#### Post:

- **Action after pipeline completion**

### Plugins:

- **Git, Slack, Docker, Kubernetes**

### Triggers:

- **Git hooks** (on push to main)
- **Scheduled**

### Job Types:

- **Freestyle job** - configured through UI (poor scalability, not versioned)
- **Pipeline job** - code, provides versioning, readability, scalability

### Credentials:

- **Built-in credentials** - secure password storage
- **Store API-Keys, private keys outside code**

---

## 6. Docker - Containerization

### Basic Docker Commands:

#### Container Management:

- **`docker start`** - start container
- **`docker stop`** - stop container
- **`docker restart`** - restart container

#### Command Execution:

- **`docker exec -it [container_name] [command]`** - execute commands inside container

#### View Containers:

- **`docker ps`** - view running containers

#### Create and Run:

- **`docker run -d -it ubuntu`** - create container and return its ID
  - **`-d`** - detached mode (background mode)
  - **`-it`** - interactive and pseudo-TTY
  - **`ubuntu`** - image name

### Docker Run Commands:

#### Main Parameters:

- **`docker run`** - run container
- **`--name my-nginx`** - give name
- **`-p 8080:80`** - forward port 80 from inside container to port 8080 on PC
- **`-d`** - run in background mode

#### Container Management:

- **`docker stop my-nginx`** - stop container
- **`docker rm my-nginx`** - remove container

### Images and Containers:

#### Image:

- **Template for application, essentially a container**
- **Archive that becomes a container when launched**

#### Container:

- **Can contain any application**
- **RabbitMQ, DB (even 10 databases)**
- **Database runs on specific port inside container**

#### Expose Command:

- **Can expose specific database**
- **`EXPOSE 5000`** - exposes port for connections

### Docker Features:

- **Containers mainly run locally**
- **Remote connection possible**
- **Can run multiple containers simultaneously on different ports**

---

## 7. Kubernetes

### Description:

- **Kubernetes - container orchestrator** - containerized application management tool
- **Developed by Google** - for managing containers in various deployment environments

### Main Characteristics:

#### Orchestration Tool:

- **Orchestration tool** - container management
- **Helps manage containerized applications** - in different deployment environments

### Problems It Solves:

#### Context:

- **Can run applications in containers** - like Docker
- **Kubernetes provides control plane**

#### Functionality:

- **Schedules containers on servers** - called nodes
- **Monitors health and restarts containers** - on failures
- **Scales up/down** - based on load
- **Provides service discovery** - networking DNS
- **Allows containers to communicate** - with each other

### Advantages:

- **Includes rolling updates and rollbacks** - safely
- **Manages configuration and secrets** - security
- **Ensures high availability** - fault tolerance

---

**Related Topics:**
- [Networking & Protocols](01_networking_protocols_http.md)
- [Testing & QA Automation](02_testing_qa_automation.md)
- [Databases & Backend APIs](04_databases_backend_apis.md)
- [Programming Fundamentals](05_programming_fundamentals.md)
