# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# This is APDS Dashboard Setup

# 1 install Npm/node in your setup using below URl also verify node and npm using 
```
https://nodejs.org/en/download
node -v
npm -v
```

# 2 Need to get Code of Dashboard, to clone the repository use the below command
```
git clone -b dev https://github.com/ahmedbutt1911/APDS-Dashboard.git
cd APDS
```

# 3 Need to install all the packages related to dashboard application
```
npm install
npm run dev
```


# This APDS BackEnd Setup

# 1 install Python/PIP in your setup using below URl also verify Python and Pip using 
```
https://www.python.org/downloads/
python --version
python -V
pip --version
```

# 2 Need to get Code of Backend, to clone the repository use the below command
```
git clone -b dev https://github.com/DevAro178/backend_apds.git
```

# 3 Need to install all the packages related to backend application
```
python -m venv env
source ./env/Script/activate
cd backend-apds
pip install -r requirement.txt
```
# 4 Need to perform all the migration
```
python manage.py make migrations
python manage.py migrate
```
# 5 Now run the application
```
python nmanage.py runserver
```
# This is the setup of Extension

# 1 clone the Extension files from github

```
git clone -b dev https://github.com/DevAro178/extension_apds.git
```
# 2 upload the extension folder chrome at
- upload the extenstion folder using Load Unpacked option
- then copy the extension_id given under APDS 1.0
- paste the extension_Id at dashboard location "APDS\src\config.jsx"
- save the file and rerun the dashboard application the whole application will start working
