# Deploy HookMeDaddy in 4 Steps

---

## Step 1: Create a GitHub repository

1. Go to github.com and sign in
2. Click the green "New" button (top left)
3. Name it: hookmededaddy
4. Leave everything else as default
5. Click "Create repository"
6. On the next screen, click "uploading an existing file"
7. Drag ALL the files from this folder into the upload area
8. Click "Commit changes"

---

## Step 2: Deploy to Vercel

1. Go to vercel.com and sign in with your GitHub account
2. Click "Add New Project"
3. Find "hookmededaddy" in the list and click "Import"
4. Leave all settings as default
5. Click "Deploy"

Your site is now live at something like hookmededaddy.vercel.app

---

## Step 3: Add your Anthropic API key

Without this step, generation will not work.

1. Go to vercel.com, open your project
2. Click "Settings" in the top nav
3. Click "Environment Variables" in the sidebar
4. Add a new variable:
   - Name: ANTHROPIC_API_KEY
   - Value: your key from console.anthropic.com
5. Click "Save"
6. Go back to "Deployments" and click "Redeploy"

---

## Step 4: Connect your domain (optional)

1. In Vercel, go to Settings > Domains
2. Type in your domain (e.g. hookmededaddy.com)
3. Vercel will give you two DNS records to add
4. Log in to Namecheap, go to your domain, click "Advanced DNS"
5. Add the two records exactly as Vercel shows
6. Wait 10 to 30 minutes for it to go live

---

Done. Your site is live.
