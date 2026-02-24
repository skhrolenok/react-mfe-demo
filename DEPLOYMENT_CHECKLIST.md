# MFE Deployment Checklist

## For User Management MFE (https://react-mfe-demo-user-management.onrender.com)

### 1. Check Build Command
Should be exactly:
```
npm install && npm run build --workspace=mfe-user-management
```

❌ NOT: `npm run build` (this builds all workspaces)
❌ NOT: `cd apps/mfe-user-management && npm install && npm run build` (wrong working directory)

### 2. Check Start Command
Should be exactly:
```
cd apps/mfe-user-management && node server.js
```

### 3. Check Root Directory
Should be: (leave blank / default)

If you set a custom root directory like `apps/mfe-user-management`, the paths will be wrong!

### 4. Check Environment Variables
User Management MFE typically needs NO environment variables (PORT is auto-set by Render to 10000)

### 5. Verify Build Output

After deployment, check the logs for:
```
Serving files from: /app/apps/mfe-user-management/dist
Available files: assets/remoteEntry.js, assets/__federation_expose_App-*.js, ...
```

If you see:
- `dist folder not found` → Build command is wrong
- Empty file list → Build failed silently
- Files listed but 404 → Path issue

### 6. Test Directly

Open in browser:
- https://react-mfe-demo-user-management.onrender.com/assets/remoteEntry.js
- Should return JavaScript code, NOT 404

---

## For Ticketing MFE (Working) - Use as Reference

Compare the settings between User Management and Ticketing services:

1. Go to Render Dashboard
2. Click each service
3. Compare:
   - Build Command
   - Start Command  
   - Root Directory (should be blank for both)
   - Environment Variables

---

## Common Issues

### Issue: 404 on federation files
**Cause:** Build output path wrong
**Fix:** Check that dist folder exists and contains assets/

### Issue: CORS errors
**Cause:** Server not setting CORS headers
**Fix:** Already fixed in latest server.js

### Issue: localhost URLs in shell
**Cause:** Shell built without MFE environment variables
**Fix:** Set VITE_MFE_USER_URL and VITE_MFE_TICKET_URL before building shell

### Issue: Port conflicts
**Cause:** Multiple services trying to use same port
**Fix:** Each Render service gets PORT=10000 automatically (that's correct!)

---

## Quick Diagnostic Commands

Run in browser console on your MFE URL:

```javascript
// Check if remoteEntry.js loads
fetch('/assets/remoteEntry.js')
  .then(r => {
    console.log('Status:', r.status);
    return r.text();
  })
  .then(t => console.log('First 200 chars:', t.substring(0, 200)))
  .catch(e => console.error('Error:', e));

// Check what files exist (if server supports it)
fetch('/env-config.js')
  .then(r => r.text())
  .then(console.log)
  .catch(console.error);
```

---

## Redeploy Steps

1. **Fix any configuration issues** in Render dashboard
2. **Trigger manual deploy**: Overview → Manual Deploy → Deploy Latest Commit
3. **Watch the logs** for the file listing output
4. **Test the URLs** after deployment completes
