# Giai đoạn 1: Build (Sử dụng Node để build app)
# Đặt tên giai đoạn này là "builder"
FROM node:20-alpine AS builder

# Set thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Build ứng dụng (Vite sẽ build ra thư mục 'dist' theo mặc định)
RUN npm run build

# Giai đoạn 2: Serve (Sử dụng Nginx siêu nhẹ)
# Đây là image cuối cùng, siêu nhỏ
FROM nginx:1.27-alpine

# Sao chép file Nginx config bạn vừa tạo
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Sao chép các file đã build từ giai đoạn "builder" vào thư mục phục vụ của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Mở cổng 80 (cổng mặc định của Nginx)
EXPOSE 80

# Lệnh mặc định của Nginx (bạn không cần CMD)