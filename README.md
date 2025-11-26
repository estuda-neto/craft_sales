# instructions for running the application

backend ->Inside the backend folder, create a **.env** file containing:
```
JWT_SECRET=1rUrAY0HwrhsiF0V1XDguyh16dGHMo35o8ivZ17KCJD4

#Email
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=465
EMAIL_USER=
EMAIL_PASS=
TOKEN_SECRET=

#EFI
EFIPAY_URL=https://api.efipay.com.br
EFIPAY_CLIENT_ID=efipay_client_id
EFIPAY_CLIENT_SECRET=efipay_client_secret
EFIPAY_CERTIFICATE_PATH=./certs/efipay_cert.pem
```
backend -> inside the project's root folder, go to the backend folder and run:
```
 npm i &&  docker compose start && npm run start:dev
```

frontend ->Inside the backend folder, create a **.env** file containing:
```
NEXTAUTH_URL = http://localhost:3001
NEXTAUTH_SECRET =1rUrAY0HwrhsiF0V1XDguyh16dGHMo35o8ivZ17KCJE=
```
frontend -> inside the project's root folder, go to the backend folder and run:
```
npm i && npm run dev
```






