FROM node:22-slim AS build
RUN apt-get update && apt-get install -y --no-install-recommends \
    tesseract-ocr tesseract-ocr-por libvips poppler-utils \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /app
COPY package*.json ./

RUN npm cache clean --force && npm ci --omit=dev
COPY . .

FROM node:22-slim AS runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    tesseract-ocr tesseract-ocr-por libvips poppler-utils \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /app
COPY --from=build /app /app

COPY tessdata_custom/por_custom.traineddata /usr/share/tesseract-ocr/5/tessdata/
ENV TESSDATA_PREFIX=/usr/share/tesseract-ocr/5/tessdata/

RUN mkdir -p /tmp/uploads && chown -R 1001:1001 /tmp/uploads

USER 1001

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "src/server.js"]
