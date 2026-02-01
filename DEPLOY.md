# 部署到 Netlify 并启用 CMS

要使 Netlify CMS 完全工作，您需要将网站部署到 Netlify 并启用身份验证服务。

## 部署步骤

### 方法一：一键部署到 Netlify

1. 点击下方按钮一键部署到 Netlify：
   
   [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/1yongge/my-static-website)

2. 登录或注册 Netlify 账户
3. 配置构建设置（通常会自动检测）
   - 构建命令：`echo "无需构建"`
   - 发布目录：`.` （根目录）

### 方法二：手动部署

1. 通过 Git 连接您的 GitHub 仓库到 Netlify
2. 选择 `my-static-website` 仓库
3. 配置构建设置：
   - 构建命令：留空或 `echo "build"`
   - 发布目录：`.`
4. 部署站点

## 启用 Netlify Identity 和 Git Gateway

1. 部署完成后，进入您的站点控制面板
2. 转到 "Identity" 选项卡
3. 点击 "Enable Identity"
4. 在设置中启用 "Registration"（注册）选项
5. 启用 "Git Gateway" 以允许 CMS 与 GitHub 仓库交互

## 配置身份验证

在 Netlify 控制面板中：

1. 转到 "Identity" → "Settings & usage"
2. 在 "External providers" 中添加身份验证方式（如电子邮件）
3. 在 "Invite users" 中为自己创建账户

## 访问 CMS

部署并配置完成后，您可以通过以下 URL 访问 CMS：

`https://your-site-name.netlify.app/admin/`

## 替代方案：GitHub Pages + 第三方 Git Gateway

如果您想继续使用 GitHub Pages，可以使用第三方 Git Gateway 服务：

1. 部署到 GitHub Pages
2. 注册 [https://www.herokucms.com/](https://www.herokucms.com/) 或类似服务
3. 配置服务连接到您的 GitHub 仓库
4. 更新 `admin/config.yml` 中的 backend 设置

## 注意事项

- 确保您的 GitHub 仓库是公开的，或者配置了适当的访问权限
- Netlify CMS 需要与 Git 仓库交互，因此需要 Git Gateway 服务
- 首次登录 CMS 时，您需要验证电子邮件地址
- 所有内容更改都将作为 Git 提交记录保存