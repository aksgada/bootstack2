# Deploying Bootstack to Render

This project consists of two components:
1. **Backend**: Django 5 + Django REST Framework API
2. **Frontend**: React + Vite Static Application

---

## Method 1: Automatic 1-Click Setup with Render Blueprint (Recommended)

This repository includes a [`render.yaml`](file:///c:/Users/imkal/Downloads/bootstack-updated%20web.zip%20(2)/bootstack-updated%20web.zip%20(1)/render.yaml) blueprint that configures both the backend and frontend automatically.

1. **Push your code to GitHub / GitLab**:
   ```bash
   git init
   git add .
   git commit -m "Configure project for Render deployment"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Render**:
   - Go to the [Render Dashboard](https://dashboard.render.com/).
   - Click **New +** > **Blueprint**.
   - Connect your GitHub repository.
   - Click **Apply**.
   - Render will automatically create the `bootstack-backend` Web Service and `bootstack-frontend` Static Site, configure their environment variables, build and deploy them!

---

## Method 2: Manual Deployment via Render Dashboard

If you prefer to configure each service manually in the Render UI:

### 1. Deploy the Backend (Web Service)
1. In the Render Dashboard, click **New +** > **Web Service**.
2. Select your repository.
3. Configure the settings:
   - **Name**: `bootstack-backend`
   - **Language / Environment**: `Python`
   - **Root Directory**: `backend`
   - **Build Command**: `./build.sh` (or `pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate`)
   - **Start Command**: `gunicorn config.wsgi:application`
   - **Plan**: `Free`
4. Add Environment Variables:
   - `PYTHON_VERSION`: `3.10.11`
   - `SECRET_KEY`: *(Click "Generate" or provide a random string)*
   - `DEBUG`: `False`
   - `CORS_ALLOW_ALL_ORIGINS`: `True`
5. Click **Create Web Service**.
6. Copy your backend service URL (e.g., `https://bootstack-backend.onrender.com`).

---

### 2. Deploy the Frontend (Static Site)
1. In the Render Dashboard, click **New +** > **Static Site**.
2. Select the same repository.
3. Configure the settings:
   - **Name**: `bootstack-frontend`
   - **Root Directory**: `bootstack-web`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add Environment Variables:
   - `VITE_API_URL`: `https://bootstack-backend.onrender.com` *(Use your actual backend URL from step 1)*
5. Add Rewrites/Redirects (under **Redirects/Rewrites** settings):
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
6. Click **Create Static Site**.

---

## Creating an Admin User in Production

Once your backend is deployed:
1. Open your `bootstack-backend` service in the Render Dashboard.
2. Go to the **Shell** tab on the left.
3. Run:
   ```bash
   python manage.py createsuperuser
   ```
4. Follow the prompts to set your production admin username, email, and password.
5. Access your admin panel at `https://<your-backend-url>/admin/`.
