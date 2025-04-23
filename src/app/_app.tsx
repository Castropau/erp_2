import { SidebarProvider } from "@/components/Context/SidebarContext";

function App({ Component, pageProps }: any) {
  return (
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  );
}

export default App;
