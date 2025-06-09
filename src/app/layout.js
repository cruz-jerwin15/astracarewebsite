
'use client';
import { Provider } from "react-redux"
import { store } from "@/rtk/store"
import '../styles/global.styles.css';
import { ToastContainer,Bounce} from 'react-toastify';

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
    <html lang="en">
      <head>
        {/* Link to your local Bootstrap CSS */}
        <link rel="stylesheet" href="/bootstrap/css/sb-admin-2.min.css" />
        <link href="/bootstrap/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
          rel="stylesheet" />
      <link href="/bootstrap/css/sb-admin-2.min.css" rel="stylesheet" />
      </head>
      <body>
        {children}

        {/* Link to your local Bootstrap JS */}
        <script src="/bootstrap/js/sb-admin-2.min.js"></script>
        <script src="/bootstrap/vendor/jquery/jquery.min.js"></script>
        <script src="/bootstrap/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  
        <script src="/bootstrap/vendor/jquery-easing/jquery.easing.min.js"></script>


        <script src="/bootstrap/js/sb-admin-2.min.js"></script>

      </body>
    </html>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
    </Provider>
  );
}
