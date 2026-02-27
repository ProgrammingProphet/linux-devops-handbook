# 🔷 1️⃣ Workflow Metadata

```yaml
name: Build and Deploy to EC2
```

* This is the workflow name.
* It appears inside the **GitHub Actions tab**.
* Purely cosmetic — does not affect execution.

---

# 🔷 2️⃣ Trigger Section

```yaml
on:
  push:
    branches:
      - main
```

### Meaning:

* This workflow runs **only when code is pushed to `main` branch`**
* Any commit → automatic pipeline execution

### Execution Event:

```
Developer → git push origin main → GitHub → Workflow starts
```

This is your **Continuous Integration trigger**.

---

# 🔷 3️⃣ Global Environment Variables

```yaml
env:
  IMAGE_NAME: linux-devops-handbook
```

This defines a global variable available to all steps.

Instead of writing:

```
docker build myusername/linux-devops-handbook
```

You write:

```
${{ env.IMAGE_NAME }}
```

It improves maintainability.

---

# 🔷 4️⃣ Job Definition

```yaml
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
```

### What this means:

* `build-and-deploy` → Job name
* `runs-on: ubuntu-latest` → GitHub provides a temporary Ubuntu VM

Important:

This VM:

* Is fresh every time
* Has Docker pre-installed
* Gets destroyed after execution

So every run is **stateless and clean**.

---

# 🔷 5️⃣ Step-by-Step Breakdown

Now we go step-by-step in execution order.

---

## ✅ Step 1: Checkout Code

```yaml
- name: Checkout Code
  uses: actions/checkout@v3
```

### What happens:

GitHub runner clones your repository into the VM.

Without this step:

* No source code
* No Dockerfile
* Nothing to build

Internally:

```
git clone https://github.com/your-repo.git
```

---

## ✅ Step 2: Set Image Tag

```yaml
- name: Set Image Tag
  run: echo "IMAGE_TAG=${GITHUB_SHA::7}" >> $GITHUB_ENV
```

### Important concept: Dynamic Tagging

`GITHUB_SHA` = full commit hash
Example:

```
2f5c9b47ad89234c9a1
```

`${GITHUB_SHA::7}` = first 7 characters

```
2f5c9b4
```

So your Docker image tag becomes:

```
myuser/linux-devops-handbook:2f5c9b4
```

Why?

* Unique per commit
* Version traceability
* Rollback capability

Then:

```
>> $GITHUB_ENV
```

Adds `IMAGE_TAG` to environment variables for later steps.

---

## ✅ Step 3: Login to DockerHub

```yaml
echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin
```

### What this does:

* Uses GitHub Secrets
* Logs into DockerHub securely
* Prevents password exposure in logs

Security principle:
✔ No hardcoded credentials
✔ Uses encrypted repository secrets

Without login:

```
docker push → denied
```

---

## ✅ Step 4: Build Docker Image

```yaml
docker build -t username/image:$IMAGE_TAG .
```

### What happens:

* Dockerfile is read
* Image is created
* Tagged with commit hash

Then:

```yaml
docker tag username/image:$IMAGE_TAG username/image:latest
```

Now you have:

```
linux-devops-handbook:2f5c9b4
linux-devops-handbook:latest
```

Why both?

| Tag Type    | Purpose            |
| ----------- | ------------------ |
| commit hash | version tracking   |
| latest      | production default |

---

## ✅ Step 5: Push Image

```yaml
docker push username/image:$IMAGE_TAG
docker push username/image:latest
```

Now image is stored in **DockerHub registry**.

Architecture now:

```
GitHub Runner → DockerHub
```

EC2 does NOT build image.
It only pulls pre-built image.

This is best practice.

---

## ✅ Step 6: Deploy to EC2

```yaml
uses: appleboy/ssh-action@v1.0.0
```

This is a GitHub Action plugin that:

* Opens SSH connection
* Executes remote commands

Credentials used:

```yaml
host: ${{ secrets.EC2_HOST }}
username: ubuntu
key: ${{ secrets.EC2_SSH_KEY }}
```

Secure SSH login using private key.

---

### Remote Execution Script

Now commands execute inside EC2:

---

### 1️⃣ Pull Latest Image

```bash
docker pull username/image:$IMAGE_TAG
```

EC2 downloads new version.

---

### 2️⃣ Stop Existing Container

```bash
docker stop app || true
```

If container exists → stop it
If not → ignore error

`|| true` prevents pipeline failure.

---

### 3️⃣ Remove Old Container

```bash
docker rm app || true
```

Clean previous deployment.

---

### 4️⃣ Run New Container

```bash
docker run -d -p 80:80 --name app image
```

Explanation:

| Flag       | Meaning                         |
| ---------- | ------------------------------- |
| -d         | detached mode                   |
| -p 80:80   | map EC2 port 80 to container 80 |
| --name app | container name                  |
| image      | which image to run              |

Now your app is live on:

```
http://EC2_PUBLIC_IP
```

---

# 🔷 Complete Execution Flow (End-to-End)

Let’s visualize what happens when you push code:

```
Developer
   ↓
git push main
   ↓
GitHub Actions Trigger
   ↓
GitHub Runner VM Created
   ↓
Clone Repo
   ↓
Build Docker Image
   ↓
Tag with Commit SHA
   ↓
Push to DockerHub
   ↓
SSH into EC2
   ↓
Pull New Image
   ↓
Stop Old Container
   ↓
Remove Old Container
   ↓
Run New Container
   ↓
Production Updated
```

---

# 🔷 Architectural View

```
              ┌───────────────┐
              │   Developer   │
              └──────┬────────┘
                     │ git push
                     ▼
           ┌────────────────────┐
           │   GitHub Actions   │
           │ (Ubuntu Runner VM) │
           └──────┬─────────────┘
                  │
        Build & Push Image
                  │
                  ▼
            ┌───────────┐
            │ DockerHub │
            └─────┬─────┘
                  │
           docker pull
                  ▼
            ┌───────────┐
            │    EC2    │
            │  Docker   │
            └───────────┘
```

---

# 🔷 Why This Is a Good DevOps Design

✔ Immutable deployment
✔ Versioned images
✔ CI + CD automated
✔ No manual server login
✔ Secure secret management
✔ Stateless runner
✔ Rollback possible

---

# 🔷 What This Pipeline Is Missing (Advanced DevOps Thinking)

Since you want to become top-level DevOps engineer, here’s what can improve:

1. Add health check
2. Add Docker compose instead of raw docker run
3. Add blue-green deployment
4. Add rollback step
5. Add Terraform provisioning stage
6. Add ECR instead of DockerHub (AWS native)
7. Add Nginx reverse proxy
8. Add monitoring (CloudWatch / Prometheus)
9. Add zero-downtime deployment

---

# 🔷 Real DevOps Insight

Currently this is:

```
CI + Simple CD
```

Industry-grade version would be:

```
CI → Build → Scan → Push → Staging → Approval → Production
```

You are currently at:
Level 3 DevOps maturity.

Very good progress.

---

