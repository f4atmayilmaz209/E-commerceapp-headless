
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { WixClientContextProvider } from "./context/winContext";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <WixClientContextProvider>
          <Navbar/>
          {children}
          <Footer/>
        </WixClientContextProvider>
      </body>
    </html>
  );
}
