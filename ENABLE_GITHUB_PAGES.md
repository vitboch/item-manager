# 🚀 Enable GitHub Pages - Step by Step Guide

## ❌ **Current Issue**

GitHub Pages is not enabled in the repository settings, causing the deployment workflow to fail.

## ✅ **Solution: Enable GitHub Pages**

### Step 1: Go to Repository Settings

1. Navigate to: https://github.com/vitboch/item-manager
2. Click on **Settings** tab (top right of repository)
3. Scroll down to **Pages** section in the left sidebar

### Step 2: Configure GitHub Pages

1. In the **Pages** section, find **Source** dropdown
2. Select **GitHub Actions** (not "Deploy from a branch")
3. Click **Save**

### Step 3: Verify Configuration

After enabling, you should see:

- ✅ **Source**: GitHub Actions
- ✅ **Status**: Ready to deploy
- ✅ **Custom domain**: (optional)

### Step 4: Trigger Deployment

Once Pages is enabled, you can trigger deployment by:

#### Option A: Push a new commit

```bash
git add .
git commit -m "docs: enable GitHub Pages deployment"
git push origin main
```

#### Option B: Manual workflow trigger

1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select **main** branch
5. Click **Run workflow**

## 🔧 **Alternative: Deploy to Vercel (Recommended)**

If GitHub Pages continues to have issues, consider deploying to Vercel for better performance:

### Vercel Deployment Steps

1. **Go to**: https://vercel.com
2. **Sign in** with GitHub account
3. **Import project**: `vitboch/item-manager`
4. **Configure**:
   - Framework Preset: `Vite`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Deploy**

### Vercel Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## 🚀 **Quick Fix Commands**

Run these commands to fix the current deployment:

```bash
# 1. Enable GitHub Pages (manual step - go to repository settings)
# 2. Update workflow and push
git add .
git commit -m "fix: enable GitHub Pages in workflow"
git push origin main
```

## 📊 **Expected Results**

After enabling GitHub Pages:

1. **Workflow will succeed** ✅
2. **Live site available** at: https://vitboch.github.io/item-manager/
3. **Automatic deployments** on every push
4. **Performance monitoring** with Lighthouse CI

## 🔍 **Troubleshooting**

### If Pages still doesn't work:

1. **Check repository permissions**:
   - Go to Settings → Actions → General
   - Ensure "Allow GitHub Actions to create and approve pull requests" is enabled

2. **Verify workflow permissions**:
   - The workflow has correct permissions in the YAML file

3. **Check repository visibility**:
   - Repository must be public for free GitHub Pages
   - Or upgrade to GitHub Pro for private repositories

### Alternative Deployment Options:

1. **Vercel** (Recommended): https://vercel.com
2. **Netlify**: https://netlify.com
3. **GitHub Pages** (after enabling): Current repository

## 🎯 **Next Steps**

1. **Enable GitHub Pages** in repository settings
2. **Push the updated workflow**
3. **Verify deployment** in Actions tab
4. **Test live site** functionality
5. **Share with recruiters** and technical leads

---

## 📞 **Support**

If you need help with deployment:

- Check GitHub Actions logs for detailed error messages
- Verify all repository settings are correct
- Consider using Vercel as an alternative deployment platform

**The application is ready - just needs Pages enabled!** 🚀
