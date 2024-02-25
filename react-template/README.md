# React template
- Login and register page (made for the django rest template)
- React router, Redux, Redux Thunk and Axios
- Inputs components using MUI
- Navbar
- Sidebar
- Firebase deployment set up
- Support different environment modes for production and development 

## Initialize the project

### Install dependencies
```bash
npm install --legacy-peer-deps
```

### Set up environment variables 
First, create a `.env` file and add the following variables (for development mode)
```javascript
REACT_APP_BASE_URL=http://127.0.0.1:8000
REACT_APP_MODE="development"
```

### Run the project
Make sure the backend (django rest template) is also running
```bash
npm run start
```

### Deployment 
```bash
npm run build
```
Then:
```bash
firebase deploy
```