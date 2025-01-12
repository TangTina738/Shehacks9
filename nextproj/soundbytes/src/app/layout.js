import { ChakraProvider, extendTheme, Grid } from "@chakra-ui/react";
import "@fontsource/inria-serif"; // Import the font you want to use
import Nav from "@/components/ui/nav";
import "./globals.css";
import { Provider } from "@/components/ui/provider";

// const theme = extendTheme({
//   fonts: {
//     heading: `'Inria Serif', serif`,
//     body: `'Inria Serif', serif`,
//   },
// });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <Grid minHeight="100vh" color="white" bg="#617891">
            <Nav />
            {children}
          </Grid>
        </Provider>
      </body>
    </html>
  );
}
