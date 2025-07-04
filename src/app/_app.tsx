// import { SidebarProvider } from "@/components/Context/SidebarContext";

// function App({ Component, pageProps }: any) {
//   return (
//     <SidebarProvider>
//       <Component {...pageProps} />
//     </SidebarProvider>
//   );
// }

// export default App;
import { AppProps } from "next/app";
import { SidebarProvider } from "@/components/Context/SidebarContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  );
}

export default App;
