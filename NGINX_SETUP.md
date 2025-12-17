# Nginx 設定範例 (Ubuntu)

如果你使用 Nginx 作為反向代理，可以使用以下設定參考。
請將 `yourdomain.com` 替換為你的實際網域，並確認 SSL 憑證路徑正確。

```nginx
server {
    server_name yourdomain.com; # 請修改為你的網域

    # SSL 設定 (請修改為你的憑證路徑)
    listen 443 ssl http2;
    ssl_certificate /etc/ssl/example/yourdomain.com.pem;
    ssl_certificate_key /etc/ssl/example/yourdomain.com.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    location = /robots.txt {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        add_header Content-Type "text/plain; charset=utf-8" always;
        add_header Cache-Control "public, max-age=3600" always;
        expires 1h;
    }

    location = /sitemap.xml {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        add_header Content-Type "application/xml; charset=utf-8" always;
        add_header Cache-Control "public, max-age=3600" always;
        expires 1h;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        add_header Cache-Control "public, max-age=2592000, immutable" always;
        expires 30d;
    }

    location ~* \.(woff|woff2|ttf|eot)$ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        add_header Cache-Control "public, max-age=31536000, immutable" always;
        add_header Access-Control-Allow-Origin "*" always;
        expires 1y;
    }

    location ~* \.(css|js)$ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate" always;
        add_header Pragma "no-cache" always;
        add_header Expires 0 always;
    }

    location ~* \.(env|config|log|sql|md|txt)$ {
        deny all;
        return 403;
    }

    location ~ /\. {
        deny all;
        return 403;
    }

    location ~* ^/(src|node_modules|\.git|package\.json|package-lock\.json)/ {
        deny all;
        return 403;
    }

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        add_header Cache-Control "no-cache, no-store, must-revalidate" always;
        add_header Pragma "no-cache" always;
        add_header Expires 0 always;
    }


}
```

## 自動化 SSL (Certbot) 設定教學

如果你希望自動獲取並更新免費的 Let's Encrypt SSL 憑證，可以使用 Certbot。

### 1. 安裝 Certbot
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

### 2. 獲取憑證
執行以下指令，Certbot 會自動修改你的 Nginx 設定：
```bash
sudo certbot --nginx -d yourdomain.com
```

### 3. 自動續期測試
Let's Encrypt 憑證有效期為 90 天，Certbot 會自動設定排程續期。你可以透過以下指令測試自動續期功能是否正常：
```bash
sudo certbot renew --dry-run
```
